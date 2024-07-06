import { getOrderByIDQuery } from "@/queries/order.query";
import { confirmPaymentQuery, createMidtransTransactionQuery, createXenditInvoiceQuery, updatePaymentStatusQuery } from "@/queries/payment.query";
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
  orderId: string,
  orderStatus: string
): Promise<Order> => {
  try {
    const order = await updatePaymentStatusQuery(orderId, orderStatus);
    return order;
  } catch (err) {
    throw err;
  }
}

const confirmPaymentAction = async (
  orderId: string,
  paymentImage: string
): Promise<Order> => {
  try {
    if (!paymentImage) throw new Error('Please upload payment proof');

    const order = await confirmPaymentQuery(orderId, paymentImage);
    return order;
  } catch (err) {
    throw err;
  }
}

export {
  createPaymentAction,
  updatePaymentStatusAction,
  confirmPaymentAction,
};
