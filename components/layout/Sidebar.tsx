
import React from 'react';
import { NAV_ITEMS } from '../../constants';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const BrandLogo = () => (
        <div className="flex items-center justify-center h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">FitCorp</span>
        </div>
    );

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-shrink-0 z-30 flex flex-col`}>
                <BrandLogo />
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                item.name === 'Dashboard' 
                                ? 'bg-primary-50 text-primary-600 dark:bg-gray-800' 
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </a>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                     <a
                        href="#"
                        className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                         <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                        <span>Logout</span>
                     </a>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
