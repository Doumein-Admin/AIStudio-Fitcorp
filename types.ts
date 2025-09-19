import { UserPlus } from "lucide-react";

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
    email: string;
    phone: string;
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

export interface StaffMember {
    id: number;
    name: string;
    avatar: string;
    role: 'Trainer' | 'Manager' | 'Receptionist';
    status: 'Active' | 'On Leave';
    memberSatisfaction: number;
    since: string;
    email: string;
    phone: string;
}

export interface FitnessClass {
    id: number;
    name: string;
    instructor: string;
    schedule: string;
    capacity: number;
    enrolled: number;
    status: 'Upcoming' | 'Ongoing' | 'Completed';
}

export interface Transaction {
    id: number;
    date: string;
    description: string;
    amount: number;
    type: 'Income' | 'Expense';
    status: 'Completed' | 'Pending';
}

export interface Report {
    id: number;
    name: string;
    description: string;
    lastGenerated: string;
}

export interface CheckIn {
    id: number;
    member: Pick<Member, 'id' | 'name' | 'avatar'>;
    checkInTime: string;
    status: 'Checked In' | 'Checked Out';
    duration?: string;
}

export type MaintenancePriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface MaintenanceRequest {
    id: number;
    equipmentName: string;
    reportedBy: string;
    dateReported: string;
    description: string;
    priority: MaintenancePriority;
    status: 'Pending' | 'In Progress' | 'Completed';
}

export interface Shift {
    id: number;
    staffId: number;
    staffName: string;
    date: string;
    startTime: string;
    endTime: string;
    role: StaffMember['role'];
}
