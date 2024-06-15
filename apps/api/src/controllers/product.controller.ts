import { Request, Response, NextFunction } from "express";
import { createProductAction, deleteProductAction, getProductByIDAction, getProductsAction, updateProductAction } from "../actions/product.action";

const getProductsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filters = req.query;
    const data = await getProductsAction(filters);

    res.status(200).json({
      message: "Get products success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const getProductByIDController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await getProductByIDAction(id);

    res.status(200).json({
      message: "Get product success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const createProductController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const params = req.body;
    const data = await createProductAction({
      ...params,
      slicedPrice: Number(params.slicedPrice),
      sellingPrice: Number(params.sellingPrice),
    });

    res.status(200).json({
      message: "Create product success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const updateProductController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const params = req.body;
    const data = await updateProductAction(id, {
      ...params,
      slicedPrice: Number(params.slicedPrice),
      sellingPrice: Number(params.sellingPrice),
    });

    res.status(200).json({
      message: "Update product success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const deleteProductController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await deleteProductAction(id);

    res.status(200).json({
      message: "Delete product success",
      data
    });
  } catch (err) {
    next(err);
  }
}

export {
  getProductsController,
  getProductByIDController,
  createProductController,
  updateProductController,
  deleteProductController,
}
