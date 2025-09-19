import React, { useState } from 'react';
import Modal from '../ui/Modal';
import api from '../../services/mockApi';
import type { WorkoutPlan, Exercise, Member } from '../../types';
import { Search } from 'lucide-react';

interface CreateWorkoutPlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPlanCreated: (newPlan: WorkoutPlan) => void;
    exercises: Exercise[];
    clients: Member[];
}

const CreateWorkoutPlanModal: React.FC<CreateWorkoutPlanModalProps> = ({ isOpen, onClose, onPlanCreated, exercises, clients }) => {
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
    const [assignedTo, setAssignedTo] = useState<number[]>([]);
    const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const newPlanData = {
                name,
                difficulty,
                assignedTo,
                exercises: selectedExercises.map(exId => ({ exerciseId: exId, sets: 3, reps: '10-12' })) // Default sets/reps
            };
            const newPlan = await api.addWorkoutPlan(newPlanData);
            onPlanCreated(newPlan);
            onClose();
            // Reset form
            setName('');
            setDifficulty('Beginner');
            setAssignedTo([]);
            setSelectedExercises([]);
        } catch (error) {
            console.error("Failed to create plan", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const toggleExercise = (id: number) => {
        setSelectedExercises(prev => prev.includes(id) ? prev.filter(exId => exId !== id) : [...prev, id]);
    };
    
    const filteredExercises = exercises.filter(ex => ex.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Workout Plan" size="lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Plan Name</label>
                        {/* FIX: Replaced custom 'input' class with Tailwind CSS utility classes for consistency. */}
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Difficulty</label>
                        {/* FIX: Replaced custom 'input' class with Tailwind CSS utility classes for consistency. */}
                        <select value={difficulty} onChange={e => setDifficulty(e.target.value as any)} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                    </div>
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assign to Clients (Optional)</label>
                    {/* FIX: Replaced custom 'input' class with Tailwind CSS utility classes for consistency. */}
                    <select multiple value={assignedTo.map(String)} onChange={(e) => setAssignedTo(Array.from(e.target.selectedOptions, option => Number(option.value)))} className="w-full h-24 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Exercises</label>
                    <div className="relative mb-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input type="text" placeholder="Search exercises..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"/>
                    </div>
                    <div className="max-h-48 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-2 space-y-2">
                        {filteredExercises.map(ex => (
                            <label key={ex.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                <input type="checkbox" checked={selectedExercises.includes(ex.id)} onChange={() => toggleExercise(ex.id)} className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                                <span>{ex.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                    {/* FIX: Replaced custom 'btn-secondary' class with Tailwind CSS utility classes for consistency. */}
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">Cancel</button>
                    {/* FIX: Replaced custom 'btn-primary' class with Tailwind CSS utility classes for consistency. */}
                    <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:bg-primary-300">
                        {isSubmitting ? 'Creating...' : 'Create Plan'}
                    </button>
                </div>
            </form>
            {/* FIX: Removed invalid <style jsx> tag which was causing a TypeScript error. Replaced custom classes with Tailwind utilities. */}
        </Modal>
    );
};

export default CreateWorkoutPlanModal;
