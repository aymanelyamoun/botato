'use client'
import React, { useState } from 'react';
import axios from 'axios';

function UpdateCompany({ companyId, onCompanyChange }: {companyId:string, onCompanyChange: () => void}) {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await axios.patch(`/api/company`, { id:companyId, name, location });
            setOpen(false);
            onCompanyChange();
            setNotification({ message: "Company updated successfully.", type: 'success' });
            // queryClient.invalidateQueries(["companies"]);
        } catch {
            setNotification({ message: "Error updating company.", type: 'error' });
        } finally {
            setTimeout(() => setNotification(null), 3000);
        }
    };

    return (
        <>
            <button
                className="bg-blue-500 text-white px-4 py-2"
                onClick={() => setOpen(true)}
            >
                Update
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
                                <label htmlFor="name" className="block text-gray-700">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="location" className="block text-gray-700">Location:</label>
                                <input
                                    type="text"
                                    id="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
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
}

export default UpdateCompany;