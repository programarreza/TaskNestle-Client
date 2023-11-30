import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useUser from "../../../Hooks/useUser";
import Container from "../../../components/shared/Container/Container";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosSecure = useAxiosSecure();
  const [users, refetch] = useUser();
  const price = users?.package;
  const navigate = useNavigate();
 

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment  error", error);
      setError(error);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
      toast.error(confirmError);
    } else {
      console.log("payment intent 65", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // save the payment
        const payment = {
          email: user?.email,
          price,
          transactionId: paymentIntent.id,
          date: new Date(),
          status: "successfully",
          role: users?.role,
          limit: parseInt(price),
        };
        console.log(payment);

        const res = await axiosSecure.post("/payments", payment);
        console.log(res.data);
        refetch();
        toast.success("Payment Successfully ");
        navigate("/");
      }
    }
  };

  return (
    <Container>
      <div className="my-24">
        <form
          onSubmit={handleSubmit}
          className="max-w-[500px] mx-auto shadow-xl  p-12"
        >
          <h2 className="text-center text-2xl font-bold mb-12">Payment Now</h2>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                    border: "#000",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className="btn btn-primary btn-sm my-5"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay Now
          </button>
          <p className="text-red-600">{error.message}</p>
          {transactionId && (
            <p className="text-green-600">
              {" "}
              Your transaction id: {transactionId}
            </p>
          )}
        </form>
      </div>
    </Container>
  );
};

export default CheckOut;
