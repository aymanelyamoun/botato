import Joi from "joi";

const getEmployeeSchema = Joi.object({
    id: Joi.string().uuid().required(),
})

const createEmployeeSchema = Joi.object({
    firstname: Joi.string().required().max(18).min(1),
    lastname: Joi.string().required().max(18).min(1),
    username: Joi.string().required().max(30).min(1),
    email: Joi.string().required().email().max(80),
    location: Joi.string(),
    companyId: Joi.string().uuid().optional(),
    managerId:  Joi.string().optional().uuid().allow(null),
});

const updateEmployeeSchema = Joi.object({
    id: Joi.string().uuid().required(),
    firstname: Joi.string().required().max(18).min(1),
    lastname: Joi.string().required().max(18).min(1),
    username: Joi.string().required().max(30).min(1),
    email: Joi.string().required().email().max(80),
    location: Joi.string(),
    managerId: Joi.string().uuid().optional().allow(null),
});

const deleteEmployeeSchema = Joi.object({
    id: Joi.string().uuid().required(),
})

export const employee = {
    getEmployeeSchema,
    createEmployeeSchema,
    updateEmployeeSchema,
    deleteEmployeeSchema,
}