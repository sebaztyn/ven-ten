import express from "express";
import carRoutes from "./cars.route.js";

const router = express.Router();

router.use("/cars", carRoutes);

export default router;
