import type { DashboardSummary, RevenueData, Member, Equipment, User, StaffMember, FitnessClass, Transaction, Report, CheckIn, MaintenanceRequest, Shift } from '../types';

let mockAllMembers: Member[] = [
    { id: 1, name: 'Aarav Patel', avatar: 'https://picsum.photos/seed/member1/40/40', membershipType: 'Annual', status: 'Active', joinDate: '2023-01-15', lastCheckIn: '2024-07-20 08:30 AM', trainer: 'Vikram Singh', email: 'aarav.p@example.com', phone: '9876543210' },
    { id: 2, name: 'Saanvi Gupta', avatar: 'https://picsum.photos/seed/member2/40/40', membershipType: 'Monthly', status: 'Active', joinDate: '2024-06-01', lastCheckIn: '2024-07-20 09:00 AM', trainer: 'Priya Sharma', email: 'saanvi.g@example.com', phone: '9876543211' },
    { id: 3, name: 'Vivaan Reddy', avatar: 'https://picsum.photos/seed/member3/40/40', membershipType: 'Quarterly', status: 'Inactive', joinDate: '2023-11-20', lastCheckIn: '2024-05-10 06:00 PM', trainer: 'Anjali Mehta', email: 'vivaan.r@example.com', phone: '9876543212' },
    { id: 4, name: 'Diya Kumar', avatar: 'https://picsum.photos/seed/member4/40/40', membershipType: 'Annual', status: 'Active', joinDate: '2022-08-10', lastCheckIn: '2024-07-19 07:45 AM', trainer: 'Vikram Singh', email: 'diya.k@example.com', phone: '9876543213' },
    { id: 5, name: 'Arjun Desai', avatar: 'https://picsum.photos/seed/member5/40/40', membershipType: 'Monthly', status: 'Pending', joinDate: '2024-07-18', lastCheckIn: 'N/A', trainer: 'Priya Sharma', email: 'arjun.d@example.com', phone: '9876543214' },
    { id: 6, name: 'Ananya Iyer', avatar: 'https://picsum.photos/seed/member6/40/40', membershipType: 'Annual', status: 'Active', joinDate: '2023-05-05', lastCheckIn: '2024-07-20 10:15 AM', trainer: 'Anjali Mehta', email: 'ananya.i@example.com', phone: '9876543215' },
    { id: 7, name: 'Kabir Verma', avatar: 'https://picsum.photos/seed/member7/40/40', membershipType: 'Monthly', status: 'Active', joinDate: '2024-03-12', lastCheckIn: '2024-07-20 11:00 AM', trainer: 'Vikram Singh', email: 'kabir.v@example.com', phone: '9876543216' },
    { id: 8, name: 'Myra Singh', avatar: 'https://picsum.photos/seed/member8/40/40', membershipType: 'Quarterly', status: 'Active', joinDate: '2023-10-01', lastCheckIn: '2024-07-19 05:30 PM', trainer: 'Anjali Mehta', email: 'myra.s@example.com', phone: '9876543217' },
    { id: 9, name: 'Ishaan Joshi', avatar: 'https://picsum.photos/seed/member9/40/40', membershipType: 'Annual', status: 'Inactive', joinDate: '2022-05-20', lastCheckIn: '2024-01-15 08:00 AM', trainer: 'Priya Sharma', email: 'ishaan.j@example.com', phone: '9876543218' },
    { id: 10, name: 'Kiara Malhotra', avatar: 'https://picsum.photos/seed/member10/40/40', membershipType: 'Monthly', status: 'Active', joinDate: '2024-07-01', lastCheckIn: '2024-07-20 07:00 PM', trainer: 'Vikram Singh', email: 'kiara.m@example.com', phone: '9876543219' },
];

let mockStaff: StaffMember[] = [
    { id: 1, name: 'Vikram Singh', avatar: 'https://picsum.photos/seed/staff1/40/40', role: 'Trainer', status: 'Active', memberSatisfaction: 98, since: '2022-03-01', email: 'vikram.s@fitcorp.com', phone: '8765432109' },
    { id: 2, name: 'Priya Sharma', avatar: 'https://picsum.photos/seed/staff2/40/40', role: 'Trainer', status: 'Active', memberSatisfaction: 95, since: '2023-01-10', email: 'priya.s@fitcorp.com', phone: '8765432108' },
    { id: 3, name: 'Anjali Mehta', avatar: 'https://picsum.photos/seed/staff3/40/40', role: 'Manager', status: 'Active', memberSatisfaction: 99, since: '2021-08-15', email: 'anjali.m@fitcorp.com', phone: '8765432107' },
    { id: 4, name: 'Rajesh Kumar', avatar: 'https://picsum.photos/seed/staff4/40/40', role: 'Receptionist', status: 'On Leave', memberSatisfaction: 92, since: '2023-05-20', email: 'rajesh.k@fitcorp.com', phone: '8765432106' },
];

