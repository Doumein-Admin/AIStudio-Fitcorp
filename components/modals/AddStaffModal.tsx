import React, { useState } from 'react';
import Modal from '../ui/Modal';
import api from '../../services/mockApi';
import type { StaffMember } from '../../types';

interface AddStaffModalProps {
    isOpen: boolean;
    onClose: () => void;
    onStaffAdded: (newStaff: StaffMember) => void;
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

const AddStaffModal: React.FC<AddStaffModalProps> = ({ isOpen, onClose, onStaffAdded }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState<'Trainer' | 'Manager' | 'Receptionist'>('Trainer');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const newStaffData = {
                name,
                email,
                phone,
                role,
                status: 'Active' as 'Active',
                since: new Date().toISOString().split('T')[0],
            };
            const newStaff = await api.addStaff(newStaffData);
            onStaffAdded(newStaff);
            onClose();
            // Reset form
            setName('');
            setEmail('');
            setPhone('');
            setRole('Trainer');
        } catch (error) {
            console.error("Failed to add staff", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Staff Member">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Full Name" type="text" value={name} onChange={e => setName(e.target.value)} required />
                <Input label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <Input label="Phone Number" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
                <Select label="Role" value={role} onChange={e => setRole(e.target.value as any)}>
                    <option>Trainer</option>
                    <option>Manager</option>
                    <option>Receptionist</option>
                </Select>
                <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">
                        Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:bg-primary-300">
                        {isSubmitting ? 'Adding...' : 'Add Staff'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddStaffModal;
