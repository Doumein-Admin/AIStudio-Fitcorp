import React, { useState } from 'react';
import Modal from '../ui/Modal';
import api from '../../services/mockApi';
import type { InventoryItem, Supplier, InventoryCategory, InventoryStatus } from '../../types';

interface AddInventoryItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onItemAdded: (newItem: InventoryItem) => void;
    suppliers: Supplier[];
}

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input {...props} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500" />
    </div>
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: React.ReactNode }> = ({ label, children, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <select {...props} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
            {children}
        </select>
    </div>
);


const AddInventoryItemModal: React.FC<AddInventoryItemModalProps> = ({ isOpen, onClose, onItemAdded, suppliers }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState<InventoryCategory>('Equipment');
    const [status, setStatus] = useState<InventoryStatus>('In Stock');
    const [quantity, setQuantity] = useState(1);
    const [cost, setCost] = useState(0);
    const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
    const [supplierId, setSupplierId] = useState(suppliers[0]?.id || 0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supplierId) {
            alert("Please select a supplier.");
            return;
        }
        setIsSubmitting(true);
        try {
            const newItemData = { name, category, status, quantity, purchaseDate, cost, supplierId };
            const newItem = await api.addInventoryItem(newItemData);
            onItemAdded(newItem);
            onClose();
            // Reset form
            setName('');
            setCategory('Equipment');
            setStatus('In Stock');
            setQuantity(1);
            setCost(0);
            setPurchaseDate(new Date().toISOString().split('T')[0]);
            setSupplierId(suppliers[0]?.id || 0);

        } catch (error) {
            console.error("Failed to add inventory item", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Inventory Item" size="lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Item Name" type="text" value={name} onChange={e => setName(e.target.value)} required />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select label="Category" value={category} onChange={e => setCategory(e.target.value as InventoryCategory)}>
                        <option>Equipment</option>
                        <option>Supplies</option>
                        <option>Merchandise</option>
                    </Select>
                    <Select label="Status" value={status} onChange={e => setStatus(e.target.value as InventoryStatus)}>
                        <option>In Stock</option>
                        <option>Low Stock</option>
                        <option>Out of Stock</option>
                        <option>Under Maintenance</option>
                    </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Quantity" type="number" min="0" value={quantity} onChange={e => setQuantity(Number(e.target.value))} required />
                    <Input label="Unit Cost (₹)" type="number" min="0" value={cost} onChange={e => setCost(Number(e.target.value))} required />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Purchase Date" type="date" value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)} required />
                    <Select label="Supplier" value={supplierId} onChange={e => setSupplierId(Number(e.target.value))} required>
                        <option value="">Select a supplier</option>
                        {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </Select>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">
                        Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:bg-primary-300">
                        {isSubmitting ? 'Adding...' : 'Add Item'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddInventoryItemModal;