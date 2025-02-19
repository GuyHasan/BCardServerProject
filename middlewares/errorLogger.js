import chalk from "chalk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const errorLogger = (err, req, res) => {
	if (res.statusCode >= 400) {
		const date = new Date();
		const dateString = date.toISOString().split("T")[0]; // YYYY-MM-DD
		const logDirectory = path.join(__dirname, "../logs");

		// יצירת התיקייה אם היא לא קיימת
		if (!fs.existsSync(logDirectory)) {
			fs.mkdirSync(logDirectory);
		}

		const logFile = path.join(logDirectory, `${dateString}.log`);
		const logEntry = `
        Date: ${date.toISOString()}
        Status Code: ${res.statusCode}
        Error Message: ${err.message}
        ------------------------
        `;

		fs.appendFile(logFile, logEntry, (error) => {
			if (error) {
				console.error("An error occurred while writing to the log file:", error);
			}
		});
		console.error(chalk.bgRedBright(`Error: ${err.status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`));
	}
};

export default errorLogger;
