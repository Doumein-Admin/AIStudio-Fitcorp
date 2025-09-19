import type { 
    DashboardSummary, RevenueData, Member, Equipment, User, StaffMember, FitnessClass, Transaction, Report, CheckIn, MaintenanceRequest, Shift,
    ClientProgress, Exercise, WorkoutPlan, TrainerSession, InventoryItem, Supplier
} from '../types';

let mockAllMembers: Member[] = [
    { id: 1, name: 'Aarav Patel', avatar: 'https://picsum.photos/seed/member1/40/40', membershipType: 'Annual', status: 'Active', joinDate: '2023-01-15', lastCheckIn: '2024-07-20 08:30 AM', trainer: 'Vikram Singh', email: 'aarav.p@example.com', phone: '9876543210' },
    { id: 2, name: 'Saanvi Gupta', avatar: 'https://picsum.photos/seed/member2/40/40', membershipType: 'Monthly', status: 'Active', joinDate: '2024-06-01', lastCheckIn: '2024-07-20 09:00 AM', trainer: 'Vikram Singh', email: 'saanvi.g@example.com', phone: '9876543211' },
    { id: 3, name: 'Vivaan Reddy', avatar: 'https://picsum.photos/seed/member3/40/40', membershipType: 'Quarterly', status: 'Inactive', joinDate: '2023-11-20', lastCheckIn: '2024-05-10 06:00 PM', trainer: 'Priya Sharma', email: 'vivaan.r@example.com', phone: '9876543212' },
    { id: 4, name: 'Diya Kumar', avatar: 'https://picsum.photos/seed/member4/40/40', membershipType: 'Annual', status: 'Active', joinDate: '2022-08-10', lastCheckIn: '2024-07-19 07:45 AM', trainer: 'Vikram Singh', email: 'diya.k@example.com', phone: '9876543213' },
    { id: 5, name: 'Arjun Desai', avatar: 'https://picsum.photos/seed/member5/40/40', membershipType: 'Monthly', status: 'Pending', joinDate: '2024-07-18', lastCheckIn: 'N/A', trainer: 'Priya Sharma', email: 'arjun.d@example.com', phone: '9876543214' },
    { id: 6, name: 'Ananya Iyer', avatar: 'https://picsum.photos/seed/member6/40/40', membershipType: 'Annual', status: 'Active', joinDate: '2023-05-05', lastCheckIn: '2024-07-20 10:15 AM', trainer: 'Vikram Singh', email: 'ananya.i@example.com', phone: '9876543215' },
    { id: 7, name: 'Kabir Verma', avatar: 'https://picsum.photos/seed/member7/40/40', membershipType: 'Monthly', status: 'Active', joinDate: '2024-03-12', lastCheckIn: '2024-07-20 11:00 AM', trainer: 'Priya Sharma', email: 'kabir.v@example.com', phone: '9876543216' },
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
];

let mockCheckIns: CheckIn[] = [
    {id: 1, member: {id: 1, name: 'Aarav Patel', avatar: 'https://picsum.photos/seed/member1/40/40'}, checkInTime: '2024-07-21 08:30 AM', status: 'Checked In'},
    {id: 2, member: {id: 2, name: 'Saanvi Gupta', avatar: 'https://picsum.photos/seed/member2/40/40'}, checkInTime: '2024-07-21 09:00 AM', status: 'Checked In'},
];

// --- Trainer-Specific Mock Data ---
let mockClientProgress: ClientProgress[] = [
    {
        memberId: 1,
        measurements: [
            { date: '2024-05-01', weight: 85, bodyFat: 22, muscleMass: 38 },
            { date: '2024-06-01', weight: 83, bodyFat: 20, muscleMass: 39 },
            { date: '2024-07-01', weight: 82, bodyFat: 19, muscleMass: 40 },
        ],
        photos: [
            { id: 1, date: '2024-05-01', url: 'https://picsum.photos/seed/progress1a/300/400' },
            { id: 2, date: '2024-07-01', url: 'https://picsum.photos/seed/progress1b/300/400' },
        ],
        goals: [{ id: 1, description: 'Lose 5kg body weight', targetDate: '2024-08-01', status: 'In Progress' }]
    },
    {
        memberId: 2,
        measurements: [
            { date: '2024-06-01', weight: 60, bodyFat: 25, muscleMass: 28 },
            { date: '2024-07-01', weight: 59, bodyFat: 24, muscleMass: 28.5 },
        ],
        photos: [
            { id: 3, date: '2024-06-01', url: 'https://picsum.photos/seed/progress2a/300/400' },
            { id: 4, date: '2024-07-01', url: 'https://picsum.photos/seed/progress2b/300/400' },
        ],
        goals: [{ id: 2, description: 'Complete a 5k run', targetDate: '2024-09-01', status: 'Not Started' }]
    }
];

