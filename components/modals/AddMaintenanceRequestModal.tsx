import React, { useState } from 'react';
import Modal from '../ui/Modal';
import api from '../../services/mockApi';
import type { MaintenanceRequest, MaintenancePriority } from '../../types';

interface AddMaintenanceRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRequestAdded: (newRequest: MaintenanceRequest) => void;
}

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input {...props} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500" />
    </div>
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <textarea {...props} rows={3} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500" />
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

const AddMaintenanceRequestModal: React.FC<AddMaintenanceRequestModalProps> = ({ isOpen, onClose, onRequestAdded }) => {
    const [equipmentName, setEquipmentName] = useState('');
    const [reportedBy, setReportedBy] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<MaintenancePriority>('Medium');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const newRequestData = { equipmentName, reportedBy, description, priority };
            const newRequest = await api.addMaintenanceRequest(newRequestData);
            onRequestAdded(newRequest);
            onClose();
            // Reset form
            setEquipmentName('');
            setReportedBy('');
            setDescription('');
            setPriority('Medium');
        } catch (error) {
            console.error("Failed to add request", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Maintenance Request">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Equipment Name" type="text" value={equipmentName} onChange={e => setEquipmentName(e.target.value)} required />
                <Input label="Reported By" type="text" value={reportedBy} onChange={e => setReportedBy(e.target.value)} required />
                <Textarea label="Issue Description" value={description} onChange={e => setDescription(e.target.value)} required />
                <Select label="Priority" value={priority} onChange={e => setPriority(e.target.value as MaintenancePriority)}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                </Select>
                <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">
                        Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:bg-primary-300">
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddMaintenanceRequestModal;
