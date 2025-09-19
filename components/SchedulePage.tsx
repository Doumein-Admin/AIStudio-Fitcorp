import React, { useState, useEffect } from 'react';
import api from '../services/mockApi';
import type { TrainerSession } from '../types';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const SchedulePage: React.FC = () => {
    const [schedule, setSchedule] = useState<TrainerSession[]>([]);
    const [loading, setLoading] = useState(true);
    // In a real app, this would use the current date. Hardcoding for consistent mock data.
    const [currentWeek, setCurrentWeek] = useState(new Date('2024-07-22'));

    useEffect(() => {
        // The trainer name would be dynamic based on logged in user
        api.getTrainerSchedule('Vikram Singh').then(data => {
            setSchedule(data);
            setLoading(false);
        });
    }, []);
    
    const getWeekDays = (start: Date) => {
        return Array.from({ length: 7 }).map((_, i) => {
            const d = new Date(start);
            d.setDate(d.getDate() + i);
            return d;
        });
    };

    const days = getWeekDays(currentWeek);

    const getSessionsForDay = (day: Date) => {
        const dateString = day.toISOString().split('T')[0];
        return schedule.filter(s => s.date === dateString);
    };

    const SessionCard: React.FC<{ session: TrainerSession }> = ({ session }) => {
        const statusColors = {
            Upcoming: 'border-l-4 border-blue-500',
            Completed: 'border-l-4 border-green-500',
            Cancelled: 'border-l-4 border-red-500',
        };

        return (
            <div className={`p-3 bg-gray-50 dark:bg-gray-800 rounded-lg ${statusColors[session.status]}`}>
                <p className="font-semibold text-gray-800 dark:text-white">{session.clientName}</p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <Clock className="h-3 w-3 mr-1.5" />
                    <span>{session.startTime} - {session.endTime}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">My Schedule</h1>
            
            <div className="bg-white dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setCurrentWeek(d => new Date(d.setDate(d.getDate() - 7)))} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <h3 className="text-lg font-semibold">
                        {days[0].toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })} - {days[6].toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </h3>
                    <button onClick={() => setCurrentWeek(d => new Date(d.setDate(d.getDate() + 7)))} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
                    {days.map(day => (
                        <div key={day.toISOString()} className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg min-h-[100px]">
                            <p className="text-center font-semibold text-sm mb-2">{day.toLocaleDateString('en-IN', { weekday: 'short' })}</p>
                            <p className="text-center text-xs text-gray-500 mb-3">{day.getDate()}</p>
                            <div className="space-y-2">
                                {loading ? 
                                    <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div> :
                                    getSessionsForDay(day).map(session => <SessionCard key={session.id} session={session} />)
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SchedulePage;