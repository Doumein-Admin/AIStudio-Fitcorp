import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/mockApi';
import type { Member } from '../types';
import Table from './ui/Table';
import Card from './ui/Card';
import AddMemberModal from './modals/AddMemberModal';
import { Users, UserCheck, UserX, PlusCircle, Search } from 'lucide-react';

const MembersPage: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const fetchMembers = () => {
        setLoading(true);
        api.getMembers().then(data => {
            setMembers(data);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleAddMember = (newMember: Member) => {
        setMembers(prevMembers => [newMember, ...prevMembers]);
    };

    const filteredMembers = useMemo(() => {
        return members.filter(member => {
            const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  member.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'All' || member.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [members, searchTerm, statusFilter]);

    const memberColumns: { header: string; accessor: keyof Member | ((item: Member) => React.ReactNode); }[] = [
        {
            header: 'Name',
            accessor: (item: Member) => (
                <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full object-cover mr-3" src={item.avatar} alt={item.name} />
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.email}</p>
                    </div>
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
        { header: 'Join Date', accessor: 'joinDate' },
        { header: 'Trainer', accessor: 'trainer' },
    ];

    const activeMembers = members.filter(m => m.status === 'Active').length;
    const inactiveMembers = members.filter(m => m.status === 'Inactive').length;

    return (
        <>
            <AddMemberModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onMemberAdded={handleAddMember}
            />
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Member Management</h1>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900">
                        <PlusCircle className="h-5 w-5" />
                        <span>Add New Member</span>
                    </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card title="Total Members" value={members.length} icon={<Users className="h-6 w-6" />} isLoading={loading}/>
                    <Card title="Active Members" value={activeMembers} icon={<UserCheck className="h-6 w-6" />} isLoading={loading} />
                    <Card title="Inactive Members" value={inactiveMembers} icon={<UserX className="h-6 w-6" />} isLoading={loading} />
                </div>
                
                <div className="bg-white dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                             className="text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                     <Table<Member> 
                        title="All Members"
                        columns={memberColumns}
                        data={filteredMembers}
                        isLoading={loading}
                    />
                </div>
            </div>
        </>
    );
}

export default MembersPage;
