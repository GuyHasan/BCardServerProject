import mongoose from "mongoose";
import { DEFAULT_VALIDATION } from "./mongooseValidators";

const Address = new mongoose.Schema({
	state: {
		type: String,
		maxLength: 256,
		trim: true,
	},
	country: DEFAULT_VALIDATION,
	city: DEFAULT_VALIDATION,
	street: DEFAULT_VALIDATION,
	houseNumber: {
		type: Number,
		required: true,
		min: 1,
	},
	zip: {
		type: Number,
		default: 0,
	},
});

export default Address;
