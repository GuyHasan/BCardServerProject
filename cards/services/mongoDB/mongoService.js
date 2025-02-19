import { createError } from "../../../utils/handleErrors.js";
import Card from "../../models/mongoDB/cardSchema.js";

const createCard = async (newCard) => {
	try {
		let card = new Card(newCard);
		card = await card.save();
		return card;
	} catch (err) {
		return createError("Mongoose", err);
	}
};

const getCards = async () => {
	try {
		let cards = await Card.find();
		return cards;
	} catch (err) {
		return createError("Mongoose", err);
	}
};

const getCardById = async (cardId) => {
	try {
		let card = await Card.findById(cardId);
		return card;
	} catch (err) {
		if (err.name === "CastError") {
			const error = new Error("Invalid Card ID");
			error.status = 400;
			return createError("Mongoose", error);
		} else {
			return createError("Mongoose", err);
		}
	}
};

const getMyCards = async (userId) => {
	try {
		let cards = await Card.find({ user_id: userId });
		return cards;
	} catch (err) {
		return createError("Mongoose", err);
	}
};

const updateCard = async (id, newCard) => {
	try {
		let card = await Card.findByIdAndUpdate(id, newCard, { new: true });
		return card;
	} catch (err) {
		return createError("Mongoose", err);
	}
};

const deleteCard = async (cardId) => {
	try {
		let card = await Card.findByIdAndDelete(cardId);
		return card;
	} catch (err) {
		return createError("Mongoose", err);
	}
};

const changeBizNumber = async (cardId, newBizNumber) => {
	try {
		let card = await Card.findByIdAndUpdate(cardId, { bizNumber: newBizNumber }, { new: true });
		return card;
	} catch (err) {
		return createError("Mongoose", err);
	}
};

const likeCard = async (cardId, userId) => {
	try {
		let card = await Card.findById(cardId);
		if (!card) {
			const error = new Error("Card not found");
			error.status = 404;
			return createError("Mongoose", error);
		}
		if (card.likes.includes(userId)) {
			let newLikes = card.likes.filter((id) => id !== userId);
			card.likes = newLikes;
		} else {
			card.likes.push(userId);
		}
		await card.save();
		return card;
	} catch (err) {
		return createError("Mongoose", err);
	}
};

const mongoService = { createCard, getCards, getCardById, getMyCards, updateCard, deleteCard, changeBizNumber, likeCard };

export default mongoService;
