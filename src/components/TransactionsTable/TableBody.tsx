import { Eye } from "lucide-react"
import { formatCurrency, formatDate, getStatusColor } from "../../hooks/helpers"
import type { Transaction } from "../../interfaces/Types"

const TableBody = ({
    transactions,
    onViewDetails,
    isDarkMode
}: {
    transactions: Transaction[]
    onViewDetails: (transaction: Transaction) => void
    isDarkMode: boolean
}) => {
    return (
        <tbody className={`bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700`}>
            {transactions.map((transaction) => (
                <tr className={`hover:bg-gray-50 dark:hover:bg-gray-700`} key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {transaction.formattedAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {transaction.formattedFees}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {transaction.merchant}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        <div>
                            <div>{transaction.customer.name}</div>
                            <div className="text-xs text-gray-500">{transaction.customer.email}</div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {transaction.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {transaction.cardLast4}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                            onClick={() => onViewDetails(transaction)}
                            className="text-blue-600 hover:text-blue-900  flex items-center gap-1 cursor-pointer dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            <Eye className="h-4 w-4" />
                            View Details
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

export default TableBody
