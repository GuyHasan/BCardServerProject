import express from "express";
import cardService from "../services/cardServices";

const router = express.Router();

router.get("/", (req, res) => {});
router.get("/:id", (req, res) => {});
router.get("/my-cards", (req, res) => {});
router.post("/", (req, res) => {});
router.put("/:id", (req, res) => {});
router.patch("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

export default router;
