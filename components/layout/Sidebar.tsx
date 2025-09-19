import React from 'react';
import { NAV_ITEMS, TRAINER_NAV_ITEMS, LOGOUT_ITEM } from '../../constants';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    activePage: string;
    setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, activePage, setActivePage }) => {
    const BrandLogo = () => (
        <div className="flex items-center justify-center h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">FitCorp</span>
        </div>
    );

    const handleNavClick = (pageName: string) => {
        setActivePage(pageName);
        if (window.innerWidth < 768) {
            setIsOpen(false);
        }
    };

    const NavLink: React.FC<{item: {name: string, href: string, icon: React.ReactNode}}> = ({ item }) => (
        <a
            href={item.href}
            onClick={(e) => { e.preventDefault(); handleNavClick(item.name); }}
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activePage === item.name
                ? 'bg-primary-50 text-primary-600 dark:bg-gray-800' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
        >
            {item.icon}
            <span>{item.name}</span>
        </a>
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
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {/* Trainer Tools Section */}
                    <div className="mb-4">
                        <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Trainer Tools</h3>
                        <div className="mt-2 space-y-2">
                            {TRAINER_NAV_ITEMS.map((item) => <NavLink key={item.name} item={item} />)}
                        </div>
                    </div>
                    
                    {/* Admin Tools Section */}
                    <div>
                        <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin Tools</h3>
                        <div className="mt-2 space-y-2">
                           {NAV_ITEMS.map((item) => <NavLink key={item.name} item={item} />)}
                        </div>
                    </div>

                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                     <a
                        href={LOGOUT_ITEM.href}
                        onClick={(e) => e.preventDefault()}
                        className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                         {LOGOUT_ITEM.icon}
                        <span>{LOGOUT_ITEM.name}</span>
                     </a>
                </div>
            </div>
        </>
    );
};

export default Sidebar;