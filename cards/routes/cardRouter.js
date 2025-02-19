import express from "express";
import cardService from "../services/cardServices.js";
import { handleError } from "../../utils/handleErrors.js";
import auth from "../../auth/authServices.js";
import cardValidator from "../validation/cardValidator.js";
import { normalizeCard } from "../helpers/normalizeCard.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const cards = await cardService.getCards();
		res.status(200).send(cards);
	} catch (error) {
		handleError(res, 500, error.message, next);
	}
});

router.get("/my-cards", auth, async (req, res, next) => {
	try {
		const userInfo = req.user;
		if (!userInfo) return handleError(res, 401, "Please Login to view your cards", next);
		const myCards = await cardService.getMyCards(userInfo._id);
		res.status(200).send(myCards);
	} catch (error) {
		handleError(res, 500, error.message, next);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const card = await cardService.getCardById(id);
		if (!card) return handleError(res, 404, "Card not found", next);
		res.status(200).send(card);
	} catch (error) {
		handleError(res, 500, error.message, next);
	}
});

router.post("/", auth, async (req, res, next) => {
	try {
		const userInfo = req.user;
		if (!userInfo.isBusiness) return handleError(res, 401, "Only businesses can create cards", next);
		const validateError = cardValidator(req.body);
		if (validateError !== "") return handleError(res, 400, validateError, next);
		const normalizedData = await normalizeCard(req.body, userInfo._id);
		const newCard = await cardService.createCard(normalizedData);
		res.status(201).send(newCard);
	} catch (error) {
		handleError(res, 500, error.message, next);
	}
});

router.put("/:id", auth, async (req, res, next) => {
	try {
		const userInfo = req.user;
		const cardId = req.params.id;
		const card = await cardService.getCardById(cardId);
		if (card.user_id.toString() !== userInfo._id) return handleError(res, 401, "Unauthorized, you can only update your cards", next);
		const validateError = cardValidator(req.body);
		if (validateError !== "") return handleError(res, 400, validateError, next);
		const normalizedData = await normalizeCard(req.body, userInfo._id, card);
		const updatedCard = await cardService.updateCard(cardId, normalizedData);
		res.status(200).send(updatedCard);
	} catch (error) {
		handleError(res, 500, error.message, next);
	}
});

router.patch("/:id", auth, async (req, res, next) => {
	try {
		const userInfo = req.user;
		const cardId = req.params.id;
		if (!userInfo) return handleError(res, 401, "Please Login to like a card", next);
		const patchedCard = await cardService.likeCard(cardId, userInfo._id);
		res.status(200).send(patchedCard);
	} catch (error) {
		handleError(res, 500, error.message, next);
	}
});

router.delete("/:id", auth, async (req, res, next) => {
	try {
		const userInfo = req.user;
		const cardId = req.params.id;
		const card = await cardService.getCardById(cardId);
		if (!userInfo.isAdmin && userInfo._id !== card.user_id) return handleError(res, 401, "Unauthorized, you can only delete your cards", next);
		await cardService.deleteCard(cardId);
		res.status(204).send("Card Deleted Successfully");
	} catch (error) {
		handleError(res, 500, error.message, next);
	}
});

router.patch("/:id/bizNumber", auth, async (req, res, next) => {
	try {
		const { id } = req.params;
		const { bizNumber } = req.body;
		if (!bizNumber) return handleError(res, 400, "Please provide a valid bizNumber, the expected json payload is { bizNumber: value }", next);
		const userInfo = req.user;
		if (!userInfo.isAdmin) return handleError(res, 401, "Unauthorized, only admins can update bizNumber", next);
		const card = await cardService.getCardById(id);
		if (!card) return handleError(res, 404, "Card not found", next);
		const updatedCard = await cardService.changeBizNumber(id, bizNumber);
		res.status(200).send(updatedCard);
	} catch (error) {
		handleError(res, 500, error.message, next);
	}
});

export default router;