let mockExercises: Exercise[] = [
    { id: 1, name: 'Treadmill Running', category: 'Cardio', muscleGroup: 'Full Body', equipment: 'Treadmill', instructions: 'Run at a steady pace.', imageUrl: 'https://picsum.photos/seed/ex1/200/200' },
    { id: 2, name: 'Bench Press', category: 'Strength', muscleGroup: 'Chest', equipment: 'Bench, Barbell', instructions: 'Lower the bar to your chest and press up.', imageUrl: 'https://picsum.photos/seed/ex2/200/200' },
    { id: 3, name: 'Squats', category: 'Strength', muscleGroup: 'Legs', equipment: 'Barbell/Dumbbells', instructions: 'Keep your back straight and lower your hips.', imageUrl: 'https://picsum.photos/seed/ex3/200/200' },
    { id: 4, name: 'Plank', category: 'Strength', muscleGroup: 'Core', equipment: 'None', instructions: 'Hold a straight line from head to heels.', imageUrl: 'https://picsum.photos/seed/ex4/200/200' },
    { id: 5, name: 'Downward Dog', category: 'Flexibility', muscleGroup: 'Full Body', equipment: 'Yoga Mat', instructions: 'Form an inverted V shape with your body.', imageUrl: 'https://picsum.photos/seed/ex5/200/200' },
];

let mockWorkoutPlans: WorkoutPlan[] = [
    { id: 1, name: 'Beginner Full Body', difficulty: 'Beginner', assignedTo: [1], exercises: [{ exerciseId: 3, sets: 3, reps: '10-12' }, { exerciseId: 2, sets: 3, reps: '8-10' }] },
    { id: 2, name: 'Cardio Blast', difficulty: 'Intermediate', assignedTo: [2], exercises: [{ exerciseId: 1, sets: 1, reps: '30 mins' }] },
];

let mockTrainerSchedule: TrainerSession[] = [
    { id: 1, clientId: 1, clientName: 'Aarav Patel', date: '2024-07-22', startTime: '09:00', endTime: '10:00', status: 'Upcoming' },
    { id: 2, clientId: 2, clientName: 'Saanvi Gupta', date: '2024-07-22', startTime: '10:00', endTime: '11:00', status: 'Upcoming' },
    { id: 3, clientId: 4, clientName: 'Diya Kumar', date: '2024-07-23', startTime: '08:00', endTime: '09:00', status: 'Upcoming' },
    { id: 4, clientId: 1, clientName: 'Aarav Patel', date: '2024-07-24', startTime: '09:00', endTime: '10:00', status: 'Upcoming' },
];
// --- End Trainer-Specific Mock Data ---

// --- Inventory Mock Data ---
let mockSuppliers: Supplier[] = [
    { id: 1, name: 'FitEquip India', contactPerson: 'Ravi Sharma', phone: '9988776655' },
    { id: 2, name: 'Gym Essentials Co.', contactPerson: 'Sunita Rao', phone: '9988776644' },
];

let mockInventory: InventoryItem[] = [
    { id: 1, name: 'Treadmill TX-500', category: 'Equipment', status: 'In Stock', quantity: 5, purchaseDate: '2023-01-10', cost: 150000, supplierId: 1 },
    { id: 2, name: 'Dumbbell Set (5-20kg)', category: 'Equipment', status: 'In Stock', quantity: 10, purchaseDate: '2023-01-10', cost: 25000, supplierId: 1 },
    { id: 3, name: 'Yoga Mats', category: 'Supplies', status: 'Low Stock', quantity: 8, purchaseDate: '2024-03-15', cost: 800, supplierId: 2 },
    { id: 4, name: 'Protein Powder (1kg)', category: 'Merchandise', status: 'In Stock', quantity: 30, purchaseDate: '2024-06-20', cost: 2200, supplierId: 2 },
    { id: 5, name: 'Elliptical Cross-Trainer', category: 'Equipment', status: 'Under Maintenance', quantity: 2, purchaseDate: '2023-02-20', cost: 120000, supplierId: 1 },
];
// --- End Inventory Mock Data ---


