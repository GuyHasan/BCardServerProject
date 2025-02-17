import { createError, handleError } from "../utils/handleErrors.js";
import { verifyAuthToken } from "./providers/jwt.js";
import config from "config";

const tokenGenerator = config.get("TOKEN_GENERATOR");

const auth = (req, res, next) => {
	if (tokenGenerator === "jwt") {
		try {
			const tokenFromClient = req.header("x-auth-token");
			if (!tokenFromClient) {
				const error = new Error("Please Login");
				error.status = 401;
				return createError("Authentication", error);
			}
			const userInfo = verifyAuthToken(tokenFromClient);
			if (!userInfo) {
				const error = new Error("Invalid token");
				error.status = 401;
				return createError("Authentication", error);
			}
			req.user = userInfo;
			return next();
		} catch (err) {
			return handleError(res, 401, err.message);
		}
	}
	return handleError(res, 500, "Internal Server error.");
};

export default auth;
