import { ChevronLeft, ChevronRight } from "lucide-react"

interface TablePaginationProps {
    currentPage: number
    totalPages: number
    itemsPerPage: number
    totalItems: number
    onPageChange: (page: number) => void
    onItemsPerPageChange: (items: number) => void
    isDarkMode: boolean
}

const TablePagination = ({
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    onPageChange,
    onItemsPerPageChange,
    isDarkMode
}: TablePaginationProps) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    const getVisiblePages = () => {
        const delta = 2
        const range = []
        const rangeWithDots = []

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i)
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...')
        } else {
            rangeWithDots.push(1)
        }

        rangeWithDots.push(...range)

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages)
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages)
        }

        return rangeWithDots
    }

    const visiblePages = getVisiblePages()

    return (
        <div className={`flex items-center justify-between border-t border-gray-200 dark:border-gray-700 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} px-4 py-3 sm:px-6`}>
            <div className="flex items-center gap-4">
                <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Showing {startItem} to {endItem} of {totalItems} results
                </div>
                <div className="flex items-center gap-2">
                    <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Show:</label>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                        className={`border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'}`}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>per page</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-md border border-gray-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} px-4 py-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:bg-gray-50 dark:hover:bg-gray-700`}
                >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </button>

                <div className="flex items-center gap-1">
                    {visiblePages.map((page, index) => (
                        <div key={index}>
                            {page === '...' ? (
                                <span className={`px-3 py-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>...</span>
                            ) : (
                                <button
                                    onClick={() => onPageChange(page as number)}
                                    className={`px-3 py-2 text-sm rounded cursor-pointer ${currentPage === page
                                        ? `${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`
                                        : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                                        }`}
                                >
                                    {page}
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} px-4 py-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:bg-gray-50 dark:hover:bg-gray-700`}
                >
                    Next
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}

export default TablePagination