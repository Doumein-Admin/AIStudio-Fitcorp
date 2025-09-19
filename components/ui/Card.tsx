
import React from 'react';

interface CardProps {
    title: string;
    value: string | number;
    change?: number;
    changeType?: 'increase' | 'decrease';
    icon: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    isLoading?: boolean;
}

const Card: React.FC<CardProps> = ({ title, value, change, changeType, icon, children, className = '', isLoading }) => {
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                </div>
            );
        }

        return (
            <>
                <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase">{title}</h3>
                     <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg text-primary-600 dark:text-primary-400">
                        {icon}
                    </div>
                </div>
                <div className="mt-2">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
                    {change && (
                        <p className={`mt-1 text-xs ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                            <span className="font-semibold">{changeType === 'increase' ? '↑' : '↓'} {change}%</span> vs last month
                        </p>
                    )}
                </div>
                {children}
            </>
        );
    }

    return (
        <div className={`bg-white dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm ${className}`}>
           {renderContent()}
        </div>
    );
};

export default Card;
