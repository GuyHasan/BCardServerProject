import mongoose from "mongoose";
import { DEFAULT_VALIDATION, PHONE, EMAIL, URL } from "../../../helpers/mongoDB/mongooseValidators.js";
import Address from "../../../helpers/mongoDB/Address.js";
import Image from "../../../helpers/mongoDB/Image.js";

const cardSchema = new mongoose.Schema({
	title: DEFAULT_VALIDATION,
	subtitle: DEFAULT_VALIDATION,
	description: {
		...DEFAULT_VALIDATION,
		maxLength: 1024,
	},
	phone: PHONE,
	email: EMAIL,
	web: URL,
	image: Image,
	address: Address,
	bizNumber: {
		type: Number,
		required: true,
		min: 1000000,
		max: 9999999,
		unique: true,
	},
	likes: [String],
	createAt: {
		type: Date,
		default: Date.now,
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
});

const Card = mongoose.model("Card", cardSchema);

export default Card;
