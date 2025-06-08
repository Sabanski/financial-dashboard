import { mockTransactions } from "../hooks/MockData";
import type { Transaction, FilterState } from "../interfaces/Types";
import DashboardHeader from "./DashboardHeader";
import TransactionDetailsModal from "./TransactionDetailsModal/TransactionDetailsModal";
import Table from "./TransactionsTable/Table";
import TableFilter from "./TransactionsTable/TableFilter";
import { useState, useEffect } from "react";
import { findMaxTransactionAmount, findMinTransactionAmount, formatTransactions } from "../hooks/helpers";
import { filterTransactions } from "../hooks/filterTable";
import { ThemeProvider } from "../contexts/ThemeContext";

const Dashboard: React.FC = () => {
    const initialData = formatTransactions(mockTransactions);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [filters, setFilters] = useState<FilterState>({
        dateRange: {
            startDate: '',
            endDate: ''
        },
        amountRange: {
            min: findMinTransactionAmount(initialData),
            max: findMaxTransactionAmount(initialData)
        },
        status: []
    });

    useEffect(() => {
        setTransactions(initialData);
    }, []);


    useEffect(() => {
        setTransactions(filterTransactions(initialData, filters));
    }, [filters]);

    const onViewDetails = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const handleItemsPerPageChange = (items: number) => {
        setItemsPerPage(items);
        setCurrentPage(1);
    }

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
        setCurrentPage(1);
    }

    const handleClearFilters = () => {
        setFilters({
            dateRange: {
                startDate: '',
                endDate: ''
            },
            amountRange: {
                min: null,
                max: null
            },
            status: []
        });
        setTransactions(initialData);
        setCurrentPage(1);
    }

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
                <div className="flex flex-col gap-2 max-w-7xl *:dark:bg-gray-800 ">
                    <DashboardHeader />

                    <TableFilter
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClearFilters={handleClearFilters}
                        totalTransactions={transactions.length}
                        filteredCount={transactions.length}
                    />

                    <div className="bg-white dark:bg-gray-800 rounded-lg ring-1 ring-gray-200 dark:ring-gray-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <Table
                                transactions={transactions}
                                onViewDetails={onViewDetails}
                                currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                onPageChange={handlePageChange}
                                onItemsPerPageChange={handleItemsPerPageChange}
                            />
                        </div>
                    </div>

                    {selectedTransaction && (
                        <TransactionDetailsModal
                            transaction={selectedTransaction}
                            onClose={() => setSelectedTransaction(null)}
                        />
                    )}
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Dashboard