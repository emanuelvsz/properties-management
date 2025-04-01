import Joi from "joi";

export const webSchema: Joi.ObjectSchema = Joi.object({
	WEB_API_URL: Joi.string().uri().required()
});
