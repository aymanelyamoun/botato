'use client'
import React, { useState, useEffect } from 'react';
import CreateCompany from "./createCompany";
import ListCompanies from "./listCompanies";
import axios from 'axios';

function Companies() {
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get("/api/company");
            setCompanies(response.data);
        } catch {
            setError("Error loading companies.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="w-full flex flex-col">
            <CreateCompany onCompanyChange={fetchCompanies} />
            <ListCompanies companies={companies} onCompanyChange={fetchCompanies} />
        </div>
    );
}

export default Companies;