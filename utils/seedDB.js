import mongoose from "mongoose";
import User from "../users/models/mongoDB/userSchema.js";
import Card from "../cards/models/mongoDB/cardSchema.js";
import connectToDB from "../db/dbService.js";
import { generateBizNum } from "../cards/helpers/generateBizNum.js";
import { generatePassword } from "../users/helpers/bcrypt.js";

const seedData = async () => {
	const userCount = await User.countDocuments();
	if (userCount == 0) {
		console.log("No users found, seeding database");
		// Connect to MongoDB
		// Users
		const users = [
			{
				name: { first: "Regular", middle: "", last: "User" },
				phone: "012-3456789",
				email: "regular@example.com",
				password: "Password1!",
				image: { url: "", alt: "User Profile Image" },
				address: { state: "", country: "Country", city: "City", street: "Street", houseNumber: 1, zip: 12345 },
				isBusiness: false,
				isAdmin: false,
			},
			{
				name: { first: "Business", middle: "", last: "User" },
				phone: "012-3456789",
				email: "business@example.com",
				password: "Password1!",
				image: { url: "", alt: "User Profile Image" },
				address: { state: "", country: "Country", city: "City", street: "Street", houseNumber: 1, zip: 12345 },
				isBusiness: true,
				isAdmin: false,
			},
			{
				name: { first: "Admin", middle: "", last: "User" },
				phone: "012-3456789",
				email: "admin@example.com",
				password: "Password1!",
				image: { url: "", alt: "User Profile Image" },
				address: { state: "", country: "Country", city: "City", street: "Street", houseNumber: 1, zip: 12345 },
				isBusiness: true,
				isAdmin: true,
			},
		];
		for (let user of users) {
			user.password = generatePassword(user.password);
		}
		const userIDs = await User.insertMany(users).then((users) => users.map((user) => user._id));

		// Cards
		const cards = [
			{
				title: "Card 1",
				subtitle: "Subtitle 1",
				description: "Description 1",
				phone: "012-3456789",
				email: "card1@example.com",
				web: "",
				image: { url: "", alt: "Business Image" },
				address: { state: "", country: "Country", city: "City", street: "Street", houseNumber: 1, zip: 12345 },
				user_id: userIDs[1], // Second user (Business user)
				bizNumber: await generateBizNum(),
			},
			{
				title: "Card 2",
				subtitle: "Subtitle 2",
				description: "Description 2",
				phone: "012-3456789",
				email: "card2@example.com",
				web: "",
				image: { url: "", alt: "Business Image" },
				address: { state: "", country: "Country", city: "City", street: "Street", houseNumber: 1, zip: 12345 },
				user_id: userIDs[1], // Second user (Business user)
				bizNumber: await generateBizNum(),
			},
			{
				title: "Card 3",
				subtitle: "Subtitle 3",
				description: "Description 3",
				phone: "012-3456789",
				email: "card3@example.com",
				web: "",
				image: { url: "", alt: "Business Image" },
				address: { state: "", country: "Country", city: "City", street: "Street", houseNumber: 1, zip: 12345 },
				user_id: userIDs[2], // Third user (Admin user)
				bizNumber: await generateBizNum(),
			},
		];
		await Card.insertMany(cards);
		console.log("Database seeded successfully");
	} else {
		console.log("Users found, skipping seeding database");
	}
};

export default seedData;
