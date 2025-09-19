import React, { useState, useEffect } from 'react';
import api from '../services/mockApi';
import type { MaintenanceRequest, MaintenancePriority } from '../types';
import Table from './ui/Table';
import Card from './ui/Card';
import AddMaintenanceRequestModal from './modals/AddMaintenanceRequestModal';
import { PlusCircle, Wrench, AlertTriangle, ShieldCheck } from 'lucide-react';

const MaintenancePage: React.FC = () => {
    const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        api.getMaintenanceRequests().then(data => {
            setRequests(data);
            setLoading(false);
        });
    }, []);

    const handleAddRequest = (newRequest: MaintenanceRequest) => {
        setRequests(prev => [newRequest, ...prev]);
    };
    
    const priorityConfig: { [key in MaintenancePriority]: { color: string; icon: React.ReactNode } } = {
        Low: { color: 'text-gray-500 dark:text-gray-400', icon: <Wrench className="h-4 w-4" /> },
        Medium: { color: 'text-yellow-500', icon: <Wrench className="h-4 w-4" /> },
        High: { color: 'text-orange-500', icon: <AlertTriangle className="h-4 w-4" /> },
        Critical: { color: 'text-red-500', icon: <AlertTriangle className="h-4 w-4" /> },
    };

    const requestColumns: { header: string; accessor: keyof MaintenanceRequest | ((item: MaintenanceRequest) => React.ReactNode); }[] = [
        { header: 'Equipment', accessor: 'equipmentName' },
        { header: 'Reported By', accessor: 'reportedBy' },
        { header: 'Date Reported', accessor: 'dateReported' },
        { 
            header: 'Priority',
            accessor: (item: MaintenanceRequest) => {
                const config = priorityConfig[item.priority];
                return <div className={`flex items-center gap-2 font-medium ${config.color}`}>{config.icon} {item.priority}</div>;
            }
        },
        { 
            header: 'Status',
            accessor: (item: MaintenanceRequest) => {
                const statusColor = {
                  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
                  'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
                  Completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
                };
                return <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor[item.status]}`}>{item.status}</span>;
            }
        },
    ];

    return (
        <>
            <AddMaintenanceRequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onRequestAdded={handleAddRequest}
            />
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Equipment Maintenance</h1>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900">
                        <PlusCircle className="h-5 w-5" />
                        <span>Add New Request</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card title="Pending Requests" value={requests.filter(r => r.status === 'Pending').length} icon={<AlertTriangle className="h-6 w-6" />} isLoading={loading}/>
                    <Card title="In Progress" value={requests.filter(r => r.status === 'In Progress').length} icon={<Wrench className="h-6 w-6" />} isLoading={loading}/>
                    <Card title="Completed This Month" value={requests.filter(r => r.status === 'Completed').length} icon={<ShieldCheck className="h-6 w-6" />} isLoading={loading}/>
                </div>

                <Table<MaintenanceRequest>
                    title="All Maintenance Requests"
                    columns={requestColumns}
                    data={requests}
                    isLoading={loading}
                />
            </div>
        </>
    );
};

export default MaintenancePage;
