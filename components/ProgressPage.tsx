import React, { useState, useEffect } from 'react';
import api from '../services/mockApi';
import type { Member, ClientProgress } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronDown, Trophy } from 'lucide-react';

const ProgressChart: React.FC<{ data: any[], yKey: string, name: string, color: string }> = ({ data, yKey, name, color }) => (
    <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', borderRadius: '0.5rem' }} />
                <Legend />
                <Line type="monotone" dataKey={yKey} name={name} stroke={color} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

const ProgressPage: React.FC = () => {
    const [clients, setClients] = useState<Member[]>([]);
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
    const [progress, setProgress] = useState<ClientProgress | null>(null);
    const [loading, setLoading] = useState({ clients: true, progress: false });

    useEffect(() => {
        api.getTrainerClients('Vikram Singh').then(data => {
            setClients(data);
            if (data.length > 0) {
                setSelectedClientId(data[0].id);
            }
            setLoading(prev => ({ ...prev, clients: false }));
        });
    }, []);

    useEffect(() => {
        if (selectedClientId) {
            setLoading(prev => ({ ...prev, progress: true }));
            setProgress(null);
            api.getClientProgress(selectedClientId).then(data => {
                setProgress(data || null);
                setLoading(prev => ({ ...prev, progress: false }));
            });
        }
    }, [selectedClientId]);

    const selectedClient = clients.find(c => c.id === selectedClientId);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Client Progress Analytics</h1>
                <div className="relative">
                    <select
                        value={selectedClientId || ''}
                        onChange={(e) => setSelectedClientId(Number(e.target.value))}
                        disabled={loading.clients}
                        className="appearance-none w-full sm:w-64 pl-4 pr-10 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {loading.progress && <p>Loading progress...</p>}
            {!loading.progress && !progress && selectedClient && <p>No progress data found for {selectedClient.name}.</p>}

            {progress && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Measurement Trends</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                               <ProgressChart data={progress.measurements} yKey="weight" name="Weight (kg)" color="#3b82f6" />
                               <ProgressChart data={progress.measurements} yKey="bodyFat" name="Body Fat %" color="#ef4444" />
                               <ProgressChart data={progress.measurements} yKey="muscleMass" name="Muscle (kg)" color="#10b981" />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Before & After</h3>
                                <div className="flex gap-4">
                                    {progress.photos.slice(0, 2).map(photo => (
                                        <div key={photo.id} className="flex-1">
                                            <img src={photo.url} alt={`Progress on ${photo.date}`} className="rounded-lg object-cover w-full h-48" />
                                            <p className="text-center text-xs text-gray-500 mt-2">{photo.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                             <div className="bg-white dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Goals</h3>
                                <ul className="space-y-3">
                                  {progress.goals.map(goal => (
                                      <li key={goal.id} className="flex items-center gap-3">
                                          <Trophy className={`h-5 w-5 ${goal.status === 'Achieved' ? 'text-yellow-400' : 'text-gray-400'}`} />
                                          <div>
                                              <p className="text-sm font-medium">{goal.description}</p>
                                              <p className="text-xs text-gray-500">Target: {goal.targetDate} - <span className="font-semibold">{goal.status}</span></p>
                                          </div>
                                      </li>
                                  ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProgressPage;