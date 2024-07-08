import { confirmShippingOrderAction } from '@/actions/order.action';
import cron from 'node-cron';

export const scheduleTask = () => {
  cron.schedule('*/5 * * * * *', async () => {
    await confirmShippingOrderAction();
    console.log('Confirm Shipping Orders running');
  });
};
