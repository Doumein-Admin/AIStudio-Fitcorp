import React, { useState } from 'react';
import Modal from '../ui/Modal';
import api from '../../services/mockApi';
import type { Member } from '../../types';

interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onMemberAdded: (newMember: Member) => void;
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

const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose, onMemberAdded }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [membershipType, setMembershipType] = useState<'Annual' | 'Monthly' | 'Quarterly'>('Monthly');
    const [trainer, setTrainer] = useState('Vikram Singh');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const newMemberData = {
                name,
                email,
                phone,
                membershipType,
                status: 'Active' as 'Active',
                joinDate: new Date().toISOString().split('T')[0],
                trainer,
            };
            const newMember = await api.addMember(newMemberData);
            onMemberAdded(newMember);
            onClose();
            // Reset form
            setName('');
            setEmail('');
            setPhone('');
            setMembershipType('Monthly');
        } catch (error) {
            console.error("Failed to add member", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Member">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Full Name" type="text" value={name} onChange={e => setName(e.target.value)} required />
                <Input label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <Input label="Phone Number" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
                <Select label="Membership Type" value={membershipType} onChange={e => setMembershipType(e.target.value as any)}>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Annual</option>
                </Select>
                 <Select label="Assign Trainer" value={trainer} onChange={e => setTrainer(e.target.value)}>
                    <option>Vikram Singh</option>
                    <option>Priya Sharma</option>
                    <option>Anjali Mehta</option>
                </Select>
                <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">
                        Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:bg-primary-300">
                        {isSubmitting ? 'Adding...' : 'Add Member'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddMemberModal;
