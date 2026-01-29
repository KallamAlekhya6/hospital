import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Users, UserPlus, Calendar, Activity } from 'lucide-react';

const AdminStats = () => {
    const [stats, setStats] = useState({ doctors: 0, patients: 0, appointments: 0 });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const { data } = await api.get('/admin/stats');
            setStats(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center">
                <div className="p-4 bg-blue-100 rounded-full text-blue-600 mr-4">
                    <Users size={32} />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-700">Total Patients</h2>
                    <p className="text-3xl font-bold">{stats.patients}</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center">
                <div className="p-4 bg-green-100 rounded-full text-green-600 mr-4">
                    <UserPlus size={32} />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-700">Total Doctors</h2>
                    <p className="text-3xl font-bold">{stats.doctors}</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center">
                <div className="p-4 bg-purple-100 rounded-full text-purple-600 mr-4">
                    <Calendar size={32} />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-700">Appointments</h2>
                    <p className="text-3xl font-bold">{stats.appointments}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;
