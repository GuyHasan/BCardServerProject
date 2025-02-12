import connectToAtlasDb from "./mongodb/connectToAtlas.js";
import connectToLocalDb from "./mongodb/connectToMongoLocally.js";
import dotenv from "dotenv";

dotenv.config();
const ENVIROMENT = process.env.ENVIROMENT;

const connectToDB = async () => {
	try {
		if (ENVIROMENT === "development") {
			await connectToLocalDb();
		} else {
			await connectToAtlasDb();
		}
	} catch (err) {
		console.log("Failed to connect to MongoDB", err);
	}
};

export default connectToDB;
