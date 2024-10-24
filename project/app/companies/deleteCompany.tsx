'use client'
import React, { useState } from 'react';
import axios from 'axios';

function DeleteCompany({ companyId, onCompanyChange }: {companyId:string,onCompanyChange: () => void }) {
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/company/${companyId}`);
            setNotification({ message: "Company deleted successfully.", type: 'success' });
            onCompanyChange()
        } catch {
            setNotification({ message: "Error deleting company.", type: 'error' });
        } finally {
            setTimeout(() => setNotification(null), 3000);
        }
    };

    return (
        <>
            <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
            >
                Delete
            </button>
            {notification && (
                <div className={`fixed bottom-4 right-4 p-4 rounded shadow-lg ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {notification.message}
                </div>
            )}
        </>
    );
}

export default DeleteCompany;