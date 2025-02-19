import joiCardValidator from "./joi/joiCardValidation.js";
import config from "config";

const validator = config.get("VALIDATOR");

const cardValidator = (card) => {
	switch (validator) {
		case "Joi":
			const { error } = joiCardValidator(card);
			if (error) return error.details[0].message;
			return "";
		default:
			throw new Error("Validator not found");
	}
};

export default cardValidator;
