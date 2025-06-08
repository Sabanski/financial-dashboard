import type { FilterState } from "../interfaces/Types";
import type { SortColumn, SortDirection, Transaction, TransactionStatus } from "../interfaces/Types";

export const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
};

export const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100';
        case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100';
        case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
};

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const findMinTransactionAmount = (transactions: Transaction[]) => {
    return Math.min(...transactions.map(transaction => transaction.amount));
}

export const findMaxTransactionAmount = (transactions: Transaction[]) => {
    return Math.max(...transactions.map(transaction => transaction.amount));
}

export const formatTransactions = (transactions: Transaction[]) => {
    return transactions.map((transaction) => {
        return {
            ...transaction,
            id: transaction.id,
            amount: transaction.amount,
            formattedAmount: formatCurrency(transaction.amount, transaction.currency),
            currency: transaction.currency,
            status: transaction.status.toUpperCase() as TransactionStatus,
            date: formatDate(transaction.date),
            description: transaction.description,
            merchant: transaction.merchant,
            customer: {
                name: transaction.customer.name,
                email: transaction.customer.email
            },
            paymentMethod: transaction.paymentMethod,
            cardLast4: transaction.cardLast4,
            fees: transaction.fees,
            formattedFees: formatCurrency(transaction.fees, transaction.currency),
        }
    })
}