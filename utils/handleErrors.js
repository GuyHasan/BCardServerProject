class AppError extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}

const createError = (validator, error) => {
	error.message = `${validator} Error: ${error.message}`;
	error.status = error.status || 400;
	throw new AppError(error.message, error.status);
};

const handleError = (res, status, message, next) => {
	const err = new AppError(message, status);
	res.status(status);
	next(err);
};

export { createError, handleError };
