import express from "express";
import cardRouter from "../cards/routes/cardRouter";
import usersRouter from "../users/routes/usersRouter";
import { handleError } from "../utils/handleErrors";

const router = express.Router();

router.use("/cards", cardRouter);
router.use("/users", usersRouter);
router.use((req, res) => {
	handleError(res, 404, "Route not found");
});

export default router;
