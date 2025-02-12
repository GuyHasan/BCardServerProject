import mongoService from "./mongoDB/mongoService.js";
import dotenv from "dotenv";

dotenv.config();
const dbType = process.env.DB;
let userService;

switch (dbType) {
	case "MongoDB":
		userService = mongoService;
		break;
	default:
		throw new Error(`Unsupported DB type: ${dbType}`);
}

export default userService;
