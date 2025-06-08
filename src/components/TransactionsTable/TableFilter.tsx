import { useState } from 'react';
import { Calendar, DollarSign, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import type { TransactionStatus, FilterState } from '../../interfaces/Types';

interface FilterPanelProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    onClearFilters: () => void;
    totalTransactions: number;
    filteredCount: number;
}

const TableFilter = ({
    filters,
    onFilterChange,
    onClearFilters,
    totalTransactions,
    filteredCount,
}: FilterPanelProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const statusOptions: TransactionStatus[] = ['completed', 'pending', 'failed'];


    const handleDateRangeChange = (field: 'startDate' | 'endDate', value: string) => {
        onFilterChange({
            ...filters,
            dateRange: {
                ...filters.dateRange,
                [field]: value
            }
        });
    };

    const handleAmountRangeChange = (field: 'min' | 'max', value: string) => {
        const numValue = value === '' ? null : parseFloat(value);
        onFilterChange({
            ...filters,
            amountRange: {
                ...filters.amountRange,
                [field]: numValue
            }
        });
    };

    const handleStatusChange = (status: TransactionStatus, checked: boolean) => {
        if (checked) {
            onFilterChange({
                ...filters,
                status: [...filters.status, status]
            });
        } else {
            onFilterChange({
                ...filters,
                status: filters.status.filter(s => s !== status)
            });
        }
    };

    const hasActiveFilters =
        filters.dateRange.startDate ||
        filters.dateRange.endDate ||
        filters.amountRange.min !== null ||
        filters.amountRange.max !== null ||
        filters.status.length > 0;

    return (
        <div className="bg-white rounded-lg ring-1 ring-gray-200 mb-6 dark:bg-gray-800 dark:ring-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Filter className="h-5 w-5 text-gray-500" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Filters</h3>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 cursor-pointer dark:text-gray-400"
                        >
                            {isExpanded ? (
                                <>Hide <ChevronUp className="h-4 w-4" /></>
                            ) : (
                                <>Show <ChevronDown className="h-4 w-4" /></>
                            )}
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                            Showing {filteredCount} of {totalTransactions} transactions
                        </span>
                        {hasActiveFilters && (
                            <button
                                onClick={onClearFilters}
                                className="flex items-center gap-1 px-3 py-1 text-sm cursor-pointer text-red-600 hover:text-red-800 dark:text-red-400 border border-red-200 rounded-md hover:bg-red-50 dark:border-red-300 dark:hover:bg-red-300"
                            >
                                <X className="h-4 w-4" />
                                Clear All
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {isExpanded && (
                <div className="px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-100">Date Range</label>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">From</label>
                                    <input
                                        type="date"
                                        value={filters.dateRange.startDate}
                                        onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:text-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">To</label>
                                    <input
                                        type="date"
                                        value={filters.dateRange.endDate}
                                        onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:text-gray-100"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-gray-500" />
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-100">Amount Range</label>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Minimum</label>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        value={filters.amountRange.min || ''}
                                        onChange={(e) => handleAmountRangeChange('min', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:text-gray-100" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Maximum</label>
                                    <input
                                        type="number"
                                        placeholder="1000.00"
                                        step="0.01"
                                        min="0"
                                        value={filters.amountRange.max || ''}
                                        onChange={(e) => handleAmountRangeChange('max', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:text-gray-100"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-100">Status</label>
                            <div className="space-y-2">
                                {statusOptions.map(status => (
                                    <label key={status} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={filters.status.includes(status)}
                                            onChange={(e) => handleStatusChange(status, e.target.checked)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:text-blue-400"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-100 capitalize">{status}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!isExpanded && hasActiveFilters && (
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-wrap gap-2">
                        {filters.dateRange.startDate && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-800 dark:text-blue-100">
                                From: {filters.dateRange.startDate}
                                <button
                                    onClick={() => handleDateRangeChange('startDate', '')}
                                    className="hover:bg-blue-200 rounded-full p-0.5 dark:hover:bg-blue-700"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}
                        {filters.dateRange.endDate && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-800 dark:text-blue-100">
                                To: {filters.dateRange.endDate}
                                <button
                                    onClick={() => handleDateRangeChange('endDate', '')}
                                    className="hover:bg-blue-200 rounded-full p-0.5 dark:hover:bg-blue-700"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}
                        {filters.amountRange.min !== null && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full dark:bg-green-800 dark:text-green-100">
                                Min: ${filters.amountRange.min}
                                <button
                                    onClick={() => handleAmountRangeChange('min', '')}
                                    className="hover:bg-green-200 rounded-full p-0.5 dark:hover:bg-green-700"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}
                        {filters.amountRange.max !== null && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full dark:bg-green-800 dark:text-green-100">
                                Max: ${filters.amountRange.max}
                                <button
                                    onClick={() => handleAmountRangeChange('max', '')}
                                    className="hover:bg-green-200 rounded-full p-0.5 dark:hover:bg-green-700"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}
                        {filters.status.map(status => (
                            <span key={status} className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full capitalize dark:bg-purple-800 dark:text-purple-100">
                                {status}
                                <button
                                    onClick={() => handleStatusChange(status, false)}
                                    className="hover:bg-purple-200 rounded-full p-0.5 dark:hover:bg-purple-700"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableFilter;