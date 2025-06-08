import { ChevronUp, ChevronDown } from "lucide-react"
import type { SortColumn, SortDirection } from "../../interfaces/Types"

const TableHead = ({
    column,
    label,
    sortColumn,
    sortDirection,
    onSort
}: {
    column: SortColumn
    label: string
    sortColumn: SortColumn
    sortDirection: SortDirection
    onSort: (column: SortColumn) => void
}) => {
    const isActive = sortColumn === column

    return (
        <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-white uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
            onClick={() => onSort(column)}
        >
            <div className="flex items-center gap-1">
                {label}
                <div className="flex flex-col">
                    <ChevronUp
                        className={`h-3 w-3 ${isActive && sortDirection === 'asc' ? 'text-gray-900' : 'text-gray-300'}`}
                    />
                    <ChevronDown
                        className={`h-3 w-3 -mt-1 ${isActive && sortDirection === 'desc' ? 'text-gray-900' : 'text-gray-300'}`}
                    />
                </div>
            </div>
        </th>
    )
}

export default TableHead