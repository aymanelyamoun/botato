'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateEmployee from './createEmployee';
import ListEmployees from './listEmployees';
import { useRouter } from "next/navigation";
import { Employee } from '@/interfaces';

function Employees({ params }: { params: { id: string } }) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const fetchEmployees = async () => {
        if (!params.id) return;

        try {
            console.log("params: ", params)
            console.log("data: ", {data:{id:params.id}})
            const response = await axios.get(`/api/company/${params.id}`);
            setEmployees(response.data);
        } catch {
            setError("Error loading employees.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [params.id]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="w-full flex flex-col">
            <button onClick={() => router.push("/companies")} className="mb-4 p-2 bg-blue-500 text-white rounded">
                Back to Companies
            </button>
            <CreateEmployee companyId={params.id} onEmployeeChange={fetchEmployees} />
            <ListEmployees employees={employees} onEmployeeChange={fetchEmployees} />
        </div>
    );
}

export default Employees;