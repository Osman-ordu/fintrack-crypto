import { useEffect, useRef, useState } from 'react';

export interface CurrencyData {
  symbol: string;
  buyPrice: number; // Alış fiyatı
  sellPrice: number; // Satış fiyatı
  changePercent: number; // Değişim yüzdesi
  timestamp: number; // Zaman
}

const SOCKET_URL = 'wss://anlikaltinfiyatlari.com/sio/p7013/socket.io/?EIO=4&transport=websocket';

export function useCurrencySocket() {
  const [currencies, setCurrencies] = useState<Record<string, CurrencyData>>({});
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const parseSocketIOMessage = (message: string): any => {
    try {
      if (!message || message.length === 0) return null;

      // Engine.IO packet format: <packet type>[<packet id>][<data>]
      // Packet types: 0=open, 1=close, 2=ping, 3=pong, 4=message, 5=upgrade, 6=noop
      
      const packetType = parseInt(message[0]);
      
      // Handle different packet types
      if (packetType === 0) {
        // Open packet - contains server configuration
        const config = message.length > 1 ? JSON.parse(message.substring(1)) : null;
        return { type: 'open', data: config };
      }
      
      if (packetType === 3) {
        // Pong packet
        return { type: 'pong' };
      }
      
      if (packetType === 4) {
        // Message packet - contains Socket.IO event
        let dataStr = message.substring(1);
        
        // Skip packet ID if present (numeric characters after packet type)
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
        // Ping packet - should respond with pong
        return { type: 'ping' };
      }
      
      return null;
    } catch (error) {
      void error;
      void message;
      return null;
    }
  };

  const handleMessage = (event: MessageEvent) => {
    try {
      const message = typeof event.data === 'string' ? event.data : '';
      const parsed = parseSocketIOMessage(message);
      
      if (!parsed) {
        return;
      }

      // Handle ping packets
      if (parsed.type === 'ping' && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send('3'); // Send pong
        return;
      }

      // Handle open packet
      if (parsed.type === 'open') {
        setIsConnected(true);
        reconnectAttempts.current = 0;
        
        // Send connect event
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          // Format: 40 = packet type 4 (message) + data "0" (connect event)
          wsRef.current.send('40');
        }
        return;
      }

      // Handle connect confirmation
      if (parsed.type === 'message' && parsed.event === '0') {
        
        // Subscribe to 'kapalicarsi' event
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          // Format: 42["subscribe","kapalicarsi"]
          const subscribeMessage = JSON.stringify(['subscribe', 'kapalicarsi']);
          wsRef.current.send(`42${subscribeMessage}`);
        }
        return;
      }

      // Handle data events
      if (parsed.type === 'message' && (parsed.event === 'kapalicarsi' || parsed.event === 'update')) {
        try {
          let data = parsed.data;
          
          // Eğer data string ise, JSON parse et
          if (typeof data === 'string') {
            try {
              data = JSON.parse(data);
            } catch (e) {
              return;
            }
          }
          
          if (data && typeof data === 'object') {
            const updatedCurrencies: Record<string, CurrencyData> = {};
            
            // Veri formatı 1: { "USDTRY": { "alis": "42.8453", "satis": "42.8995", "zaman": "12:06:52", "percent": "0.04" }, ... }
            // Veri formatı 2: { "USDTRY": 42.8677, "EURTRY": 50.6765, ... } (update event'i için)
            let dataObj = data;
            
            // Eğer array ise, ilk elemanı al
            if (Array.isArray(data) && data.length > 0) {
              dataObj = data[0];
              // Eğer array içindeki eleman string ise, parse et
              if (typeof dataObj === 'string') {
                try {
                  dataObj = JSON.parse(dataObj);
                } catch (e) {
                  void e;
                }
              }
            }
            
            // Veri bir obje ise ve içinde döviz kodları varsa
            if (dataObj && typeof dataObj === 'object' && !Array.isArray(dataObj)) {
              Object.keys(dataObj).forEach((key) => {
                const item = dataObj[key];
                
                // SOURCE, S, T gibi meta verileri atla
                if (key === 'SOURCE' || key === 'S' || key === 'T' || !item) {
                  return;
                }
                
                // Format 1: { "USDTRY": { "alis": "...", "satis": "...", "percent": "..." } }
                // veya { "GRAM": { "alis": "...", "satis": "...", "percent": "..." } }
                if (typeof item === 'object' && !Array.isArray(item) && item.alis && item.satis) {
                  let symbol = key;
                  
                  // Döviz kodu: USDTRY -> USD, EURTRY -> EUR (TRY ile bitenler için)
                  // GUMUSTRY -> GUMUSTRY (oldığu gibi kalır)
                  if (key.endsWith('TRY')) {
                    // GUMUSTRY özel durumu - olduğu gibi kalır
                    if (key === 'GUMUSTRY') {
                      symbol = 'GUMUSTRY';
                    } else {
                      symbol = key.replace('TRY', ''); // USDTRY -> USD
                    }
                  }
                  // Diğer semboller (GRAM, CEYREK, AYAR14, vb.) olduğu gibi kalır
                  
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
                // Format 2: { "USDTRY": 42.8677 } (update event'i - sadece ortalama fiyat)
                else if (typeof item === 'number') {
                  let symbol = key;
                  
                  // TRY ile bitenler için base symbol'e çevir
                  if (key.endsWith('TRY')) {
                    symbol = key.replace('TRY', ''); // USDTRY -> USD
                  }
                  // Diğer semboller olduğu gibi kalır
                  
                  const price = item;
                  
                  if (price > 0) {
                    // Update event'inde alış/satış ayrımı yok, ortalama fiyatı her ikisine de koy
                    updatedCurrencies[symbol] = {
                      symbol: symbol,
                      buyPrice: price,
                      sellPrice: price,
                      changePercent: 0, // Update event'inde percent yok
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

      // Log other messages for debugging
      if (parsed.type === 'message') {
        void parsed.event;
        void parsed.data;
      }
    } catch (error) {
      void error;
      void event;
    }
  };

  const connect = () => {
    try {
      const ws = new WebSocket(SOCKET_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        reconnectAttempts.current = 0;
        // Socket.IO will send open packet (0) first, we'll handle it in onmessage
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

        // Reconnect logic
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
  };

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
  }, []);

  return {
    currencies,
    isConnected,
  };
}

