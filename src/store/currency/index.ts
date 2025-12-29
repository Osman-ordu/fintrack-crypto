import { createAsyncThunk, type AsyncThunk } from '@reduxjs/toolkit';
import { createSliceModule } from '@/store/createSliceModule';
import { CallApi } from '@/services/api/callApi';
import { CurrencyResponse } from '@/store/currency/types';

export const getCurrency = createAsyncThunk<CurrencyResponse, string, { rejectValue: string }>(
  'currency/get',
  async (currency: string) => {
    return CallApi({
      url: `/latest/${currency}`,
      method: 'GET',
    });
  }
);

export const currencyReducer = createSliceModule<CurrencyResponse>('currency',getCurrency as AsyncThunk<CurrencyResponse, any, any>).reducer;
