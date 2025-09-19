import React, { useState, useEffect } from 'react';
import api from '../services/mockApi';
import type { Exercise, WorkoutPlan, Member, ExerciseCategory } from '../types';
import { PlusCircle, Dumbbell, Zap, Heart, Search } from 'lucide-react';
import CreateWorkoutPlanModal from './modals/CreateWorkoutPlanModal';

const WorkoutsPage: React.FC = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [plans, setPlans] = useState<WorkoutPlan[]>([]);
    const [clients, setClients] = useState<Member[]>([]);
    const [loading, setLoading] = useState({ exercises: true, plans: true });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<ExerciseCategory | 'All'>('All');

    useEffect(() => {
        api.getExercises().then(data => {
            setExercises(data);
            setLoading(prev => ({ ...prev, exercises: false }));
        });
        api.getWorkoutPlans().then(data => {
            setPlans(data);
            setLoading(prev => ({ ...prev, plans: false }));
        });
        api.getTrainerClients('Vikram Singh').then(setClients);
    }, []);

    const handlePlanCreated = (newPlan: WorkoutPlan) => {
        setPlans(prev => [newPlan, ...prev]);
    };
    
    const filteredExercises = exercises.filter(ex => 
        (ex.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (categoryFilter === 'All' || ex.category === categoryFilter)
    );

    const categoryIcons: Record<ExerciseCategory, React.ReactNode> = {
        Cardio: <Heart className="h-5 w-5 text-red-500" />,
        Strength: <Dumbbell className="h-5 w-5 text-blue-500" />,
        Flexibility: <Zap className="h-5 w-5 text-yellow-500" />,
        CrossFit: <Dumbbell className="h-5 w-5 text-purple-500" />,
    };

    return (
        <>
            <CreateWorkoutPlanModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onPlanCreated={handlePlanCreated}
                exercises={exercises}
                clients={clients}
            />
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Workout Management</h1>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
                        <PlusCircle className="h-5 w-5" />
                        <span>Create Workout Plan</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Workout Plans</h3>
                            <ul className="space-y-3">
                                {loading.plans ? [...Array(3)].map((_, i) => <li key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></li>) :
                                plans.map(plan => (
                                    <li key={plan.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <p className="font-semibold text-gray-800 dark:text-white">{plan.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{plan.difficulty} &bull; {plan.exercises.length} exercises</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Exercise Library</h3>
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                             <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input type="text" placeholder="Search exercises..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"/>
                            </div>
                            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value as any)} className="text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                                <option value="All">All Categories</option>
                                <option value="Cardio">Cardio</option>
                                <option value="Strength">Strength</option>
                                <option value="Flexibility">Flexibility</option>
                            </select>
                        </div>
                        <div className="max-h-96 overflow-y-auto pr-2">
                             <ul className="space-y-3">
                                {loading.exercises ? [...Array(4)].map((_, i) => <li key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></li>) :
                                filteredExercises.map(ex => (
                                    <li key={ex.id} className="flex items-center gap-4 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <img src={ex.imageUrl} alt={ex.name} className="h-12 w-12 object-cover rounded-md" />
                                        <div className="flex-grow">
                                            <p className="font-semibold text-gray-800 dark:text-white">{ex.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{ex.muscleGroup} &bull; {ex.equipment}</p>
                                        </div>
                                        {categoryIcons[ex.category]}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WorkoutsPage;