
import React from 'react';
import type { RevenueData } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RevenueChartProps {
    data: RevenueData[];
    isLoading?: boolean;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, isLoading }) => {
    
     const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                    <p className="label font-semibold text-gray-800 dark:text-white">{`${label}`}</p>
                    <p className="intro text-primary-600 dark:text-primary-400">{`Revenue : ₹${payload[0].value.toLocaleString()}`}</p>
                </div>
            );
        }
        return null;
    };


    const renderContent = () => {
        if(isLoading) {
            return (
                <div className="animate-pulse flex items-end justify-between h-full px-4 pt-10">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-6 bg-gray-200 dark:bg-gray-700 rounded-t-md" style={{height: `${Math.random() * 80 + 20}%`}}></div>
                    ))}
                </div>
            );
        }

        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                    <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${Number(value) / 1000}k`} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }} />
                    <Legend wrapperStyle={{fontSize: "14px"}}/>
                    <Bar dataKey="revenue" fill="#3b82f6" name="Monthly Revenue" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
    
    return (
         <div className="bg-white dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Analytics</h3>
            <div style={{ width: '100%', height: 300 }}>
                {renderContent()}
            </div>
        </div>
    );
};

export default RevenueChart;
