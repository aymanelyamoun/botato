"use client";

import { useRouter } from 'next/navigation';
import UpdateCompany from './updateCompany';
import DeleteCompany from './deleteCompany';
import { Company } from '@/interfaces';

function CompanyRow({ company, onCompanyChange }: { company: Company, onCompanyChange: () => void }) {
    const router = useRouter();
    const handleVisitClick = () => {
        router.push(`/companies/${company.id}`);
    };

    return (
        <li key={company.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{company.name}</h2>
            <p className="text-gray-600">Location: {company.location}</p>
            <p className="text-gray-600">
                Created At: {new Date(company.createdAt).toLocaleDateString()}
            </p>
            <div className="flex space-x-4">
                <button
                    onClick={handleVisitClick}
                    className="bg-gray-300 text-white px-4 py-2 rounded"
                >
                    Visit
                </button>
                <UpdateCompany companyId={company.id} onCompanyChange={onCompanyChange} />
                <DeleteCompany companyId={company.id} onCompanyChange={onCompanyChange} />
            </div>
        </li>
    );
}

export function ListCompanies({companies, onCompanyChange}:{companies:Company[], onCompanyChange: () => void}) {
    return (
        <div className="p-4">
            <ul>
                {companies.map((company) => (
                    <CompanyRow key={company.id} company={company} onCompanyChange={onCompanyChange} />
                ))}
            </ul>
        </div>
    );
}
export default ListCompanies;