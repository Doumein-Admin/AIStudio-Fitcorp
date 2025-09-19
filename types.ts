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

export type ReportCategory = 'Financial' | 'Members' | 'Staff' | 'Equipment';

export interface Report {
    id: number;
    name: string;
    description: string;
    category: ReportCategory;
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

// Trainer Pages Types
export interface Goal {
    id: number;
    description: string;
    targetDate: string;
    status: 'In Progress' | 'Achieved' | 'Not Started';
}

export interface Measurement {
    date: string;
    weight: number; // in kg
    bodyFat: number; // in %
    muscleMass: number; // in kg
}

export interface ProgressPhoto {
    id: number;
    date: string;
    url: string;
}

export interface ClientProgress {
    memberId: number;
    measurements: Measurement[];
    photos: ProgressPhoto[];
    goals: Goal[];
}

export type ExerciseCategory = 'Cardio' | 'Strength' | 'Flexibility' | 'CrossFit';
export interface Exercise {
    id: number;
    name: string;
    category: ExerciseCategory;
    muscleGroup: string;
    equipment: string;
    instructions: string;
    imageUrl: string;
}

export interface WorkoutPlan {
    id: number;
    name: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    assignedTo: number[]; // array of member IDs
    exercises: { exerciseId: number, sets: number, reps: string }[];
}

export interface TrainerSession {
    id: number;
    clientId: number;
    clientName: string;
    date: string;
    startTime: string;
    endTime: string;
    status: 'Upcoming' | 'Completed' | 'Cancelled';
    notes?: string;
}

// New Types for Inventory Page
export type InventoryCategory = 'Equipment' | 'Supplies' | 'Merchandise';
export type InventoryStatus = 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Under Maintenance';

export interface Supplier {
    id: number;
    name: string;
    contactPerson: string;
    phone: string;
}

export interface InventoryItem {
    id: number;
    name: string;
    category: InventoryCategory;
    status: InventoryStatus;
    quantity: number;
    purchaseDate: string;
    cost: number;
    supplierId: number;
}