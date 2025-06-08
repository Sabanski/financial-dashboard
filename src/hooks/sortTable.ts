import type { SortColumn, SortDirection, Transaction } from "../interfaces/Types"

export const sortTransactions = (transactions: Transaction[], sortColumn: SortColumn, sortDirection: SortDirection) => {
    return [...transactions].sort((a, b) => {
        let aValue: any, bValue: any

        switch (sortColumn) {
            case 'id':
                aValue = a.id
                bValue = b.id
                break
            case 'amount':
                aValue = a.amount
                bValue = b.amount
                break
            case 'fees':
                aValue = a.fees
                bValue = b.fees
                break
            case 'status':
                aValue = a.status
                bValue = b.status
                break
            case 'date':
                aValue = new Date(a.date)
                bValue = new Date(b.date)
                break
            case 'description':
                aValue = a.customer.name.toLowerCase()
                bValue = b.customer.name.toLowerCase()
                break
            case 'merchant':
                aValue = a.merchant.toLowerCase()
                bValue = b.merchant.toLowerCase()
                break
            case 'paymentMethod':
                aValue = a.paymentMethod.toLowerCase()
                bValue = b.paymentMethod.toLowerCase()
                break
            case 'cardLastDigits':
                aValue = a.cardLast4
                bValue = b.cardLast4
                break
            default:
                return 0
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
        return 0
    })
}