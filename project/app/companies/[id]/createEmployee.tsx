'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Employee } from '@/interfaces';

const CreateEmployee = ({ companyId, onEmployeeChange }: { companyId: string, onEmployeeChange:()=>void }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        location: '',
        managerId: ''
    });
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`/api/company/${companyId}`, {data:{id:companyId}});
                setEmployees(response.data);
            } catch {
            }
        };

        fetchEmployees();
    }, [companyId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const { firstname, lastname, username, email, location, managerId } = formData;
        const managerIdToSend = managerId === '' ? null : managerId;
        try {
            await axios.post("/api/employee", { 
                firstname, 
                lastname, 
                username, 
                email, 
                location, 
                managerId: managerIdToSend, 
                companyId 
            });
            setOpen(false);
            setNotification({ message: "Employee added successfully.", type: 'success' });
            onEmployeeChange()
            setFormData({
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                location: '',
                managerId: ''
            });
        } catch {
            setNotification({ message: "Error adding employee.", type: 'error' });
        } finally {
            setTimeout(() => setNotification(null), 3000);
        }
    };

    return (
        <>
            <button
                className="bg-green-500 text-white px-4 py-2"
                onClick={() => setOpen(true)}
            >
                Add Employee
            </button>
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3 relative">
                        <span
                            className="absolute top-2 right-2 text-gray-500 cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            &times;
                        </span>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Manager</label>
                                <select
                                    name="managerId"
                                    value={formData.managerId}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">None</option>
                                    {employees.map((employee) => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.firstname} {employee.lastname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Company ID</label>
                                <input
                                    type="text"
                                    value={companyId}
                                    placeholder={companyId}
                                    readOnly
                                    className="w-full p-2 border rounded bg-gray-200"
                                    required
                                />
                            </div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {notification && (
                <div className={`fixed bottom-4 right-4 p-4 rounded shadow-lg ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {notification.message}
                </div>
            )}
        </>
    );
};

export default CreateEmployee;