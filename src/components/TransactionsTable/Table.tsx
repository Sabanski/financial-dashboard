import { useEffect, useState } from "react"
import type { SortColumn, SortDirection, Transaction } from "../../interfaces/Types"
import TableBody from "./TableBody"
import TableHeader from "./TableHeader"
import TablePagination from "./TablePagination"
import { sortTransactions } from "../../hooks/sortTable"
import { useTheme } from "../../contexts/ThemeContext"

interface TableProps {
    transactions: Transaction[]
    onViewDetails: (transaction: Transaction) => void
    currentPage: number
    itemsPerPage: number
    onPageChange: (page: number) => void
    onItemsPerPageChange: (items: number) => void
}

const Table = ({
    transactions,
    onViewDetails,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange
}: TableProps) => {
    const [sortColumn, setSortColumn] = useState<SortColumn>('date')
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
    const [sortedTransactions, setSortedTransactions] = useState<Transaction[]>([])
    const [paginatedTransactions, setPaginatedTransactions] = useState<Transaction[]>([])
    const { isDarkMode } = useTheme()

    useEffect(() => {
        setSortedTransactions(sortTransactions(transactions, sortColumn, sortDirection))
    }, [transactions, sortColumn, sortDirection])

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        setPaginatedTransactions(sortedTransactions.slice(startIndex, endIndex))
    }, [sortedTransactions, currentPage, itemsPerPage])

    const handleSort = (column: SortColumn) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }

        onPageChange(1)
    }

    const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700">
            <div className="overflow-x-auto">
                <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
                    <table className="w-full text-gray-900 dark:text-gray-100">
                        <TableHeader
                            sortColumn={sortColumn}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                            isDarkMode={isDarkMode}
                        />
                        <TableBody
                            transactions={paginatedTransactions}
                            onViewDetails={onViewDetails}
                            isDarkMode={isDarkMode}
                        />
                    </table>
                </div>
            </div>
            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={sortedTransactions.length}
                onPageChange={onPageChange}
                onItemsPerPageChange={onItemsPerPageChange}
                isDarkMode={isDarkMode}
            />
        </div>
    );
}

export default Table;