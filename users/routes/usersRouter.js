import express from "express";

const router = express.Router();

router.post("/", (req, res) => {});
router.post("/login", (req, res) => {});
router.get("/", (req, res) => {});
router.get("/:id", (req, res) => {});
router.put("/:id", (req, res) => {});
router.patch("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

export default router;
