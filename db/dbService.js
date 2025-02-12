import connectToAtlasDb from "./mongodb/connectToAtlas.js";
import connectToLocalDb from "./mongodb/connectToMongoLocally.js";
import dotenv from "dotenv";

dotenv.config();
const ENVIRONMENT = process.env.ENVIRONMENT;

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
