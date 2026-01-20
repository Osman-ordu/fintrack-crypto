import { useCallback, useEffect, useRef, useState } from 'react';
import { ICurrencyData } from '@/types';

const SOCKET_URL = 'wss://anlikaltinfiyatlari.com/sio/p7013/socket.io/?EIO=4&transport=websocket';

export function useCurrencySocket() {
  const [currencies, setCurrencies] = useState<Record<string, ICurrencyData>>({});
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const parseSocketIOMessage = useCallback((message: string): any => {
    try {
      if (!message || message.length === 0) return null;

      const packetType = parseInt(message[0]);

      if (packetType === 0) {
        try {
          const config = message.length > 1 ? JSON.parse(message.substring(1)) : null;
          return { type: 'open', data: config };
        } catch {
          return null;
        }
      }

      if (packetType === 3) {
        return { type: 'pong' };
      }

      if (packetType === 4) {
        let dataStr = message.substring(1);

        let jsonStart = 1;
        while (jsonStart < message.length && /[0-9]/.test(message[jsonStart])) {
          jsonStart++;
        }
        dataStr = message.substring(jsonStart);

        if (dataStr) {
          const parsed = JSON.parse(dataStr);
          if (Array.isArray(parsed) && parsed.length >= 1) {
            return {
              type: 'message',
              event: parsed[0],
              data: parsed[1] || parsed.slice(1),
            };
          }
        }
      }

      if (packetType === 2) {
        return { type: 'ping' };
      }

      return null;
    } catch (error) {
      void error;
      return null;
    }
  }, []);

  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const message = typeof event.data === 'string' ? event.data : '';
      if (!message) return;
      const parsed = parseSocketIOMessage(message);

      if (!parsed) {
        return;
      }

      if (parsed.type === 'ping' && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send('3');
        return;
      }

      if (parsed.type === 'open') {
        setIsConnected(true);
        reconnectAttempts.current = 0;

        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send('40');
        }
        return;
      }

      if (parsed.type === 'message' && parsed.event === '0') {

        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          const subscribeMessage = JSON.stringify(['subscribe', 'kapalicarsi']);
          wsRef.current.send(`42${subscribeMessage}`);
        }
        return;
      }

      if (parsed.type === 'message' && (parsed.event === 'kapalicarsi' || parsed.event === 'update')) {
        try {
          let data = parsed.data;

          if (typeof data === 'string') {
            try {
              data = JSON.parse(data);
            } catch (e) {
              void e;
              return;
            }
          }

          if (data && typeof data === 'object') {
            const updatedCurrencies: Record<string, ICurrencyData> = {};

            let dataObj = data;

            if (Array.isArray(data) && data.length > 0) {
              dataObj = data[0];
              if (typeof dataObj === 'string') {
                try {
                  dataObj = JSON.parse(dataObj);
                } catch (e) {
                  void e;
                }
              }
            }

            if (dataObj && typeof dataObj === 'object' && !Array.isArray(dataObj)) {
              Object.keys(dataObj).forEach((key) => {
                const item = dataObj[key];

                if (key === 'SOURCE' || key === 'S' || key === 'T' || !item) {
                  return;
                }

                if (typeof item === 'object' && !Array.isArray(item) && item.alis && item.satis) {
                  let symbol = key;

                  if (key.endsWith('TRY')) {
                    if (key === 'GUMUSTRY') {
                      symbol = 'GUMUSTRY';
                    } else {
                      symbol = key.replace('TRY', ''); // USDTRY -> USD
                    }
                  }

                  const buyPrice = parseFloat(String(item.alis).replace(',', '.')) || 0;
                  const sellPrice = parseFloat(String(item.satis).replace(',', '.')) || 0;
                  const changePercent = parseFloat(String(item.percent || 0).replace(',', '.')) || 0;

                  if (buyPrice > 0 && sellPrice > 0) {
                    updatedCurrencies[symbol] = {
                      symbol: symbol,
                      buyPrice: buyPrice,
                      sellPrice: sellPrice,
                      changePercent: changePercent,
                      timestamp: Date.now(),
                    };
                  }
                }
                else if (typeof item === 'number') {
                  let symbol = key;

                  if (key.endsWith('TRY')) {
                    symbol = key.replace('TRY', ''); // USDTRY -> USD
                  }

                  const price = item;

                  if (price > 0) {
                    updatedCurrencies[symbol] = {
                      symbol: symbol,
                      buyPrice: price,
                      sellPrice: price,
                      changePercent: 0,
                      timestamp: Date.now(),
                    };
                  }
                }
              });
            }

            if (Object.keys(updatedCurrencies).length > 0) {

              setCurrencies((prev) => {
                const newState = {
                  ...prev,
                  ...updatedCurrencies,
                };
                return newState;
              });
            }
          }
        } catch (error) {
          void error;
        }
        return;
      }

      if (parsed.type === 'message') {
        void parsed.event;
        void parsed.data;
      }
    } catch (error) {
      void error;
      void event;
    }
  }, [parseSocketIOMessage]);

  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(SOCKET_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        reconnectAttempts.current = 0;
      };

      ws.onmessage = (event) => {
        void event.data;
        handleMessage(event);
      };

      ws.onerror = (error) => {
        void error;
        setIsConnected(false);
      };

      ws.onclose = (event) => {
        void event.code;
        void event.reason;
        void event.wasClean;
        setIsConnected(false);
        wsRef.current = null;

        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current += 1;
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current - 1), 10000);
          void delay;

          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, delay);
        } else {
          void reconnectAttempts.current;
        }
      };
    } catch (error) {
      void error;
      setIsConnected(false);
    }
  }, [handleMessage]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [connect]);

  return {
    currencies,
    isConnected,
  };
}

