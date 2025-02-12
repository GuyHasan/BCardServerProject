import mongoose from "mongoose";
import { PHONE, EMAIL } from "../../../helpers/mongoDB/mongooseValidators.js";
import { Address } from "../../../helpers/mongoDB/Address.js";
import { Name } from "../../../helpers/mongoDB/Name.js";
import { Image } from "../../../helpers/mongoDB/Image.js";

const userSchema = new mongoose.Schema({
	name: Name,
	phone: PHONE,
	email: EMAIL,
	password: {
		type: String,
		required: true,
	},
	image: Image,
	address: Address,
	isAdmin: {
		type: Boolean,
		default: false,
	},
	isBusiness: {
		type: Boolean,
		default: false,
	},
	createAt: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model("User", userSchema);

export default User;
