import mongoose from "mongoose";
import { URL, DEFAULT_VALIDATION } from "./mongooseValidators";

const Image = new mongoose.Schema({
	url: URL,
	alt: DEFAULT_VALIDATION,
});

export default Image;
