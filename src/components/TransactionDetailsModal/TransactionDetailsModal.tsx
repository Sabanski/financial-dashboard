import { getStatusColor } from "../../hooks/helpers";
import type { Transaction } from "../../interfaces/Types";
import { Calendar, CreditCard, DollarSign, User, X } from "lucide-react";
import TransactionDetailField from "./TransactionDetailsField";

const TransactionDetailsModal = ({ transaction, onClose }: { transaction: Transaction | null, onClose: () => void }) => {
    if (!transaction) return null;

    return (
        <div className="fixed inset-0 bg-gray-600/50  overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto  p-5 ring-gray-200 max-w-xl  shadow-lg rounded-md bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Transaction Details</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer dark:text-gray-400"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg border border-gray-200 dark:border-gray-700 p-4 dark:bg-gray-800">
                        <div className="flex items-center justify-between mb-4 dark:bg-gray-800">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Amount: {transaction.formattedAmount}
                            </h4>
                            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                                {transaction.status}
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">Description: {transaction.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:bg-gray-800">
                        <div className="space-y-4">
                            <TransactionDetailField
                                icon={Calendar}
                                label="Transaction Date"
                                value={transaction.date}
                            />
                            <TransactionDetailField
                                icon={DollarSign}
                                label="Transaction ID"
                                value={transaction.id}
                            />
                            <TransactionDetailField
                                icon={CreditCard}
                                label="Payment Method"
                                value={`${transaction.paymentMethod.replace('_', ' ').toUpperCase()}${transaction.cardLast4 ? ` ending in ${transaction.cardLast4}` : ''
                                    }`}
                            />
                        </div>

                        <div className="space-y-4 dark:bg-gray-800">
                            <TransactionDetailField
                                icon={User}
                                label="Customer name"
                                value={transaction.customer.name}
                            />
                            <TransactionDetailField
                                icon={User}
                                label="Customer email"
                                value={transaction.customer.email}
                            />
                            <TransactionDetailField
                                icon={DollarSign}
                                label="Amount"
                                value={transaction.formattedAmount ? transaction.formattedAmount : 'N/A'}
                            />
                            <TransactionDetailField
                                icon={DollarSign}
                                label="Fees"
                                value={transaction.formattedFees ? transaction.formattedFees : 'N/A'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetailsModal;
