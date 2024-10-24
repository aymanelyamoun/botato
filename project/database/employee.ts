import * as dto from "@/dto"
import pgConnect from "./db"
import { NotFoundError } from "@/utils/errors";


async function getAll() {
    const postgresClient = await pgConnect()

    const res = await postgresClient.query(`
        Select * From Employee
    `
    )
    return res.rows
}

async function getOne(getOneProps: dto.Employee.GetOne) {
    const postgresClient = await pgConnect();
    const res = await postgresClient.query(`
        Select id, firstname, lastname, username, email, location, "managerId", "companyId"
        From employee
        Where id = $1
    `, [getOneProps.id]);

    if (res.rowCount === 0) {
        throw new NotFoundError(`No employee with id: ${getOneProps.id}`);
    }

    return res.rows[0];
}

async function createOne(createProps :dto.Employee.CreateOne){
    const postgresClient = await pgConnect()
    const res = await postgresClient.query(`
        Insert Into employee(firstname, lastname, username, email, location, "managerId", "companyId")
        Values($1,$2,$3,$4,$5,$6,$7) Returning id, username, firstname, lastname, email, location`, 
        [createProps.firstname, createProps.lastname, createProps.username, createProps.email, createProps.location, createProps.managerId, createProps.companyId])
    return res.rows[0];
}

async function updateOne(updateProps :dto.Employee.UpdateOne) {
    const postgresClient = await pgConnect()
    const res = await postgresClient.query(`
        Update Employee 
        Set firstname=$1, lastname=$2, username=$3, email=$4, location=$5
        Where id=$6
        Returning id, username, firstname, lastname, email, location, "managerId"
    `, [updateProps.firstname, updateProps.lastname, updateProps.username, updateProps.email, updateProps.location, updateProps.id]
    )
    if (res.rowCount === 0)
        throw new NotFoundError(`no employee with id : ${updateProps.id}`)
    return res.rows
}

async function deleteOne(deleteProps:dto.Employee.DeleteOne) {
    const postgresClient = await pgConnect()
    const res = await postgresClient.query(`
        Delete From employee Where id = $1
    `,[deleteProps.id])
    if (res.rowCount === 0)
        throw new NotFoundError(`no employee with id : ${deleteProps.id}`)
    return {message:"resource Deleted"}
    // return res.rows[0]
}


const employee = {
    getAll,
    createOne,
    updateOne,
    deleteOne,
    getOne,
}

export default employee