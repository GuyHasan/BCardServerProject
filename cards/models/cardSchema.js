const DB = process.env.DB;

if (DB === "mongodb") {
	Card = require("./mongoDB/mongoSchema");
}

export default Card;
