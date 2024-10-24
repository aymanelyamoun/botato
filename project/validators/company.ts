import Joi from 'joi';

const createCompanySchema = Joi.object({
    name: Joi.string().min(1).required(),
    location: Joi.string().optional(),
});

const updateCompanySchema = Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string().min(1).max(50),
    location: Joi.string().min(1),
});

const deleteCompanySchema = Joi.object({
    id: Joi.string().uuid().required(),
});

const getEmployeesSchema = Joi.object({
    id : Joi.string().uuid().required()
})

const company = {
    createCompanySchema,
    updateCompanySchema,
    deleteCompanySchema,
    getEmployeesSchema,
}

export default company