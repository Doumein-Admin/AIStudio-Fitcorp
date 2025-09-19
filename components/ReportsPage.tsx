import React, { useState, useEffect } from 'react';
import api from '../services/mockApi';
import type { Report } from '../types';
import { FileText, Download } from 'lucide-react';

const ReportsPage: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getReports().then(data => {
            setReports(data);
            setLoading(false);
        });
    }, []);

    const renderSkeleton = () => (
        [...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mt-6"></div>
            </div>
        ))
    );

    return (
        <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {loading ? renderSkeleton() : reports.map(report => (
                    <div key={report.id} className="bg-white dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center mb-3">
                                <FileText className="h-6 w-6 mr-3 text-primary-600 dark:text-primary-400" />
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{report.name}</h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{report.description}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">Last Generated: {report.lastGenerated}</p>
                        </div>
                        <div className="mt-6">
                             <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900">
                                <Download className="h-4 w-4" />
                                <span>Generate & Download</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportsPage;
