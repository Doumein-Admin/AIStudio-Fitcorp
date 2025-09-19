import React, { useState } from 'react';
import { Brush, Bell, Zap } from 'lucide-react';

const SettingsCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-sm">
        <div className="flex items-center mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg text-primary-600 dark:text-primary-400 mr-4">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <button 
        type="button" 
        className={`${checked ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-600'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`} 
        role="switch" 
        aria-checked={checked}
        onClick={() => onChange(!checked)}
    >
        <span className={`${checked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
    </button>
);


const SettingsPage: React.FC = () => {
    const [logo, setLogo] = useState<File | null>(null);
    const [primaryColor, setPrimaryColor] = useState("#3b82f6");
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);

    const handleSaveChanges = () => {
        const settings = {
            logo: logo?.name || 'default_logo.png',
            primaryColor,
            emailNotifications,
            pushNotifications,
        };
        console.log("Saving settings:", settings);
        alert("Changes saved successfully! (Check console for details)");
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <SettingsCard title="Brand Customization" icon={<Brush className="h-6 w-6" />}>
                        <div>
                            <label htmlFor="logo-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Brand Logo</label>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                                    <svg className="h-full w-full text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.993A1 1 0 001 19.993h22a1 1 0 001-1v-1.007zM12 12a4 4 0 100-8 4 4 0 000 8z" />
                                    </svg>
                                </span>
                                <input type="file" id="logo-upload" className="hidden" onChange={(e) => e.target.files && setLogo(e.target.files[0])}/>
                                <label htmlFor="logo-upload" className="cursor-pointer ml-5 bg-white dark:bg-gray-700 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    Change
                                </label>
                                {logo && <span className="ml-3 text-sm text-gray-500">{logo.name}</span>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="color-picker" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Primary Color</label>
                            <div className="mt-1 flex items-center gap-2">
                                <input type="color" id="color-picker" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-10 h-10 p-1 border-0 bg-transparent" />
                                <span className="text-sm text-gray-500 dark:text-gray-400">{primaryColor.toUpperCase()}</span>
                            </div>
                        </div>
                    </SettingsCard>

                    <SettingsCard title="Integrations" icon={<Zap className="h-6 w-6" />}>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold dark:text-white">Razorpay</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Payment Gateway</p>
                            </div>
                            <button className="px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-lg">Connect</button>
                        </div>
                         <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold dark:text-white">WhatsApp Business</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Notifications</p>
                            </div>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg cursor-not-allowed">Connected</button>
                        </div>
                    </SettingsCard>
                </div>
                
                <div className="space-y-8">
                     <SettingsCard title="Notifications" icon={<Bell className="h-6 w-6" />}>
                        <div className="flex items-center justify-between">
                            <span className="flex-grow flex flex-col">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">New member signups, payment reminders, etc.</span>
                            </span>
                            <Toggle checked={emailNotifications} onChange={setEmailNotifications} />
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="flex-grow flex flex-col">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Class reminders, special offers, etc.</span>
                            </span>
                             <Toggle checked={pushNotifications} onChange={setPushNotifications} />
                        </div>
                     </SettingsCard>
                </div>
            </div>
             <div className="flex justify-end pt-4">
                <button type="button" className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">Cancel</button>
                <button type="button" onClick={handleSaveChanges} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900">Save Changes</button>
            </div>
        </div>
    );
};

export default SettingsPage;
