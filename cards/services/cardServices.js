import mongoService from "./mongoDB/mongoService.js";
import dotenv from "dotenv";

dotenv.config();
const dbType = process.env.DB;
let cardService;

switch (dbType) {
	case "MongoDB":
		cardService = mongoService;
		break;
	default:
		throw new Error(`Unsupported DB type: ${dbType}`);
}

export default cardService;
