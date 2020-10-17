import Joi from 'joi';

export interface IRegisterSchema {
    email: string,
    username: string,
    password: string
}

export const registerSchema = Joi.object<IRegisterSchema>({
    email: Joi.string().email().required(),
    username: Joi.string().min(5).max(16).regex(/^[a-zA-Z0-9][a-zA-Z0-9_\s]*[a-zA-Z0-9_]$/).required(),
    password: Joi.string().min(8).max(64).required()
});
