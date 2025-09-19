import React, { useState, useEffect } from 'react';
import api from '../services/mockApi';
import type { Transaction } from '../types';
import Table from './ui/Table';
import Card from './ui/Card';
import { ArrowUpRight, ArrowDownLeft, Wallet, PlusCircle } from 'lucide-react';

const FinancePage: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getTransactions().then(data => {
            setTransactions(data);
            setLoading(false);
        });
    }, []);

    const transactionColumns: { header: string; accessor: keyof Transaction | ((item: Transaction) => React.ReactNode); }[] = [
        { header: 'Date', accessor: 'date' },
        { header: 'Description', accessor: 'description' },
        {
            header: 'Amount',
            accessor: (item: Transaction) => (
                <span className={item.type === 'Income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                    {item.type === 'Income' ? '+' : '-'}₹{item.amount.toLocaleString()}
                </span>
            ),
        },
        { 
            header: 'Type',
            accessor: (item: Transaction) => {
                const typeColor = {
                  Income: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
                  Expense: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
                };
                return <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${typeColor[item.type]}`}>{item.type}</span>;
            }
        },
        { 
            header: 'Status',
            accessor: (item: Transaction) => {
                const statusColor = {
                  Completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
                  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
                };
                return <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor[item.status]}`}>{item.status}</span>;
            }
        },
    ];

    const totalIncome = transactions.filter(t => t.type === 'Income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0);
    const netProfit = totalIncome - totalExpense;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Financial Overview</h1>
                <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900">
                    <PlusCircle className="h-5 w-5" />
                    <span>Add Transaction</span>
                </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card 
                    title="Total Income" 
                    value={`₹${totalIncome.toLocaleString()}`}
                    icon={<ArrowUpRight className="h-6 w-6 text-green-500" />}
                    isLoading={loading}
                />
                <Card 
                    title="Total Expense" 
                    value={`₹${totalExpense.toLocaleString()}`}
                    icon={<ArrowDownLeft className="h-6 w-6 text-red-500" />}
                    isLoading={loading}
                />
                <Card 
                    title="Net Profit" 
                    value={`₹${netProfit.toLocaleString()}`}
                    icon={<Wallet className="h-6 w-6" />}
                    isLoading={loading}
                />
            </div>

            <Table<Transaction> 
                title="Recent Transactions"
                columns={transactionColumns}
                data={transactions}
                isLoading={loading}
            />
        </div>
    );
};

export default FinancePage;
