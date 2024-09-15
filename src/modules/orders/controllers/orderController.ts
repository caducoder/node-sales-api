import orderService from "../services/orderService.js";
import { NextFunction, Request, Response } from "express";

async function ListOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const orderList = await orderService.ListOrderService();

    return res.json(orderList);
  } catch (ex: unknown) {
    next(ex);
  }
}

async function ShowOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const order = await orderService.ShowOrderService(id);

    return res.json(order);
  } catch (ex: unknown) {
    next(ex);
  }
}

async function CreateOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const order = await orderService.CreateOrderService(req.body);

    return res.json(order);
  } catch (ex: unknown) {
    next(ex);
  }
}

// async function Updateorder(req: Request, res: Response) {
//   const { id } = req.params;
//   const updatedorder = await orderService.UpdateorderService(
//     id,
//     req.body
//   );

//   return res.json(updatedorder);
// }

// async function DeleteOrder(req: Request, res: Response) {
//   const { id } = req.params;
//   await orderService.DeleteOrderService(id);
//   return res.sendStatus(204);
// }

export default {
  CreateOrder,
  ShowOrder,
  ListOrders,
};
