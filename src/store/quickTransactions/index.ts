import { type AsyncThunk,createAsyncThunk } from '@reduxjs/toolkit';
import { CallApi } from '@/services/api/callApi';
import { createSliceModule } from '@/store/createSliceModule';
import { CreateQuickTransaction, QuickTransactionResponse } from './types';

export const getQuickTransaction = createAsyncThunk<QuickTransactionResponse, void, { rejectValue: string }>(
    'quickTransaction/get',
  async () => {
    return CallApi({
      url: `/api/transactions/quick-transaction`,
      method: 'GET',
    });
  }
);

export const getQuickTransactionLatest = createAsyncThunk<QuickTransactionResponse, void, { rejectValue: string }>(
  'quickTransaction/get',
async () => {
  return CallApi({
    url: `/api/transactions/quick-transaction/latest`,
    method: 'GET',
  });
}
);

export const postQuickTransaction = createAsyncThunk<QuickTransactionResponse, CreateQuickTransaction, { rejectValue: string }>(
  'quickTransaction/post',
async (data: CreateQuickTransaction) => {
  return CallApi({
    url: `/api/transactions/quick-transaction`,
    method: 'POST',
    data: data,
  });
}
);

export const quickTransactionReducer = createSliceModule<QuickTransactionResponse>
('quickTransaction',
    getQuickTransaction as AsyncThunk<QuickTransactionResponse, any, any>).reducer;

export const quickTransactionLatestReducer = createSliceModule<QuickTransactionResponse>
('quickTransactionLatest',
    getQuickTransactionLatest as AsyncThunk<QuickTransactionResponse, any, any>).reducer;
