import connectToAtlasDb from "./mongodb/connectToAtlas.js";
import connectToLocalDb from "./mongodb/connectToMongoLocally.js";
import config from "config";

const ENVIRONMENT = config.get("ENVIRONMENT");

const connectToDB = async () => {
	try {
		if (ENVIRONMENT === "development") {
			await connectToLocalDb();
		} else {
			await connectToAtlasDb();
		}
	} catch (err) {
		console.log("Failed to connect to MongoDB", err);
	}
};

export default connectToDB;