let mockMaintenanceRequests: MaintenanceRequest[] = [
    { id: 1, equipmentName: 'Treadmill #1', reportedBy: 'Vikram Singh', dateReported: '2024-07-20', description: 'Screen is flickering during use.', priority: 'Medium', status: 'Pending' },
    { id: 2, equipmentName: 'Leg Press Machine', reportedBy: 'Priya Sharma', dateReported: '2024-07-19', description: 'Weight stack is getting stuck.', priority: 'High', status: 'In Progress' },
    { id: 3, equipmentName: 'Water Fountain', reportedBy: 'Anjali Mehta', dateReported: '2024-07-21', description: 'Low water pressure.', priority: 'Low', status: 'Pending' },
    { id: 4, equipmentName: 'Elliptical #3', reportedBy: 'Vikram Singh', dateReported: '2024-07-18', description: 'Machine is completely unresponsive.', priority: 'Critical', status: 'Completed' },
];

let mockCheckIns: CheckIn[] = [
    {id: 1, member: {id: 1, name: 'Aarav Patel', avatar: 'https://picsum.photos/seed/member1/40/40'}, checkInTime: '2024-07-21 08:30 AM', status: 'Checked In'},
    {id: 2, member: {id: 2, name: 'Saanvi Gupta', avatar: 'https://picsum.photos/seed/member2/40/40'}, checkInTime: '2024-07-21 09:00 AM', status: 'Checked In'},
];


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
    { month: 'Jan', revenue: 4000 }, { month: 'Feb', revenue: 3000 }, { month: 'Mar', revenue: 5000 }, { month: 'Apr', revenue: 4780 },
    { month: 'May', revenue: 5890 }, { month: 'Jun', revenue: 4390 }, { month: 'Jul', revenue: 5490 }, { month: 'Aug', revenue: 6000 },
    { month: 'Sep', revenue: 5800 }, { month: 'Oct', revenue: 6200 }, { month: 'Nov', revenue: 6500 }, { month: 'Dec', revenue: 7100 },
];

const mockEquipment: Equipment[] = [
    { id: 1, name: 'Treadmill #1', status: 'Operational', lastMaintenance: '2024-06-01', nextMaintenance: '2024-09-01' },
    { id: 2, name: 'Leg Press Machine', status: 'Maintenance', lastMaintenance: '2024-07-19', nextMaintenance: '2024-07-21' },
    { id: 3, name: 'Dumbbell Rack (10-50kg)', status: 'Operational', lastMaintenance: '2024-01-10', nextMaintenance: '2025-01-10' },
    { id: 4, name: 'Elliptical #3', status: 'Out of Order', lastMaintenance: '2024-05-15', nextMaintenance: 'N/A' },
];

const mockClasses: FitnessClass[] = [
    { id: 1, name: 'Yoga Flow', instructor: 'Priya Sharma', schedule: 'Mon, Wed, Fri at 7:00 AM', capacity: 20, enrolled: 18, status: 'Ongoing' },
    { id: 2, name: 'HIIT', instructor: 'Vikram Singh', schedule: 'Tue, Thu at 6:00 PM', capacity: 15, enrolled: 15, status: 'Upcoming' },
    { id: 3, name: 'CrossFit', instructor: 'Vikram Singh', schedule: 'Mon, Wed, Fri at 6:00 PM', capacity: 12, enrolled: 10, status: 'Ongoing' },
    { id: 4, name: 'Zumba', instructor: 'Anjali Mehta', schedule: 'Sat at 10:00 AM', capacity: 25, enrolled: 15, status: 'Completed' },
];

const mockTransactions: Transaction[] = [
    { id: 1, date: '2024-07-20', description: 'Membership Fee - Aarav Patel', amount: 12000, type: 'Income', status: 'Completed' },
    { id: 2, date: '2024-07-20', description: 'Protein Bar Sale', amount: 250, type: 'Income', status: 'Completed' },
    { id: 3, date: '2024-07-19', description: 'Equipment Maintenance', amount: 5000, type: 'Expense', status: 'Completed' },
    { id: 4, date: '2024-07-18', description: 'Staff Salary - July', amount: 85000, type: 'Expense', status: 'Pending' },
    { id: 5, date: '2024-07-18', description: 'Electricity Bill', amount: 15000, type: 'Expense', status: 'Completed' },
];

