import Joi from "joi";

const joiCardValidator = (card) => {
	const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.\S{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.\S{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.\S{2,}|www\.[a-zA-Z0-9]+\.\S{2,})/;
	const schema = Joi.object({
		title: Joi.string().min(2).max(256).required(),
		subtitle: Joi.string().min(2).max(256).required(),
		description: Joi.string().min(2).max(1024).required(),
		phone: Joi.string()
			.ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
			.rule({ message: "Invalid phone number" })
			.required(),
		email: Joi.string()
			.ruleset.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
			.rule({ message: "Invalid email" })
			.required(),
		web: Joi.string().ruleset.regex(urlRegex).rule({ message: "Invalid URL" }).required().allow(""),
		image: Joi.object()
			.keys({
				url: Joi.string().ruleset.regex(urlRegex).rule({ message: "Invalid URL" }).allow(""),
				alt: Joi.string().min(2).max(256).allow(""),
			})
			.required(),
		address: Joi.object()
			.keys({
				state: Joi.string().allow(""),
				country: Joi.string().required(),
				city: Joi.string().required(),
				street: Joi.string().required(),
				houseNumber: Joi.number().required(),
				zip: Joi.number(),
			})
			.required(),
	});
	return schema.validate(card);
};

export default joiCardValidator;
