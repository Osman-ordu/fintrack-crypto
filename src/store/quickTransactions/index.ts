// features/foreignUsd/index.ts
import { createAsyncThunk, type AsyncThunk } from '@reduxjs/toolkit';
import { createSliceModule } from '@/store/createSliceModule';
import { CallApi } from '@/services/api/callApi';
import { QuickTransactionResponse } from './types';

export const getQuickTransaction = createAsyncThunk<QuickTransactionResponse, void, { rejectValue: string }>(
    'quickTransaction/get',
  async () => {
    return CallApi({
      url: `/api/transactions/quick-transaction-list`,
      method: 'GET',
    });
  }
);

export const quickTransactionReducer = createSliceModule<QuickTransactionResponse>
('quickTransaction',
    getQuickTransaction as AsyncThunk<QuickTransactionResponse, any, any>).reducer;