const mockUser: User = {
    id: 'user-001',
    name: 'Vikram Singh', // Changed to a trainer for context
    role: 'Trainer',
    avatarUrl: 'https://picsum.photos/seed/staff1/100/100'
};

const mockSummary: DashboardSummary = {
    totalRevenue: 45231.89,
    newMembers: 125,
    activeMembers: 1876,
    churnRate: 5.2,
};

const mockRevenueData: RevenueData[] = [
    { month: 'Jan', revenue: 4000 }, { month: 'Feb', revenue: 3000 }, { month: 'Mar', revenue: 5000 }, { month: 'Apr', revenue: 4780 },
    { month: 'May', revenue: 5890 }, { month: 'Jun', revenue: 4390 }, { month: 'Jul', revenue: 5490 },
];

const mockEquipment: Equipment[] = [
    { id: 1, name: 'Treadmill #1', status: 'Operational', lastMaintenance: '2024-06-01', nextMaintenance: '2024-09-01' },
    { id: 2, name: 'Leg Press Machine', status: 'Maintenance', lastMaintenance: '2024-07-19', nextMaintenance: '2024-07-21' },
];

const mockClasses: FitnessClass[] = [
    { id: 1, name: 'Yoga Flow', instructor: 'Priya Sharma', schedule: 'Mon, Wed, Fri at 7:00 AM', capacity: 20, enrolled: 18, status: 'Ongoing' },
    { id: 2, name: 'HIIT', instructor: 'Vikram Singh', schedule: 'Tue, Thu at 6:00 PM', capacity: 15, enrolled: 15, status: 'Upcoming' },
];

const mockTransactions: Transaction[] = [
    { id: 1, date: '2024-07-20', description: 'Membership Fee - Aarav Patel', amount: 12000, type: 'Income', status: 'Completed' },
    { id: 2, date: '2024-07-19', description: 'Equipment Maintenance', amount: 5000, type: 'Expense', status: 'Completed' },
];

const mockReports: Report[] = [
    { id: 1, name: 'Monthly Revenue', description: 'Breakdown of all income sources.', category: 'Financial', lastGenerated: '2024-07-01' },
    { id: 2, name: 'Member Attendance', description: 'Track check-ins and class attendance.', category: 'Members', lastGenerated: '2024-07-20' },
    { id: 3, name: 'Staff Payroll', description: 'Summary of staff salaries and commissions.', category: 'Staff', lastGenerated: '2024-07-01' },
    { id: 4, name: 'Equipment Utilization', description: 'Analysis of most and least used equipment.', category: 'Equipment', lastGenerated: '2024-07-18' },
];

