
import React from 'react';

interface TableProps<T> {
    columns: { header: string; accessor: keyof T | ((item: T) => React.ReactNode) }[];
    data: T[];
    title: string;
    isLoading?: boolean;
}

function Table<T extends { id: number | string }>(
    { columns, data, title, isLoading }: TableProps<T>
): React.ReactElement {
    
    const renderSkeleton = () => (
        [...Array(5)].map((_, i) => (
             <tr key={i} className="animate-pulse">
                {columns.map((_, j) => (
                    <td key={j} className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </td>
                ))}
            </tr>
        ))
    );

    return (
         <div className="bg-white dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                       {isLoading ? renderSkeleton() : data.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                {columns.map((col, index) => (
                                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                        {typeof col.accessor === 'function'
                                            ? col.accessor(item)
                                            : (item[col.accessor] as React.ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
