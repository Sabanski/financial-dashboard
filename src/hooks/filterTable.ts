import type { FilterState, Transaction, TransactionStatus } from "../interfaces/Types";

export const filterTransactions = (transactions: Transaction[], filters: FilterState) => {
    return transactions.filter(transaction => {
        if (filters.dateRange.startDate || filters.dateRange.endDate) {
            const transactionDate = new Date(transaction.date);

            if (filters.dateRange.startDate) {
                const startDate = new Date(filters.dateRange.startDate);
                if (transactionDate < startDate) return false;
            }

            if (filters.dateRange.endDate) {
                const endDate = new Date(filters.dateRange.endDate);
                endDate.setHours(23, 59, 59, 999); // Include entire end date
                if (transactionDate > endDate) return false;
            }
        }

        if (filters.amountRange.min !== null || filters.amountRange.max !== null) {
            const amount = transaction.amount;

            if (filters.amountRange.min !== null && amount < filters.amountRange.min) {
                return false;
            }

            if (filters.amountRange.max !== null && amount > filters.amountRange.max) {
                return false;
            }
        }

        if (filters.status.length > 0) {

            if (!filters.status.includes(transaction.status.toLowerCase() as TransactionStatus)) {
                return false;
            }
        }

        return true;
    });
}