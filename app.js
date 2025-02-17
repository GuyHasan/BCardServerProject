import express from "express";
import connectToDB from "./db/dbService.js";
import router from "./router/router.js";
import dotenv from "dotenv";
import { handleError } from "./utils/handleErrors.js";
import corsOptions from "./middlewares/cors.js";
import loggerMiddleware from "./utils/logger/loggerService.js";
dotenv.config();

const PORT = process.env.PORT || 8181;
const app = express();

app.use(corsOptions);
app.use(loggerMiddleware());
app.use(express.json());

app.use(router);
app.use((err, req, res, next) => {
	handleError(res, 500, "Internal server error");
});
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectToDB();
});
