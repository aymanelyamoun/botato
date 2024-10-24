'use client'
import DeleteEmployee from "./deleteEmployee";
import { Employee } from "@/interfaces";

function EmployeeItem({ employee, onEmployeeChange }: { employee: Employee, onEmployeeChange:()=>void }) {
    return (
        <li key={employee.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{employee.firstname} {employee.lastname}</h2>
            <p className="text-gray-600">Username: {employee.username}</p>
            <p className="text-gray-600">Email: {employee.email}</p>
            <p className="text-gray-600">Location: {employee.location}</p>
            <p className="text-gray-600">
                Created At: {new Date(employee.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600">Manager ID: {employee.managerId}</p>
            <div className="mt-4 flex space-x-2">
                <DeleteEmployee employeeId={employee.id} onEmployeeChange={onEmployeeChange} />
                {/* <UpdateEmployee employeeId={employee.id} companyId={companyId} /> */}
            </div>
        </li>
    );
}

export function ListEmployees({employees, onEmployeeChange}:{employees:Employee[] , onEmployeeChange:()=>void}) {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Employees</h1>
            <ul className="space-y-4">
                {employees.map((employee) => (
                    <EmployeeItem key={employee.id} employee={employee} onEmployeeChange={onEmployeeChange}/>
                ))}
            </ul>
        </div>
    );
}

export default ListEmployees;