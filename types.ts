
export interface User {
    id: string;
    name: string;
    role: 'Super Admin' | 'Admin' | 'Trainer' | 'Member';
    avatarUrl: string;
}

export interface Member {
    id: number;
    name: string;
    avatar: string;
    membershipType: 'Annual' | 'Monthly' | 'Quarterly';
    status: 'Active' | 'Inactive' | 'Pending';
    joinDate: string;
    lastCheckIn: string;
    trainer: string;
}

export interface RevenueData {
    month: string;
    revenue: number;
}

export interface DashboardSummary {
    totalRevenue: number;
    newMembers: number;
    activeMembers: number;
    churnRate: number;
}

export interface Equipment {
    id: number;
    name: string;
    status: 'Operational' | 'Maintenance' | 'Out of Order';
    lastMaintenance: string;
    nextMaintenance: string;
}