const mockReports: Report[] = [
    { id: 1, name: 'Monthly Revenue Report', description: 'Detailed breakdown of all income sources for the month.', lastGenerated: '2024-07-01' },
    { id: 2, name: 'Member Attendance Log', description: 'Track member check-ins and class attendance.', lastGenerated: '2024-07-20' },
    { id: 3, name: 'Churn Analysis', description: 'Identify patterns in member cancellations.', lastGenerated: '2024-06-30' },
    { id: 4, name: 'Equipment Usage & Maintenance', description: 'Report on equipment usage, status, and upcoming maintenance.', lastGenerated: '2024-07-15' },
];

const api = {
    getUser: (): Promise<User> => new Promise(resolve => setTimeout(() => resolve(mockUser), 500)),
    getDashboardSummary: (): Promise<DashboardSummary> => new Promise(resolve => setTimeout(() => resolve(mockSummary), 1000)),
    getRevenueData: (): Promise<RevenueData[]> => new Promise(resolve => setTimeout(() => resolve(mockRevenueData), 1500)),
    getRecentMembers: (): Promise<Member[]> => new Promise(resolve => setTimeout(() => resolve(mockAllMembers.slice(0, 6)), 1200)),
    getEquipmentStatus: (): Promise<Equipment[]> => new Promise(resolve => setTimeout(() => resolve(mockEquipment), 1800)),
    getMembers: (): Promise<Member[]> => new Promise(resolve => setTimeout(() => resolve(mockAllMembers), 800)),
    addMember: (newMemberData: Omit<Member, 'id' | 'avatar' | 'lastCheckIn'>): Promise<Member> => {
        return new Promise(resolve => setTimeout(() => {
            const newId = Math.max(...mockAllMembers.map(m => m.id)) + 1;
            const newMember: Member = {
                ...newMemberData,
                id: newId,
                avatar: `https://picsum.photos/seed/member${newId}/40/40`,
                lastCheckIn: 'N/A',
            };
            mockAllMembers = [newMember, ...mockAllMembers];
            resolve(newMember);
        }, 500));
    },
    getStaff: (): Promise<StaffMember[]> => new Promise(resolve => setTimeout(() => resolve(mockStaff), 900)),
    addStaff: (newStaffData: Omit<StaffMember, 'id' | 'avatar' | 'memberSatisfaction'>): Promise<StaffMember> => {
        return new Promise(resolve => setTimeout(() => {
            const newId = Math.max(...mockStaff.map(s => s.id)) + 1;
            const newStaff: StaffMember = {
                ...newStaffData,
                id: newId,
                avatar: `https://picsum.photos/seed/staff${newId}/40/40`,
                memberSatisfaction: 90, // default value
            };
            mockStaff = [newStaff, ...mockStaff];
            resolve(newStaff);
        }, 500));
    },
    getClasses: (): Promise<FitnessClass[]> => new Promise(resolve => setTimeout(() => resolve(mockClasses), 1000)),
    getTransactions: (): Promise<Transaction[]> => new Promise(resolve => setTimeout(() => resolve(mockTransactions), 1100)),
    getReports: (): Promise<Report[]> => new Promise(resolve => setTimeout(() => resolve(mockReports), 600)),
    getCheckIns: (): Promise<CheckIn[]> => new Promise(resolve => setTimeout(() => resolve(mockCheckIns), 700)),
    addCheckIn: (memberId: number): Promise<CheckIn> => {
        return new Promise((resolve, reject) => setTimeout(() => {
            const member = mockAllMembers.find(m => m.id === memberId);
            if (!member) {
                reject(new Error("Member not found"));
                return;
            }
            const newId = Math.max(0, ...mockCheckIns.map(c => c.id)) + 1;
            const newCheckIn: CheckIn = {
                id: newId,
                member: { id: member.id, name: member.name, avatar: member.avatar },
                checkInTime: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
                status: 'Checked In',
            };
            mockCheckIns = [newCheckIn, ...mockCheckIns];
            resolve(newCheckIn);
        }, 300));
    },
    getMaintenanceRequests: (): Promise<MaintenanceRequest[]> => new Promise(resolve => setTimeout(() => resolve(mockMaintenanceRequests), 800)),
    addMaintenanceRequest: (requestData: Omit<MaintenanceRequest, 'id' | 'dateReported' | 'status'>): Promise<MaintenanceRequest> => {
        return new Promise(resolve => setTimeout(() => {
            const newId = Math.max(0, ...mockMaintenanceRequests.map(r => r.id)) + 1;
            const newRequest: MaintenanceRequest = {
                ...requestData,
                id: newId,
                dateReported: new Date().toISOString().split('T')[0],
                status: 'Pending',
            };
            mockMaintenanceRequests = [newRequest, ...mockMaintenanceRequests];
            resolve(newRequest);
        }, 500));
    },
};

export default api;
