import { Request, Response, NextFunction } from "express";
import { createStoreAction, deleteStoreAction, getStoreByIDAction, getStoresAction, updateStoreAction } from "../actions/store.action";

const getStoresController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // const filters = req.query;
    const data = await getStoresAction();

    res.status(200).json({
      message: "Get stores success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const getStoreByIDController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await getStoreByIDAction(id);

    res.status(200).json({
      message: "Get store success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const createStoreController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const params = req.body;

    const data = await createStoreAction({
      ...params,
      subdistrictId: Number(params.subdistrictId),
      cityId: Number(params.cityId),
      provinceId: Number(params.provinceId),
    });

    res.status(200).json({
      message: "Create store success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const updateStoreController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const params = req.body;

    const data = await updateStoreAction(id, {
      ...params,
      subdistrictId: Number(params.subdistrictId),
      cityId: Number(params.cityId),
      provinceId: Number(params.provinceId),
    });

    res.status(200).json({
      message: "Update store success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const deleteStoreController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await deleteStoreAction(id);

    res.status(200).json({
      message: "Delete store success",
      data
    });
  } catch (err) {
    next(err);
  }
}

export {
  getStoresController,
  getStoreByIDController,
  createStoreController,
  updateStoreController,
  deleteStoreController,
}
