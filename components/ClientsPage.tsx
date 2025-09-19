import React, { useState, useEffect } from 'react';
import api from '../services/mockApi';
import type { Member, WorkoutPlan } from '../types';
import Card from './ui/Card';
import { Users, Activity, Target, MessageSquarePlus } from 'lucide-react';

const ClientsPage: React.FC = () => {
    const [clients, setClients] = useState<Member[]>([]);
    const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
    const [loading, setLoading] = useState(true);

    // Assuming the logged-in user is Vikram Singh
    const currentTrainer = 'Vikram Singh'; 

    useEffect(() => {
        Promise.all([
            api.getTrainerClients(currentTrainer),
            api.getWorkoutPlans()
        ]).then(([clientData, planData]) => {
            setClients(clientData);
            setWorkoutPlans(planData);
            setLoading(false);
        });
    }, []);

    const getClientPlanStatus = (clientId: number) => {
        const plan = workoutPlans.find(p => p.assignedTo.includes(clientId));
        return plan ? (
            <span className="text-xs font-semibold text-green-600 dark:text-green-400">{plan.name}</span>
        ) : (
            <span className="text-xs text-gray-500 dark:text-gray-400">No Plan Assigned</span>
        );
    };

    const activeClientsCount = clients.length;
    // These would be calculated based on more detailed data in a real app
    const highEngagementCount = Math.floor(activeClientsCount * 0.7);
    const goalsMetCount = 5;

    const ClientCard: React.FC<{ client: Member }> = ({ client }) => (
        <div className="bg-white dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm flex flex-col items-center text-center">
            <img src={client.avatar} alt={client.name} className="w-20 h-20 rounded-full object-cover mb-3" />
            <h4 className="font-semibold text-gray-900 dark:text-white">{client.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{client.membershipType} Member</p>
            <div className="my-2">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Workout Plan</p>
                {getClientPlanStatus(client.id)}
            </div>
             <button className="mt-auto w-full flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
                <MessageSquarePlus className="h-4 w-4" />
                <span>Add Session Note</span>
            </button>
        </div>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">My Clients</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="Active Clients" value={activeClientsCount} icon={<Users className="h-6 w-6" />} isLoading={loading} />
                <Card title="High Engagement" value={`${highEngagementCount}/${activeClientsCount}`} icon={<Activity className="h-6 w-6" />} isLoading={loading} />
                <Card title="Goals Met (This Month)" value={goalsMetCount} icon={<Target className="h-6 w-6" />} isLoading={loading} />
            </div>

            <div className="bg-white dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Client Roster</h3>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                             <div key={i} className="bg-gray-200 dark:bg-gray-700/50 p-4 rounded-xl animate-pulse h-48"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {clients.map(client => <ClientCard key={client.id} client={client} />)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientsPage;