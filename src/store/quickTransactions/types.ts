export interface QuickTransactionResponse {
    data: QuickTransaction[];
    message: string;
    status: string;
    timestamp: string;
}
export interface QuickTransaction {
    id: string;
    baseAsset: string;
        quoteAsset: string;
        amount: number;
    transactionDate: Date;
    total: number;
}