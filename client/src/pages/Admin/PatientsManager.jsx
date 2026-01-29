import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Button from '../../components/UI/Button';

const PatientsManager = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const { data } = await api.get('/admin/patients');
            setPatients(data);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleStatus = async (id) => {
        try {
            await api.put(`/admin/users/${id}/status`);
            fetchPatients();
        } catch (error) {
            alert('Failed to update status');
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Manage Patients</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {patients.map((patient) => (
                            <tr key={patient._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{patient.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{patient.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{patient.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${patient.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {patient.isActive ? 'Active' : 'Blocked'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Button
                                        variant={patient.isActive ? 'danger' : 'primary'}
                                        onClick={() => toggleStatus(patient._id)}
                                        className="text-xs px-2 py-1"
                                    >
                                        {patient.isActive ? 'Block' : 'Activate'}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientsManager;
