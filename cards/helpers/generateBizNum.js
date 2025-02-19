import _ from "lodash";
import Card from "../models/mongoDB/cardSchema.js";
import { createError } from "../../utils/handleErrors.js";

const generateBizNum = async () => {
	let cardCount = await Card.countDocuments();
	if (cardCount === 8999999) {
		const error = new Error("You Reached The Maximum Cards in Your System");
		error.status = 507;
		createError("Monogoose", error);
	}
	do {
		bizNum = _.random(1000000, 9999999);
	} while (await checkBizNumberExists(bizNum));
	return bizNum;
};

const checkBizNumberExists = async (bizNum) => {
	try {
		const bizNumExist = await Card.findOne({ bizNumber: bizNum });
		return Boolean(bizNumExist);
	} catch (err) {
		err.status = 500;
		createError("Monogoose", err);
	}
};

export { generateBizNum };
