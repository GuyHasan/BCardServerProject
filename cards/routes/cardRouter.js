import express from "express";
import cardService from "../services/cardServices";
import { handleError } from "../utils/errorHandler";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const cards = await cardService.getCards();
		res.status(200).json(cards);
	} catch (error) {
		handleError(res, 500, error.message);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const card = await cardService.getCardById(req.params.id);
		res.status(200).json(card);
	} catch (error) {
		handleError(res, 500, error.message);
	}
});

router.get("/my-cards", async (req, res) => {
	try {
		const myCards = await cardService.getMyCards(req.user.id);
		res.status(200).json(myCards);
	} catch (error) {
		handleError(res, 500, error.message);
	}
});

router.post("/", async (req, res) => {
	try {
		const newCard = await cardService.createCard(req.body);
		res.status(201).json(newCard);
	} catch (error) {
		handleError(res, 500, error.message);
	}
});

router.put("/:id", async (req, res) => {
	try {
		const updatedCard = await cardService.updateCard(req.params.id, req.body);
		res.status(200).json(updatedCard);
	} catch (error) {
		handleError(res, 500, error.message);
	}
});

router.patch("/:id", async (req, res) => {
	try {
		const patchedCard = await cardService.patchCard(req.params.id, req.body);
		res.status(200).json(patchedCard);
	} catch (error) {
		handleError(res, 500, error.message);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		await cardService.deleteCard(req.params.id);
		res.status(204).send();
	} catch (error) {
		handleError(res, 500, error.message);
	}
});

export default router;
