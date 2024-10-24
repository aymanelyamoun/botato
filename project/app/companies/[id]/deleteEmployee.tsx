import React from 'react';
import axios from 'axios';

function DeleteEmployee({ employeeId, onEmployeeChange}: { employeeId: string, onEmployeeChange:()=>void}) {
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/employee/${employeeId}`);
            onEmployeeChange()
        } catch {
        }
    };

    return (
        <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDelete}
        >
            Delete
        </button>
    );
}

export default DeleteEmployee;