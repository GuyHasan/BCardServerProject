import express from "express";
import cardService from "../services/cardServices.js";
import { handleError } from "../../utils/handleErrors.js";
import auth from "../../auth/authServices.js";
import cardValidator from "../validation/cardValidator.js";
import { normalizeCard } from "../helpers/normalizeCard.js";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const cards = await cardService.getCards();
		res.status(200).send(cards);
	} catch (error) {
		handleError(res, 500, error.message);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const card = await cardService.getCardById(id);
		if (!card) return handleError(res, 404, "Card not found");
		res.status(200).send(card);
	} catch (error) {
		handleError(res, 500, error.message);
	}
});

router.get("/my-cards", auth, async (req, res) => {
	try {
		const userInfo = req.user;
		if (!userInfo) return handleError(res, 401, "Please Login to view your cards");
		const myCards = await cardService.getMyCards(userInfo._id);
		res.status(200).send(myCards);
	} catch (error) {
		handleError(res, 500, error.message);
	}
});

router.post("/", auth, async (req, res) => {
	try {
		const userInfo = req.user;
		if (!userInfo.isBusiness) return handleError(res, 401, "Only businesses can create cards");
		const validateError = cardValidator(req.body);
		if (validateError !== "") return handleError(res, 400, validateError);
		const normalizedData = await normalizeCard(req.body, userInfo._id);
		const newCard = await cardService.createCard(normalizedData);
		res.status(201).send(newCard);
	} catch (error) {
		handleError(res, 500, error.message);
	}
});

router.put("/:id", auth, async (req, res) => {
	try {
		const userInfo = req.user;
		const cardId = req.params.id;
		const card = await cardService.getCardById(cardId);
		if (card.user_id !== userInfo._id) return handleError(res, 401, "Unauthorized, you can only update your cards");
		const validateError = cardValidator(req.body);
		if (validateError !== "") return handleError(res, 400, validateError);
		const normalizedData = await normalizeCard(req.body, userInfo._id);
		const updatedCard = await cardService.updateCard(cardId, normalizedData);
		res.status(200).send(updatedCard);
	} catch (error) {
		handleError(res, 500, error.message);
	}
});

router.patch("/:id", auth, async (req, res) => {
	try {
		const userInfo = req.user;
		const cardId = req.params.id;
		if (!userInfo) return handleError(res, 401, "Please Login to like a card");
		const patchedCard = await cardService.likeCard(cardId, userInfo._id);
		res.status(200).send(patchedCard);
	} catch (error) {
		handleError(res, 500, error.message);
	}
});

router.delete("/:id", auth, async (req, res) => {
	try {
		const userInfo = req.user;
		const cardId = req.params.id;
		if (!userInfo.isAdmin && userInfo._id !== card.user_id) return handleError(res, 401, "Unauthorized, you can only delete your cards");
		const card = await cardService.deleteCard(cardId);
		res.status(204).send(card);
	} catch (error) {
		handleError(res, 500, error.message);
	}
});

export default router;
