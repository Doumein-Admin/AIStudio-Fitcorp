
import React, { useState, useEffect } from 'react';
import type { User } from '../../types';
import api from '../../services/mockApi';
import useTheme from '../../hooks/useTheme';
import { Sun, Moon, Bell, Menu, Search, ChevronDown } from 'lucide-react';

interface HeaderProps {
    toggleSidebar: () => void;
    isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isMobile }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [theme, toggleTheme] = useTheme();

    useEffect(() => {
        api.getUser().then(setUser);
    }, []);

    return (
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
            <div className="flex items-center">
                {isMobile && (
                    <button onClick={toggleSidebar} className="mr-4 text-gray-500 dark:text-gray-400 focus:outline-none">
                        <Menu className="h-6 w-6" />
                    </button>
                )}
                 <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button
                    onClick={toggleTheme as () => void}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                >
                    {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                <button className="relative p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                <div className="relative">
                    <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
                        {user ? (
                            <>
                                <img src={user.avatarUrl} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
                                <div className="hidden sm:block text-left">
                                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{user.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
                                </div>
                                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 hidden sm:block"/>
                            </>
                        ) : (
                            <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                        )}
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20 border border-gray-200 dark:border-gray-700">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
