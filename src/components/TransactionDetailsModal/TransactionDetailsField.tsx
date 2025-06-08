const TransactionDetailField = ({ icon: Icon, label, value, subValue }: { icon: any, label: string, value: string, subValue?: string }) => (
    <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-gray-400" />
        <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{value}</p>
            {subValue && <p className="text-sm text-gray-500 dark:text-gray-400">{subValue}</p>}
        </div>
    </div>
);

export default TransactionDetailField;
