import express from "express";
import { handleError } from "../../utils/handleErrors.js";
const router = express.Router();

router.post("/", async (req, res) => {
	try {
		let newUser = req.body;
		newUser = await userService.registerUser(newUser);
		res.status(201).send(newUser);
	} catch (error) {
		handleError(res, 500, error.message);
	}
});

router.post("/login", async (req, res) => {
	try {
		let { email, password } = req.body;
		let token = await userService.loginUser(email, password);
		res.status(200).send(token);
	} catch (error) {
		handleError(res, 401, error.message); // Unauthorized
	}
});

router.get("/", async (req, res) => {
	try {
		const users = await userService.getUsers();
		res.status(200).send(users);
	} catch (error) {
		handleError(res, 500, error.message);
	}
});

router.get("/:id", async (req, res) => {
	try {
		// get user by id logic here
		res.status(200).send(user);
	} catch (error) {
		handleError(res, 404, error.message); // Not Found
	}
});

router.put("/:id", async (req, res) => {
	try {
		// update user by id logic here
		res.status(200).send(updatedUser);
	} catch (error) {
		handleError(res, 400, error.message); // Bad Request
	}
});

router.patch("/:id", async (req, res) => {
	try {
		// partial update user by id logic here
		res.status(200).send(updatedUser);
	} catch (error) {
		handleError(res, 400, error.message); // Bad Request
	}
});

router.delete("/:id", async (req, res) => {
	try {
		// delete user by id logic here
		res.status(204).send(); // No Content
	} catch (error) {
		handleError(res, 404, error.message); // Not Found
	}
});

export default router;
