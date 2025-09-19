import React, { useState, useEffect } from 'react';
import api from '../services/mockApi';
import type { StaffMember } from '../types';
import Table from './ui/Table';
import AddStaffModal from './modals/AddStaffModal';
import { PlusCircle, Star } from 'lucide-react';

const StaffPage: React.FC = () => {
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    useEffect(() => {
        api.getStaff().then(data => {
            setStaff(data);
            setLoading(false);
        });
    }, []);

    const handleAddStaff = (newStaff: StaffMember) => {
        setStaff(prevStaff => [newStaff, ...prevStaff]);
    };

    const staffColumns: { header: string; accessor: keyof StaffMember | ((item: StaffMember) => React.ReactNode); }[] = [
        {
            header: 'Name',
            accessor: (item: StaffMember) => (
                <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full object-cover mr-3" src={item.avatar} alt={item.name} />
                     <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.email}</p>
                    </div>
                </div>
            ),
        },
        { header: 'Role', accessor: 'role' },
        { 
            header: 'Status',
            accessor: (item: StaffMember) => {
                const statusColor = {
                    Active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
                    'On Leave': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
                };
                return <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor[item.status]}`}>{item.status}</span>;
            }
        },
        { 
            header: 'Member Satisfaction',
            accessor: (item: StaffMember) => (
                <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{item.memberSatisfaction}%</span>
                </div>
            )
        },
        { header: 'Member Since', accessor: 'since' },
    ];

    return (
        <>
            <AddStaffModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onStaffAdded={handleAddStaff}
            />
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Staff Management</h1>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900">
                        <PlusCircle className="h-5 w-5" />
                        <span>Add New Staff</span>
                    </button>
                </div>
                <Table<StaffMember>
                    title="Staff List"
                    columns={staffColumns}
                    data={staff}
                    isLoading={loading}
                />
            </div>
        </>
    );
};

export default StaffPage;
