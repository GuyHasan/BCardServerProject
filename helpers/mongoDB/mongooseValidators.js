const URL = {
	type: String,
	trim: true,
	lowercase: true,
	match: RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/),
};

const EMAIL = {
	type: String,
	required: true,
	lowercase: true,
	trim: true,
	unique: true,
	match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
};

const DEFAULT_VALIDATION = {
	type: String,
	required: true,
	minlength: 2,
	maxlength: 256,
	trim: true,
	lowercase: true,
};

const PHONE = {
	type: String,
	required: true,
	match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
};

export { URL, EMAIL, DEFAULT_VALIDATION, PHONE };
