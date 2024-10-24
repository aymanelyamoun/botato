import * as dto from "@/dto"
import employee from "@/database/employee";
import validators from "@/validators";
import { NextResponse } from "next/server";
import { withErrorHandling } from "@/utils/withErrorHandling";
import { NextRequestHandlerFunc } from "@/types";

export const dynamic = 'force-dynamic'


async function createHandler(request :Request){
    try{
        const body = await request.json() as  dto.Employee.CreateOne;
        const {error} = validators.employee.createEmployeeSchema.validate(body)
        if (error)
            return NextResponse.json({ error: error.details[0].message }, { status: 400 });
            
        return NextResponse.json(await employee.createOne(body))
    }catch(e){
        throw e
    }
}

async function updateHandler(request :Request) {
    const body = await request.json() as dto.Employee.UpdateOne;
    const {error} = validators.employee.updateEmployeeSchema.validate(body)
    if (error)
        return NextResponse.json({error: error.details[0].message}, {status:400})
    return NextResponse.json(await employee.updateOne(body))
}

async function getHandler(request:Request ) {
    const body = await request.json() as dto.Employee.GetOne;
    const {error} = validators.employee.getEmployeeSchema.validate(body)
    if (error)
        return NextResponse.json({error: error.details[0].message}, {status:400})
    const res = await employee.getOne(body);
    return NextResponse.json(res);
    
}

async function deleteHandler(request :Request) {
    const body = await request.json() as dto.Employee.DeleteOne
    const {error} = validators.employee.deleteEmployeeSchema.validate(body)
    if (error)
        return NextResponse.json({ error: error.details[0].message }, { status: 400 });
    return NextResponse.json(await employee.deleteOne(body))
}

export const GET = withErrorHandling(getHandler) as NextRequestHandlerFunc
export const DELETE = withErrorHandling(deleteHandler) as NextRequestHandlerFunc
export const POST = withErrorHandling(createHandler) as NextRequestHandlerFunc
export const PATCH = withErrorHandling(updateHandler) as NextRequestHandlerFunc

