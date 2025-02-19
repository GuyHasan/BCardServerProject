//!this function clear all exist data in the database - use with caution

import connectToDB from "../db/dbService.js";
import User from "../users/models/mongoDB/userSchema.js";
import Card from "../cards/models/mongoDB/cardSchema.js";
import monngoose from "mongoose";

const clearDataBase = async () => {
	try {
		connectToDB();
		await User.deleteMany();
		await Card.deleteMany();
		console.log("Database cleared");
		await monngoose.disconnect();
	} catch (err) {
		return createError("Mongoose", err);
	}
};

clearDataBase().catch((err) => {
	console.error("Failed to clear database:", err);
});
