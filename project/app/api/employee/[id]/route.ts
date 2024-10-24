import validators from "@/validators"
import { NextResponse } from "next/server"
import employee from "@/database/employee"
import { NextRequestHandlerFuncParam } from "@/types/nextRequestHandler"
import { withErrorHandlingWithParams } from "@/utils/withErrorHandling"
async function getHandler(request:Request,{ params }: { params: Promise<{ id: string }>} ) {
    const id = (await params).id
    const {error} = validators.employee.getEmployeeSchema.validate({id})
    if (error)
        return NextResponse.json({error: error.details[0].message}, {status:400})
    const res = await employee.getOne({id});
    return NextResponse.json(res);
    
}
async function deleteHandler(request :Request, { params }: { params: Promise<{ id: string }>}) {
    const id = (await params).id
    const {error} = validators.employee.deleteEmployeeSchema.validate({id})
    if (error)
        return NextResponse.json({ error: error.details[0].message }, { status: 400 });
    return NextResponse.json(await employee.deleteOne({id}))
}
export const GET = withErrorHandlingWithParams(getHandler) as NextRequestHandlerFuncParam
export const DELETE = withErrorHandlingWithParams(deleteHandler) as NextRequestHandlerFuncParam