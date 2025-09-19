import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/mockApi';
import type { Report, ReportCategory } from '../types';
import { FileText, Download, Share2, Eye, Calendar } from 'lucide-react';

const ReportsPage: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<'All' | ReportCategory>('All');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    useEffect(() => {
        api.getReports().then(data => {
            setReports(data);
            setLoading(false);
        });
    }, []);
    
    const filteredReports = useMemo(() => {
        if (activeCategory === 'All') return reports;
        return reports.filter(report => report.category === activeCategory);
    }, [reports, activeCategory]);

    const renderSkeleton = () => (
        [...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="flex gap-2 mt-6">
                    <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                    <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                </div>
            </div>
        ))
    );

    const categories: ('All' | ReportCategory)[] = ['All', 'Financial', 'Members', 'Staff', 'Equipment'];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Reports & Business Intelligence</h1>
            
            <div className="bg-white dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-grow flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <label htmlFor="start-date" className="text-sm font-medium">From:</label>
                        <input type="date" id="start-date" value={dateRange.start} onChange={e => setDateRange(prev => ({...prev, start: e.target.value}))} className="text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-primary-500 p-1.5"/>
                        <label htmlFor="end-date" className="text-sm font-medium">To:</label>
                        <input type="date" id="end-date" value={dateRange.end} onChange={e => setDateRange(prev => ({...prev, end: e.target.value}))} className="text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-primary-500 p-1.5"/>
                    </div>
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setActiveCategory(cat)}
                                className={`${
                                    activeCategory === cat
                                    ? 'border-primary-500 text-primary-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                                } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
                            >
                                {cat}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {loading ? renderSkeleton() : filteredReports.map(report => (
                    <div key={report.id} className="bg-white dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center mb-3">
                                    <FileText className="h-6 w-6 mr-3 text-primary-600 dark:text-primary-400" />
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{report.name}</h3>
                                </div>
                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">{report.category}</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{report.description}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">Last Generated: {report.lastGenerated}</p>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2">
                             <button className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
                                <Eye className="h-4 w-4" /><span>Preview</span>
                            </button>
                             <button className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                                <Download className="h-4 w-4" /><span>Export</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                                <Share2 className="h-4 w-4" /><span>Share</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportsPage;