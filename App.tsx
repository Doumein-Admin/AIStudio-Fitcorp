import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './components/Dashboard';
import MembersPage from './components/MembersPage';
import StaffPage from './components/StaffPage';
import ClassesPage from './components/ClassesPage';
import FinancePage from './components/FinancePage';
import ReportsPage from './components/ReportsPage';
import SettingsPage from './components/SettingsPage';
import CheckinsPage from './components/CheckinsPage';
import MaintenancePage from './components/MaintenancePage';


const App: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [activePage, setActivePage] = useState('Dashboard');

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setSidebarOpen(false); // On desktop, sidebar is not controlled by this state
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Check for saved theme preference
    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const renderPage = () => {
        switch (activePage) {
            case 'Dashboard': return <DashboardPage />;
            case 'Members': return <MembersPage />;
            case 'Staff': return <StaffPage />;
            case 'Classes': return <ClassesPage />;
            case 'Check-ins': return <CheckinsPage />;
            case 'Finance': return <FinancePage />;
            case 'Maintenance': return <MaintenancePage />;
            case 'Reports': return <ReportsPage />;
            case 'Settings': return <SettingsPage />;
            default: return <DashboardPage />;
        }
    };


    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Sidebar 
                isOpen={sidebarOpen} 
                setIsOpen={setSidebarOpen}
                activePage={activePage}
                setActivePage={setActivePage}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

export default App;
