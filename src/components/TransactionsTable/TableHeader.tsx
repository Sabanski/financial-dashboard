import TableHead from "./TableHead"

import type { SortColumn, SortDirection } from "../../interfaces/Types"

const TableHeader = ({
    sortColumn,
    sortDirection,
    onSort,
    isDarkMode
}: {
    sortColumn: SortColumn
    sortDirection: SortDirection
    onSort: (column: SortColumn) => void
    isDarkMode: boolean
}) => {
    return (
        <thead className={`bg-gray-50 dark:bg-gray-700`}>
            <tr>
                <TableHead column="id" label="ID" sortColumn={sortColumn} sortDirection={sortDirection} onSort={onSort} />
                <TableHead column="amount" label="Amount" sortColumn={sortColumn} sortDirection={sortDirection} onSort={onSort} />
                <TableHead column="fees" label="Fees" sortColumn={sortColumn} sortDirection={sortDirection} onSort={onSort} />
                <TableHead column="status" label="Status" sortColumn={sortColumn} sortDirection={sortDirection} onSort={onSort} />
                <TableHead column="date" label="Date" sortColumn={sortColumn} sortDirection={sortDirection} onSort={onSort} />
                <TableHead column="description" label="Description" sortColumn={sortColumn} sortDirection={sortDirection} onSort={onSort} />
                <TableHead column="merchant" label="Merchant" sortColumn={sortColumn} sortDirection={sortDirection} onSort={onSort} />
                <TableHead column="customer" label="Customer" sortColumn={sortColumn} sortDirection={sortDirection} onSort={onSort} />
                <TableHead column="paymentMethod" label="Payment Method" sortColumn={sortColumn} sortDirection={sortDirection} onSort={onSort} />
                <TableHead column="cardLastDigits" label="CVV" sortColumn={sortColumn} sortDirection={sortDirection} onSort={onSort} />
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                    Actions
                </th>
            </tr>
        </thead>
    )
}

export default TableHeader

