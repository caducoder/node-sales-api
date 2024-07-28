import customerService from "../services/customersService.js";
import { NextFunction, Request, Response } from "express";

async function ListCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    const customerList = await customerService.ListCustomerService();

    return res.json(customerList);
  } catch (ex: unknown) {
    next(ex);
  }
}

async function CreateCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    const createdCustomer = await customerService.CreateCustomerService(
      req.body
    );

    return res.json(createdCustomer);
  } catch (ex: unknown) {
    next(ex);
  }
}

async function RemoveCustomer(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    await customerService.RemoveCustomerService(Number(id));

    return res.sendStatus(204);
  } catch (ex: unknown) {
    next(ex);
  }
}

export default {
  ListCustomer,
  CreateCustomer,
  RemoveCustomer,
};
