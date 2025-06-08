interface Customer {
    name: string;
    email: string;
}

export type TransactionStatus = "completed" | "pending" | "failed";
export type PaymentMethod = "credit_card" | "debit_card" | "bank_transfer";
export type SortColumn = 'id' | 'amount' | 'fees' | 'status' | 'date' | 'description' | 'merchant' | 'customer' | 'paymentMethod' | 'cardLastDigits';
export type SortDirection = 'asc' | 'desc';

export interface FilterState {
    dateRange: {
        startDate: string;
        endDate: string;
    };
    amountRange: {
        min: number | null;
        max: number | null;
    };
    status: TransactionStatus[];
}

export interface Transaction {
    id: string;
    amount: number;
    formattedAmount?: string;
    currency: string;
    status: TransactionStatus;
    date: string;
    description: string;
    merchant: string;
    customer: Customer;
    paymentMethod: PaymentMethod;
    cardLast4: string;
    fees: number;
    formattedFees?: string;
}