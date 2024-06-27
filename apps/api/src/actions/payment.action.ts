import { IPayment } from "@/interfaces/payment.interface";
import { getOrderByIDQuery } from "@/queries/order.query";
import { createMidtransTransactionQuery, createXenditInvoiceQuery, updatePaymentStatusQuery } from "@/queries/payment.query";
import { Order } from "@prisma/client";

const createPaymentAction = async (orderId: string) => {
  try {
    let result: any = {};
    let url: string;

    const order = await getOrderByIDQuery(orderId);
    if (!order?.id) throw new Error("Order not found");

    if (order.paymentMethod === "BANK") {
      url = "/users/orders/confirmation/" + order.id;
    } else if (order.paymentMethod === "GOPAY") {
      result = await createMidtransTransactionQuery(order);
      url = result.redirectURL
    } else {
      result = await createXenditInvoiceQuery(order)
      url = result.invoice_url
    }

    return { url };
  } catch (err) {
    throw err;
  }
};

const updatePaymentStatusAction = async (
  id: string,
  paymentStatus: string
): Promise<Order> => {
  try {
    const order = await updatePaymentStatusQuery(id, paymentStatus);
    return order;
  } catch (err) {
    throw err;
  }
}

export {
  createPaymentAction,
  updatePaymentStatusAction,
};
