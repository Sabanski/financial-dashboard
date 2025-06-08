import { getStatusColor } from "../../hooks/helpers"
import type { Transaction } from "../../interfaces/Types"

const TableData = ({ transaction, column }: { transaction: Transaction, column: string }) => {
    return (
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {column === "id" && <span>{transaction.id}</span>}
            {column === "amount" && <span>{transaction.amount}</span>}
            {column === "fees" && <span>{transaction.fees}</span>}
            {column === "status" && <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(transaction.status)}`}>{transaction.status}</span>}
            {column === "date" && <span>{transaction.date}</span>}
            {column === "description" && <span>{transaction.description}</span>}
            {column === "merchant" && <span>{transaction.merchant}</span>}
            {column === "customer" && <span>{transaction.customer.name}</span>}
            {column === "paymentMethod" && <span>{transaction.paymentMethod}</span>}
            {column === "cardLastDigits" && <span>{transaction.cardLast4}</span>}
        </td>
    )
}

export default TableData
