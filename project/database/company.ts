import { NotFoundError } from "@/utils/errors";
import pgConnect from "./db";
import * as dto from "@/dto"

async function getAll(){
    const postgresClient = await pgConnect();

    const res = await postgresClient.query("Select * From company")
    return res.rows
}

async function createOne(createOneProps:dto.Company.CreateOne) {
    const postgresClient = await pgConnect();
    const result = await postgresClient.query("Insert Into company(name, location) Values($1, $2) Returning *", [createOneProps.name, createOneProps.location])
    return result.rows[0]
}

async function updateOne(updateProps:dto.Company.UpdateOne) {
    const postgresClient = await pgConnect()
    const result = await postgresClient.query(
        "UPDATE company SET name = $1, location = $2 WHERE id = $3 RETURNING id, name, location",
        [updateProps.name, updateProps.location, updateProps.id]
    );
    if (result.rowCount === 0){
        throw new NotFoundError( `No company with id : ${updateProps.id}`)
    }
    return result.rows[0]
}

async function deleteOne(deleteOneProps:dto.Company.DeleteOne) {
    const postgresClient = await pgConnect();
    await postgresClient.query("DELETE FROM company WHERE id=$1 RETURNING *", [deleteOneProps.id]);
}

async function getCompanyEmployees(GetEmployeesParams:dto.Company.GetEmployees) {
    const postgresClient = await pgConnect();
    const res = await postgresClient.query(`Select e.* From employee e Join company c On e."companyId" = c.id Where c.id = $1`,[GetEmployeesParams.id]);
    return res.rows
}


const company = {
    getAll,
    createOne,
    updateOne,
    deleteOne,
    getCompanyEmployees,
}

export default company;