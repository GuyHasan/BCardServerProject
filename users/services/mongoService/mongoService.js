import { generateAuthToken } from "../../auth/providers/jwt.js";
import { createError } from "../../utils/handleErrors.js";
import { generatePassword, comparePasswords } from "../helpers/bcrypt.js";
import User from "../../models/mongoDB/userSchema.js";

const registerUser = async (newUser) => {
	try {
		newUser.password = generatePassword(newUser.password);
		let user = new User(newUser);
		user = await user.save();
		return user;
	} catch (err) {
		return createError("Mongoose", err);
	}
};

const getUserById = async (userId) => {
	try {
		let user = await User.findById(userId);
		return user;
	} catch (err) {
		return createError("Mongoose", err);
	}
};

const getUsers = async () => {
	try {
		let users = await User.find();
		return users;
	} catch (err) {
		return createError("Mongoose", err);
	}
};

const loginUser = async (email, password) => {
	try {
		let user = await User.findOne({ email: email });
		if (!user) {
			const error = new Error("User not exist, Please register");
			error.status = 401;
			createError("Authentication", error);
		}
		if (!comparePasswords(password, user.password)) {
			const error = new Error("Password missmatch");
			error.status = 401;
			createError("Authentication", error);
		}
		const token = generateAuthToken(user);
		return token;
	} catch (err) {
		return createError("Mongoose", err);
	}
};

const updateUser = async (userId, user) => {
	try {
		let updatedUser = await User.findByIdAndUpdate(userId, user, { new: true });
		return updatedUser;
	} catch (err) {
		return createError("Mongoose", err);
	}
};

const deleteUser = async (userId) => {
	try {
		let user = await User.findByIdAndDelete(userId);
		return user;
	} catch (err) {
		return createError("Mongoose", err);
	}
};

const mongoService = { registerUser, getUserById, loginUser, updateUser, deleteUser };

export default mongoService;
