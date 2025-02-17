import joiLoginValidation from "./joi/loginValidation.js";
import joiRegisterValidation from "./joi/registerValidation.js";
import config from "config";

const validator = config.get("VALIDATOR");

const validateRegistration = (user) => {
	switch (validator) {
		case "Joi":
			const { error } = joiRegisterValidation(user);
			if (error) return error.details[0].message;
			return "";
		default:
			throw new Error("Validator not found");
	}
};

const validateLogin = (user) => {
	switch (validator) {
		case "Joi":
			const { error } = joiLoginValidation(user);
			if (error) return error.details[0].message;
			return "";
		default:
			throw new Error("Validator not found");
	}
};

export { validateRegistration, validateLogin };
