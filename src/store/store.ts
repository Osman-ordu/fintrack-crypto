
import { configureStore } from '@reduxjs/toolkit';
import { currencyReducer } from '@/store/currency';
import { quickTransactionReducer } from '@/store/quickTransactions';


export const store = configureStore({
  reducer: {
    currencyValue: currencyReducer,
    quickTransaction: quickTransactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
