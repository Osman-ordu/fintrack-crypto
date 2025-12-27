// features/foreignUsd/index.ts
import { createAsyncThunk, type AsyncThunk } from '@reduxjs/toolkit';
import { createSliceModule } from '@/store/createSliceModule';
import { CallApi } from '@/services/api/callApi';
import { QuickTransaction, QuickTransactionResponse, CreateQuickTransaction } from './types';

export const getQuickTransaction = createAsyncThunk<QuickTransactionResponse, void, { rejectValue: string }>(
    'quickTransaction/get',
  async () => {
    return CallApi({
      url: `/api/transactions/quick-transaction`,
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
    