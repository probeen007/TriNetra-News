import express from "express";
import { getMarketData } from "../controllers/marketController.js";
const router = express.Router();

router.get("/all", getMarketData);

export default router;
