import express from "express";
import { handleError } from "../../utils/handleErrors.js";
import userService from "../services/userServices.js";
import { validateRegistration, validateLogin } from "../validation/userValidator.js";
import auth from "../../auth/authServices.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
	try {
		const validateErrorMessage = validateRegistration(req.body);
		if (validateErrorMessage !== "") {
			return handleError(res, 400, "Validation" + validateErrorMessage, next);
		}
		let newUser = req.body;
		newUser = await userService.registerUser(newUser);
		res.status(201).send(newUser);
	} catch (error) {
		handleError(res, 500, error.message, next);
	}
});

router.post("/login", async (req, res, next) => {
	try {
		const validateErrorMessage = validateLogin(req.body);
		if (validateErrorMessage !== "") {
			return handleError(res, 400, "Validation" + validateErrorMessage, next);
		}
		let { email, password } = req.body;
		let token = await userService.loginUser(email, password);
		res.status(200).send(token);
	} catch (error) {
		handleError(res, 401, error.message, next);
	}
});

router.get("/", auth, async (req, res, next) => {
	try {
		const userInfo = req.user;
		if (!userInfo.isAdmin) return handleError(res, 403, "Forbidden, only admin can access this resource", next);
		const users = await userService.getUsers();
		res.status(200).send(users);
	} catch (error) {
		handleError(res, 500, error.message, next);
	}
});

router.get("/:id", auth, async (req, res, next) => {
	try {
		const userInfo = req.user;
		let { id } = req.params;
		if (!userInfo.isAdmin && userInfo._id !== id) return handleError(res, 403, "Forbidden, you can only view your own profile", next);
		const user = await userService.getUserById(id);
		res.status(200).send(user);
	} catch (error) {
		handleError(res, 404, error.message, next);
	}
});

router.put("/:id", auth, async (req, res, next) => {
	try {
		const userInfo = req.user;
		let { id } = req.params;
		if (userInfo._id !== id) return handleError(res, 403, "Forbidden, you can only update your own profile", next);
		let updatedUser = req.body;
		updatedUser = await userService.updateUser(id, updatedUser);
		res.status(200).send(updatedUser);
	} catch (error) {
		handleError(res, 400, error.message, next);
	}
});

router.patch("/:id", auth, async (req, res, next) => {
	try {
		const userInfo = req.user;
		let { id } = req.params;
		if (userInfo._id !== id) return handleError(res, 403, "Forbidden, you can only update your own profile", next);
		let updatedUser = await userService.changeBusinessStatus(id);
		res.status(200).send("isBusiness status updated: " + updatedUser.isBusiness);
	} catch (error) {
		handleError(res, 400, error.message, next);
	}
});

router.delete("/:id", auth, async (req, res, next) => {
	try {
		const userInfo = req.user;
		let { id } = req.params;
		if (!userInfo.isAdmin && userInfo._id !== id) return handleError(res, 403, "Forbidden, you can only delete your own profile", next);
		let user = await userService.deleteUser(id);
		res.status(204).send(user);
	} catch (error) {
		handleError(res, 404, error.message, next);
	}
});

export default router;
