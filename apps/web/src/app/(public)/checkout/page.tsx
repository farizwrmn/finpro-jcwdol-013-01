import AuthCustomer from "@/components/auth/AuthCustomer";
import Checkout from '@/components/checkout/Checkout';

const page = () => {
  return (
    <AuthCustomer>
      <Checkout />
    </AuthCustomer>
  );
};

export default page;
