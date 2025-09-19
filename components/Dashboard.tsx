
import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import RevenueChart from './charts/RevenueChart';
import Table from './ui/Table';
import api from '../services/mockApi';
import type { DashboardSummary, RevenueData, Member, Equipment } from '../types';
import { IndianRupee, Users, UserPlus, TrendingDown, Dumbbell, ShieldCheck, Wrench, ShieldAlert } from 'lucide-react';

const Dashboard: React.FC = () => {
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
    const [recentMembers, setRecentMembers] = useState<Member[]>([]);
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [loading, setLoading] = useState({
        summary: true,
        revenue: true,
        members: true,
        equipment: true,
    });

    useEffect(() => {
        setLoading(prev => ({...prev, summary: true}));
        api.getDashboardSummary().then(data => {
            setSummary(data);
            setLoading(prev => ({...prev, summary: false}));
        });

        setLoading(prev => ({...prev, revenue: true}));
        api.getRevenueData().then(data => {
            setRevenueData(data);
            setLoading(prev => ({...prev, revenue: false}));
        });
        
        setLoading(prev => ({...prev, members: true}));
        api.getRecentMembers().then(data => {
            setRecentMembers(data);
            setLoading(prev => ({...prev, members: false}));
        });

        setLoading(prev => ({...prev, equipment: true}));
        api.getEquipmentStatus().then(data => {
            setEquipment(data);
            setLoading(prev => ({...prev, equipment: false}));
        });
    }, []);

    // FIX: Explicitly type memberColumns to match the expected type for the Table component's columns prop.
    // This resolves the TypeScript error where string was not assignable to keyof Member.
    const memberColumns: { header: string; accessor: keyof Member | ((item: Member) => React.ReactNode); }[] = [
        {
            header: 'Name',
            accessor: (item: Member) => (
                <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full object-cover mr-3" src={item.avatar} alt={item.name} />
                    <span>{item.name}</span>
                </div>
            ),
        },
        { header: 'Membership', accessor: 'membershipType' },
        { 
          header: 'Status',
          accessor: (item: Member) => {
            const statusColor = {
              Active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
              Inactive: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
              Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
            };
            return <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor[item.status]}`}>{item.status}</span>
          }
        },
        { header: 'Last Check-in', accessor: 'lastCheckIn' },
    ];
    
    // FIX: Explicitly type equipmentColumns to match the expected type for the Table component's columns prop.
    // This resolves the TypeScript error where string was not assignable to keyof Equipment.
    const equipmentColumns: { header: string; accessor: keyof Equipment | ((item: Equipment) => React.ReactNode); }[] = [
        { header: 'Equipment', accessor: 'name' },
        { 
            header: 'Status', 
            accessor: (item: Equipment) => {
                const statusInfo = {
                    Operational: { color: 'green', icon: <ShieldCheck className="h-4 w-4 mr-2" /> },
                    Maintenance: { color: 'yellow', icon: <Wrench className="h-4 w-4 mr-2" /> },
                    'Out of Order': { color: 'red', icon: <ShieldAlert className="h-4 w-4 mr-2" /> },
                };
                const {color, icon} = statusInfo[item.status];
                return <div className={`flex items-center text-${color}-500`} >{icon} {item.status}</div>
            }
        },
        { header: 'Next Maintenance', accessor: 'nextMaintenance' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Super Admin Dashboard</h1>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card 
                    title="Total Revenue" 
                    value={summary ? `₹${summary.totalRevenue.toLocaleString()}` : ''}
                    change={12.5}
                    changeType="increase"
                    icon={<IndianRupee className="h-6 w-6" />}
                    isLoading={loading.summary}
                />
                <Card 
                    title="Active Members" 
                    value={summary ? summary.activeMembers : ''}
                    change={2.1}
                    changeType="increase"
                    icon={<Users className="h-6 w-6" />}
                    isLoading={loading.summary}
                />
                <Card 
                    title="New Members" 
                    value={summary ? `+${summary.newMembers}` : ''}
                    change={15}
                    changeType="increase"
                    icon={<UserPlus className="h-6 w-6" />}
                    isLoading={loading.summary}
                />
                <Card 
                    title="Churn Rate" 
                    value={summary ? `${summary.churnRate}%` : ''}
                    change={0.5}
                    changeType="decrease"
                    icon={<TrendingDown className="h-6 w-6" />}
                    isLoading={loading.summary}
                />
            </div>
            
            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RevenueChart data={revenueData} isLoading={loading.revenue} />
                </div>
                <div className="lg:col-span-1">
                     <Table<Equipment> 
                        title="Equipment Status"
                        columns={equipmentColumns}
                        data={equipment}
                        isLoading={loading.equipment}
                    />
                </div>
            </div>

            <div>
                 <Table<Member> 
                    title="Recent Member Activity"
                    columns={memberColumns}
                    data={recentMembers}
                    isLoading={loading.members}
                />
            </div>

        </div>
    );
};

export default Dashboard;