const api = {
    // --- Existing API functions ---
    getUser: (): Promise<User> => new Promise(resolve => setTimeout(() => resolve(mockUser), 500)),
    getDashboardSummary: (): Promise<DashboardSummary> => new Promise(resolve => setTimeout(() => resolve(mockSummary), 1000)),
    getRevenueData: (): Promise<RevenueData[]> => new Promise(resolve => setTimeout(() => resolve(mockRevenueData), 1500)),
    getRecentMembers: (): Promise<Member[]> => new Promise(resolve => setTimeout(() => resolve(mockAllMembers.slice(0, 5)), 1200)),
    getEquipmentStatus: (): Promise<Equipment[]> => new Promise(resolve => setTimeout(() => resolve(mockEquipment), 1800)),
    getMembers: (): Promise<Member[]> => new Promise(resolve => setTimeout(() => resolve(mockAllMembers), 800)),
    addMember: (newMemberData: Omit<Member, 'id' | 'avatar' | 'lastCheckIn'>): Promise<Member> => {
        return new Promise(resolve => setTimeout(() => {
            const newId = Math.max(...mockAllMembers.map(m => m.id)) + 1;
            const newMember: Member = { ...newMemberData, id: newId, avatar: `https://picsum.photos/seed/member${newId}/40/40`, lastCheckIn: 'N/A' };
            mockAllMembers = [newMember, ...mockAllMembers];
            resolve(newMember);
        }, 500));
    },
    getStaff: (): Promise<StaffMember[]> => new Promise(resolve => setTimeout(() => resolve(mockStaff), 900)),
    addStaff: (newStaffData: Omit<StaffMember, 'id' | 'avatar' | 'memberSatisfaction'>): Promise<StaffMember> => {
        return new Promise(resolve => setTimeout(() => {
            const newId = Math.max(...mockStaff.map(s => s.id)) + 1;
            const newStaff: StaffMember = { ...newStaffData, id: newId, avatar: `https://picsum.photos/seed/staff${newId}/40/40`, memberSatisfaction: 90 };
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
            if (!member) return reject(new Error("Member not found"));
            const newId = Math.max(0, ...mockCheckIns.map(c => c.id)) + 1;
            const newCheckIn: CheckIn = { id: newId, member: { id: member.id, name: member.name, avatar: member.avatar }, checkInTime: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }), status: 'Checked In' };
            mockCheckIns = [newCheckIn, ...mockCheckIns];
            resolve(newCheckIn);
        }, 300));
    },
    getMaintenanceRequests: (): Promise<MaintenanceRequest[]> => new Promise(resolve => setTimeout(() => resolve(mockMaintenanceRequests), 800)),
    addMaintenanceRequest: (requestData: Omit<MaintenanceRequest, 'id' | 'dateReported' | 'status'>): Promise<MaintenanceRequest> => {
        return new Promise(resolve => setTimeout(() => {
            const newId = Math.max(0, ...mockMaintenanceRequests.map(r => r.id)) + 1;
            const newRequest: MaintenanceRequest = { ...requestData, id: newId, dateReported: new Date().toISOString().split('T')[0], status: 'Pending' };
            mockMaintenanceRequests = [newRequest, ...mockMaintenanceRequests];
            resolve(newRequest);
        }, 500));
    },

    // --- Trainer pages API functions ---
    getTrainerClients: (trainerName: string): Promise<Member[]> => new Promise(resolve => setTimeout(() => {
        resolve(mockAllMembers.filter(m => m.trainer === trainerName && m.status === 'Active'));
    }, 800)),
    getClientProgress: (memberId: number): Promise<ClientProgress | undefined> => new Promise(resolve => setTimeout(() => {
        resolve(mockClientProgress.find(p => p.memberId === memberId));
    }, 1000)),
    getExercises: (): Promise<Exercise[]> => new Promise(resolve => setTimeout(() => resolve(mockExercises), 700)),
    getWorkoutPlans: (): Promise<WorkoutPlan[]> => new Promise(resolve => setTimeout(() => resolve(mockWorkoutPlans), 900)),
    addWorkoutPlan: (planData: Omit<WorkoutPlan, 'id'>): Promise<WorkoutPlan> => {
        return new Promise(resolve => setTimeout(() => {
            const newId = Math.max(0, ...mockWorkoutPlans.map(p => p.id)) + 1;
            const newPlan: WorkoutPlan = { ...planData, id: newId };
            mockWorkoutPlans = [newPlan, ...mockWorkoutPlans];
            resolve(newPlan);
        }, 500));
    },
    getTrainerSchedule: (trainerName: string): Promise<TrainerSession[]> => new Promise(resolve => setTimeout(() => {
        resolve(mockTrainerSchedule);
    }, 600)),

    // --- New API functions for Inventory page ---
    getInventory: (): Promise<InventoryItem[]> => new Promise(resolve => setTimeout(() => resolve(mockInventory), 900)),
    getSuppliers: (): Promise<Supplier[]> => new Promise(resolve => setTimeout(() => resolve(mockSuppliers), 500)),
    addInventoryItem: (itemData: Omit<InventoryItem, 'id'>): Promise<InventoryItem> => {
        return new Promise(resolve => setTimeout(() => {
            const newId = Math.max(0, ...mockInventory.map(i => i.id)) + 1;
            const newItem: InventoryItem = { ...itemData, id: newId };
            mockInventory = [newItem, ...mockInventory];
            resolve(newItem);
        }, 500));
    },
};

export default api;