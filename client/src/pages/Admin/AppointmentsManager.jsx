import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Button from '../../components/UI/Button';

const AppointmentsManager = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const { data } = await api.get('/admin/appointments');
            setAppointments(data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/appointments/${id}/status`, { status });
            fetchAppointments();
        } catch (error) {
            alert('Failed to update status');
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Manage Appointments</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {appointments.map((apt) => (
                            <tr key={apt._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{apt.patient?.name}</div>
                                    <div className="text-sm text-gray-500">{apt.reason}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">Dr. {apt.doctor?.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(apt.date).toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${apt.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            apt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'}`}>
                                        {apt.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    {apt.status === 'pending' && (
                                        <>
                                            <Button
                                                onClick={() => updateStatus(apt._id, 'approved')}
                                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs"
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                onClick={() => updateStatus(apt._id, 'cancelled')}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-xs"
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppointmentsManager;
