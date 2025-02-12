import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { createError } from "../../utils/handleErrors";

dotenv.config();
const SECRET_WORD = process.env.SECRET_WORD;

const generateAuthToken = (user) => {
	let payload = {
		_id: user._id,
		isAdmin: user.isAdmin,
		isBusiness: user.isBusiness,
	};
	const token = jwt.sign(payload, SECRET_WORD);
	return token;
};

const verifyAuthToken = (token) => {
	try {
		const payload = jwt.verify(token, SECRET_WORD);
		return payload;
	} catch (err) {
		const error = new Error("Invalid token");
		error.status = 401;
		createError("Authentication", error);
	}
};

export { generateAuthToken, verifyAuthToken };
