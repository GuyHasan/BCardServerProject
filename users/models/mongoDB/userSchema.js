import mongoose from "mongoose";
import { PHONE, EMAIL } from "../../../helpers/mongoDB/mongooseValidators";
import { Address } from "../../../helpers/mongoDB/Address";
import { Name } from "../../../helpers/mongoDB/Name";
import { Image } from "../../../helpers/mongoDB/Image";

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
