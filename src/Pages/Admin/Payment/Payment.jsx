import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";
import useUser from "../../../Hooks/useUser";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
const Payment = () => {
 const [users] = useUser()
 console.log(users);

  return (
    <div>
      <div className=" text-center mt-12 space-y-4">
        <h2 className="text-3xl font-bold">Welcome Future Admin</h2>
        <p>
          Pay for Admin Access Once payment is completed you will become an
          admin
        </p>
      </div>
      
      <div>
        <Elements stripe={stripePromise}>
          <CheckOut />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
