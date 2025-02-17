import mongoService from "./mongoService/mongoService.js";
import config from "config";

const dbType = config.get("DB");

let userService;

switch (dbType) {
	case "MongoDB":
		userService = mongoService;
		break;
	default:
		throw new Error(`Unsupported DB type: ${dbType}`);
}

export default userService;
