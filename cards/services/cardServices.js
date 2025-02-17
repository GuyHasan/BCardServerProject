import mongoService from "./mongoDB/mongoService.js";
import config from "config";

const dbType = config.get("DB");
let cardService;

switch (dbType) {
	case "MongoDB":
		cardService = mongoService;
		break;
	default:
		throw new Error(`Unsupported DB type: ${dbType}`);
}

export default cardService;
