import express from "express";
import CarsController from "../controllers/index.js";

const router = express.Router();

/* GET Cars listing. */
router.get("/", CarsController.getCarsData);

export default router;
