import React from 'react';
import { LayoutDashboard, Users, UserCog, Calendar, DollarSign, BarChart3, Settings as SettingsIcon, LogOut, CheckSquare, Wrench } from 'lucide-react';

const iconClass = "h-5 w-5 mr-3";

export const NAV_ITEMS = [
    { name: 'Dashboard', href: '#', icon: <LayoutDashboard className={iconClass} /> },
    { name: 'Members', href: '#', icon: <Users className={iconClass} /> },
    { name: 'Staff', href: '#', icon: <UserCog className={iconClass} /> },
    { name: 'Classes', href: '#', icon: <Calendar className={iconClass} /> },
    { name: 'Check-ins', href: '#', icon: <CheckSquare className={iconClass} /> },
    { name: 'Finance', href: '#', icon: <DollarSign className={iconClass} /> },
    { name: 'Maintenance', href: '#', icon: <Wrench className={iconClass} /> },
    { name: 'Reports', href: '#', icon: <BarChart3 className={iconClass} /> },
    { name: 'Settings', href: '#', icon: <SettingsIcon className={iconClass} /> },
];

export const LOGOUT_ITEM = {
    name: 'Logout',
    href: '#',
    icon: <LogOut className={iconClass} />
};
