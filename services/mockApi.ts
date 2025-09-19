
import type { DashboardSummary, RevenueData, Member, Equipment, User } from '../types';

const mockUser: User = {
    id: 'user-001',
    name: 'Rohan Sharma',
    role: 'Super Admin',
    avatarUrl: 'https://picsum.photos/seed/user1/100/100'
};

const mockSummary: DashboardSummary = {
    totalRevenue: 45231.89,
    newMembers: 125,
    activeMembers: 1876,
    churnRate: 5.2,
};

const mockRevenueData: RevenueData[] = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 4780 },
    { month: 'May', revenue: 5890 },
    { month: 'Jun', revenue: 4390 },
    { month: 'Jul', revenue: 5490 },
    { month: 'Aug', revenue: 6000 },
    { month: 'Sep', revenue: 5800 },
    { month: 'Oct', revenue: 6200 },
    { month: 'Nov', revenue: 6500 },
    { month: 'Dec', revenue: 7100 },
];

const mockMembers: Member[] = [
    { id: 1, name: 'Aarav Patel', avatar: 'https://picsum.photos/seed/member1/40/40', membershipType: 'Annual', status: 'Active', joinDate: '2023-01-15', lastCheckIn: '2024-07-20 08:30 AM', trainer: 'Vikram Singh' },
    { id: 2, name: 'Saanvi Gupta', avatar: 'https://picsum.photos/seed/member2/40/40', membershipType: 'Monthly', status: 'Active', joinDate: '2024-06-01', lastCheckIn: '2024-07-20 09:00 AM', trainer: 'Priya Sharma' },
    { id: 3, name: 'Vivaan Reddy', avatar: 'https://picsum.photos/seed/member3/40/40', membershipType: 'Quarterly', status: 'Inactive', joinDate: '2023-11-20', lastCheckIn: '2024-05-10 06:00 PM', trainer: 'Anjali Mehta' },
    { id: 4, name: 'Diya Kumar', avatar: 'https://picsum.photos/seed/member4/40/40', membershipType: 'Annual', status: 'Active', joinDate: '2022-08-10', lastCheckIn: '2024-07-19 07:45 AM', trainer: 'Vikram Singh' },
    { id: 5, name: 'Arjun Desai', avatar: 'https://picsum.photos/seed/member5/40/40', membershipType: 'Monthly', status: 'Pending', joinDate: '2024-07-18', lastCheckIn: 'N/A', trainer: 'Priya Sharma' },
    { id: 6, name: 'Ananya Iyer', avatar: 'https://picsum.photos/seed/member6/40/40', membershipType: 'Annual', status: 'Active', joinDate: '2023-05-05', lastCheckIn: '2024-07-20 10:15 AM', trainer: 'Anjali Mehta' },
];

const mockEquipment: Equipment[] = [
    { id: 1, name: 'Treadmill #1', status: 'Operational', lastMaintenance: '2024-06-01', nextMaintenance: '2024-09-01' },
    { id: 2, name: 'Leg Press Machine', status: 'Maintenance', lastMaintenance: '2024-07-19', nextMaintenance: '2024-07-21' },
    { id: 3, name: 'Dumbbell Rack (10-50kg)', status: 'Operational', lastMaintenance: '2024-01-10', nextMaintenance: '2025-01-10' },
    { id: 4, name: 'Elliptical #3', status: 'Out of Order', lastMaintenance: '2024-05-15', nextMaintenance: 'N/A' },
];

const api = {
    getUser: (): Promise<User> => new Promise(resolve => setTimeout(() => resolve(mockUser), 500)),
    getDashboardSummary: (): Promise<DashboardSummary> => new Promise(resolve => setTimeout(() => resolve(mockSummary), 1000)),
    getRevenueData: (): Promise<RevenueData[]> => new Promise(resolve => setTimeout(() => resolve(mockRevenueData), 1500)),
    getRecentMembers: (): Promise<Member[]> => new Promise(resolve => setTimeout(() => resolve(mockMembers), 1200)),
    getEquipmentStatus: (): Promise<Equipment[]> => new Promise(resolve => setTimeout(() => resolve(mockEquipment), 1800)),
};

export default api;
