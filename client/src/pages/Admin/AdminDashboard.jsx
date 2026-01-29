import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import Button from '../../components/UI/Button';
import AdminStats from './AdminStats';
import DoctorsManager from './DoctorsManager';
import PatientsManager from './PatientsManager';
import AppointmentsManager from './AppointmentsManager';
import DepartmentsManager from './DepartmentsManager';
import { LayoutDashboard, Stethoscope, Users, Calendar, Building, LogOut } from 'lucide-react';

const AdminDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('dashboard');

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'doctors', label: 'Doctors', icon: <Stethoscope size={20} /> },
        { id: 'patients', label: 'Patients', icon: <Users size={20} /> },
        { id: 'appointments', label: 'Appointments', icon: <Calendar size={20} /> },
        { id: 'departments', label: 'Departments', icon: <Building size={20} /> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <AdminStats />;
            case 'doctors': return <DoctorsManager />;
            case 'patients': return <PatientsManager />;
            case 'appointments': return <AppointmentsManager />;
            case 'departments': return <DepartmentsManager />;
            default: return <AdminStats />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-xl hidden md:flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-extrabold text-indigo-600">HMS Admin</h1>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`nav-item w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id
                                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t">
                    <button
                        onClick={logout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar (simplified) */}

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto h-screen">
                <header className="flex justify-between items-center mb-8 md:hidden">
                    <h1 className="text-2xl font-bold">Admin Panel</h1>
                    <Button onClick={logout} variant="danger" className="p-2"><LogOut size={20} /></Button>
                </header>

                {/* Mobile Tabs */}
                <div className="md:hidden flex overflow-x-auto space-x-2 mb-6 pb-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white text-gray-600 border'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="mb-6 flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800 capitalize">{activeTab}</h2>
                        <div className="text-sm text-gray-500">Welcome, {user?.name}</div>
                    </div>
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
