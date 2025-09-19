import React, { useState, useEffect } from 'react';
import api from '../services/mockApi';
import type { FitnessClass } from '../types';
import Table from './ui/Table';
import { PlusCircle, UserPlus } from 'lucide-react';

const ClassesPage: React.FC = () => {
    const [classes, setClasses] = useState<FitnessClass[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getClasses().then(data => {
            setClasses(data);
            setLoading(false);
        });
    }, []);
    
    const handleEnroll = (classId: number) => {
        setClasses(prevClasses => prevClasses.map(c => {
            if (c.id === classId && c.enrolled < c.capacity) {
                return { ...c, enrolled: c.enrolled + 1 };
            }
            return c;
        }));
    };

    const classColumns: { header: string; accessor: keyof FitnessClass | ((item: FitnessClass) => React.ReactNode); }[] = [
        { header: 'Class Name', accessor: 'name' },
        { header: 'Instructor', accessor: 'instructor' },
        { header: 'Schedule', accessor: 'schedule' },
        {
            header: 'Enrolled / Capacity',
            accessor: (item: FitnessClass) => (
                <div>
                    <span>{`${item.enrolled} / ${item.capacity}`}</span>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mt-1">
                        <div className="bg-primary-600 h-1.5 rounded-full" style={{ width: `${(item.enrolled / item.capacity) * 100}%` }}></div>
                    </div>
                </div>
            ),
        },
        { 
            header: 'Status',
            accessor: (item: FitnessClass) => {
                const statusColor = {
                  Upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
                  Ongoing: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
                  Completed: 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300',
                };
                return <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor[item.status]}`}>{item.status}</span>;
            }
        },
        {
            header: 'Action',
            accessor: (item: FitnessClass) => (
                <button 
                    onClick={() => handleEnroll(item.id)} 
                    disabled={item.enrolled >= item.capacity || item.status === 'Completed'}
                    className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    <UserPlus className="h-3 w-3" /> Enroll
                </button>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Class Management</h1>
                 <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900">
                    <PlusCircle className="h-5 w-5" />
                    <span>Add New Class</span>
                </button>
            </div>
            <Table<FitnessClass>
                title="Class Schedule"
                columns={classColumns}
                data={classes}
                isLoading={loading}
            />
        </div>
    );
};

export default ClassesPage;
