import React, { useState, useEffect } from 'react';
import api from '../services/mockApi';
import type { CheckIn, Member } from '../types';
import Card from './ui/Card';
import Table from './ui/Table';
import { Users, LogIn, Search } from 'lucide-react';

const CheckinsPage: React.FC = () => {
    const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
    const [allMembers, setAllMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Member[]>([]);

    useEffect(() => {
        Promise.all([api.getCheckIns(), api.getMembers()]).then(([checkInData, memberData]) => {
            setCheckIns(checkInData);
            setAllMembers(memberData);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (searchTerm) {
            setSearchResults(
                allMembers.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        } else {
            setSearchResults([]);
        }
    }, [searchTerm, allMembers]);

    const handleCheckIn = (memberId: number) => {
        api.addCheckIn(memberId).then(newCheckIn => {
            setCheckIns(prev => [newCheckIn, ...prev]);
            setSearchTerm('');
            setSearchResults([]);
        });
    };

    const checkInColumns: { header: string; accessor: keyof CheckIn | ((item: CheckIn) => React.ReactNode); }[] = [
        {
            header: 'Member',
            accessor: (item: CheckIn) => (
                <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full object-cover mr-3" src={item.member.avatar} alt={item.member.name} />
                    <span className="font-medium text-gray-900 dark:text-white">{item.member.name}</span>
                </div>
            ),
        },
        { header: 'Check-in Time', accessor: 'checkInTime' },
        { 
          header: 'Status',
          accessor: (item: CheckIn) => (
            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
              {item.status}
            </span>
          )
        },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Member Check-ins</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card 
                    title="Live Occupancy"
                    value={checkIns.filter(c => c.status === 'Checked In').length}
                    icon={<Users className="h-6 w-6" />}
                    isLoading={loading}
                />
            </div>
            
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Manual Check-in</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for a member to check in..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    {searchResults.length > 0 && (
                        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                            {searchResults.map(member => (
                                <li key={member.id} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center" onClick={() => handleCheckIn(member.id)}>
                                    <span>{member.name}</span>
                                    <LogIn className="h-4 w-4 text-primary-500" />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <Table<CheckIn> 
                title="Today's Check-in Log"
                columns={checkInColumns}
                data={checkIns}
                isLoading={loading}
            />
        </div>
    );
};

export default CheckinsPage;
