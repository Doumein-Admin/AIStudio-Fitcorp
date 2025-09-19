import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/mockApi';
import type { InventoryItem, Supplier, InventoryStatus, InventoryCategory } from '../types';
import Table from './ui/Table';
import Card from './ui/Card';
import AddInventoryItemModal from './modals/AddInventoryItemModal';
import { Archive, PackageX, AlertTriangle, PlusCircle, Search } from 'lucide-react';

const InventoryPage: React.FC = () => {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'All' | InventoryStatus>('All');
    
    const fetchData = () => {
        setLoading(true);
        Promise.all([api.getInventory(), api.getSuppliers()]).then(([inventoryData, supplierData]) => {
            setInventory(inventoryData);
            setSuppliers(supplierData);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddItem = (newItem: InventoryItem) => {
        setInventory(prev => [newItem, ...prev]);
    };
    
    const getSupplierName = (supplierId: number) => {
        return suppliers.find(s => s.id === supplierId)?.name || 'Unknown';
    };

    const filteredInventory = useMemo(() => {
        return inventory.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [inventory, searchTerm, statusFilter]);

    const inventoryColumns: { header: string; accessor: keyof InventoryItem | ((item: InventoryItem) => React.ReactNode); }[] = [
        { header: 'Item Name', accessor: 'name' },
        { header: 'Category', accessor: 'category' },
        { 
          header: 'Status',
          accessor: (item: InventoryItem) => {
            const statusColor: { [key in InventoryStatus]: string } = {
              'In Stock': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
              'Low Stock': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
              'Out of Stock': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
              'Under Maintenance': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
            };
            return <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor[item.status]}`}>{item.status}</span>
          }
        },
        { header: 'Quantity', accessor: 'quantity' },
        { header: 'Purchase Date', accessor: 'purchaseDate' },
        { header: 'Cost', accessor: (item) => `₹${item.cost.toLocaleString()}` },
        { header: 'Supplier', accessor: (item) => getSupplierName(item.supplierId) },
    ];
    
    const totalValue = inventory.reduce((sum, item) => sum + item.cost * item.quantity, 0);
    const lowStockItems = inventory.filter(i => i.status === 'Low Stock').length;
    const maintenanceItems = inventory.filter(i => i.status === 'Under Maintenance').length;

    return (
        <>
            <AddInventoryItemModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onItemAdded={handleAddItem}
                suppliers={suppliers}
            />
            <div className="space-y-6">
                 <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Inventory Management</h1>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900">
                        <PlusCircle className="h-5 w-5" />
                        <span>Add New Item</span>
                    </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card title="Total Inventory Value" value={`₹${(totalValue / 1000).toFixed(1)}k`} icon={<Archive className="h-6 w-6" />} isLoading={loading}/>
                    <Card title="Items Low on Stock" value={lowStockItems} icon={<AlertTriangle className="h-6 w-6" />} isLoading={loading}/>
                    <Card title="Under Maintenance" value={maintenanceItems} icon={<PackageX className="h-6 w-6" />} isLoading={loading}/>
                </div>
                
                <div className="bg-white dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input type="text" placeholder="Search by item name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"/>
                        </div>
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                            <option value="All">All Statuses</option>
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                            <option value="Under Maintenance">Under Maintenance</option>
                        </select>
                    </div>
                     <Table<InventoryItem> 
                        title="All Inventory Items"
                        columns={inventoryColumns}
                        data={filteredInventory}
                        isLoading={loading}
                    />
                </div>
            </div>
        </>
    );
};

export default InventoryPage;