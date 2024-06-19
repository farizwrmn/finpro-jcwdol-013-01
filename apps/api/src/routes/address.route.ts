import express from "express";
import { createAddressController, deleteAddressController, getAddressByIDController, getAddressesController, updateAddressController } from "../controllers/address.controller";
import { verifyToken } from "@/middlewares/auth.middleware";

const router = express.Router();

router.get("/", getAddressesController);
router.get("/:id", getAddressByIDController);
router.post("/", verifyToken, createAddressController);
router.patch("/:id", verifyToken, updateAddressController);
router.delete("/:id", verifyToken, deleteAddressController);

export default router;