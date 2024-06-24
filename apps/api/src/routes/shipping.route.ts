import { getCitiesController, getCouriersController, getProvincesController, getSubdistrictsController } from "@/controllers/shipping.controller";
import express from "express";

const router = express.Router();

router.get("/provinces", getProvincesController);
router.get("/cities", getCitiesController);
router.get("/subdistricts", getSubdistrictsController);
router.get("/couriers", getCouriersController);

export default router;