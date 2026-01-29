import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';

const DoctorsManager = () => {
    const [doctors, setDoctors] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', phone: '', gender: 'Male',
        specialization: '', qualification: '', experience: '', feesPerConsultation: '',
        availability: [{ day: 'Monday', startTime: '09:00', endTime: '17:00' }]
    });

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const { data } = await api.get('/admin/doctors');
            setDoctors(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/doctors', formData);
            setShowForm(false);
            fetchDoctors();
            alert('Doctor added successfully');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to add doctor');
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Manage Doctors</h2>
                <Button onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add New Doctor'}
                </Button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    <Input label="Email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                    <Input label="Password" type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
                    <Input label="Phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
                    <div>
                        <label className="block text-sm font-medium mb-1">Gender</label>
                        <select className="w-full border p-2 rounded" value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <Input label="Specialization" value={formData.specialization} onChange={e => setFormData({ ...formData, specialization: e.target.value })} required />
                    <Input label="Qualification" value={formData.qualification} onChange={e => setFormData({ ...formData, qualification: e.target.value })} required />
                    <Input label="Experience (Years)" type="number" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} required />
                    <Input label="Fees (₹)" type="number" value={formData.feesPerConsultation} onChange={e => setFormData({ ...formData, feesPerConsultation: e.target.value })} required />

                    <div className="md:col-span-2 mt-4">
                        <Button type="submit">Create Doctor Account</Button>
                    </div>
                </form>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {doctors.map((doc) => (
                            <tr key={doc._id}>
                                <td className="px-6 py-4 whitespace-nowrap">Dr. {doc.user?.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{doc.specialization}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{doc.user?.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">₹{doc.feesPerConsultation}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${doc.user?.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {doc.user?.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorsManager;
