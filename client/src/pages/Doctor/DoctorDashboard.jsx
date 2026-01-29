import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import Button from '../../components/UI/Button';
import api from '../../services/api';
import { Calendar, CheckCircle } from 'lucide-react';

const DoctorDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const { data } = await api.get('/appointments/doctor');
            // Filter to show all relevant ones. 
            // If requirement is "see appointments while admin approve", maybe they see pending too?
            // User said: "in doctocts loin they shoud see appointments of patentents while admin approve"
            // This likely means they see the approved ones. Or maybe they see pending ones waiting for approval?
            // Usually doctors act on approved appointments.
            // Let's show all and visually distinguish status.
            setAppointments(data);
        } catch (error) {
            console.error("Failed to fetch appointments");
        }
    };

    const handleComplete = async (id) => {
        try {
            await api.put(`/appointments/${id}/status`, { status: 'completed' });
            fetchAppointments();
        } catch (error) {
            alert("Failed to update");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Dr. {user?.name}</h1>
                        <p className="text-gray-600">Doctor Dashboard</p>
                    </div>
                    <Button onClick={logout} variant="danger">Logout</Button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold text-indigo-700 mb-6 flex items-center">
                        <Calendar className="mr-2" /> My Schedule
                    </h2>

                    <div className="space-y-4">
                        {appointments.length === 0 ? (
                            <p className="text-gray-500">No appointments found.</p>
                        ) : (
                            appointments.map(apt => (
                                <div key={apt._id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase
                                            ${apt.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                        apt.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                                            apt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                                'bg-yellow-100 text-yellow-800'}`}>
                                                    {apt.status}
                                                </span>
                                                <h3 className="text-lg font-semibold">{apt.patient?.name}</h3>
                                            </div>
                                            <p className="text-gray-600 mb-1">Date: {new Date(apt.date).toLocaleString()}</p>
                                            <p className="text-gray-600 mb-1">Reason: <span className="text-gray-900">{apt.reason}</span></p>
                                            <p className="text-sm text-gray-500">
                                                {apt.patient?.gender}, {apt.patient?.phone}
                                            </p>
                                        </div>

                                        {apt.status === 'approved' && (
                                            <Button
                                                onClick={() => handleComplete(apt._id)}
                                                className="flex items-center text-sm"
                                            >
                                                <CheckCircle size={16} className="mr-2" /> Mark Completed
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
