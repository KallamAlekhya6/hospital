import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';

const DepartmentsManager = () => {
    const [departments, setDepartments] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const { data } = await api.get('/admin/departments');
            setDepartments(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/departments', { name, description });
            setName('');
            setDescription('');
            fetchDepartments();
        } catch (error) {
            alert('Failed to add department');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/admin/departments/${id}`);
            fetchDepartments();
        } catch (error) {
            alert('Failed to delete');
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Manage Departments</h2>

            <form onSubmit={handleAdd} className="mb-8 flex gap-4 items-end">
                <div className="flex-1">
                    <Input
                        label="Department Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="e.g. Cardiology"
                    />
                </div>
                <div className="flex-1">
                    <Input
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Optional description"
                    />
                </div>
                <Button type="submit">Add</Button>
            </form>

            <div className="space-y-2">
                {departments.map(dept => (
                    <div key={dept._id} className="flex justify-between items-center p-4 border rounded-lg bg-gray-50">
                        <div>
                            <h3 className="font-semibold">{dept.name}</h3>
                            <p className="text-sm text-gray-500">{dept.description}</p>
                        </div>
                        <Button variant="danger" onClick={() => handleDelete(dept._id)} className="px-3 py-1 text-xs">Delete</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DepartmentsManager;
