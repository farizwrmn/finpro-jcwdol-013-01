export interface IPayment {
  orderId: string;
}

export interface IPaymentStatus {
  orderId: string;
  paymentStatus: string;
}