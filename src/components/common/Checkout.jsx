import { CheckoutForm } from "./CheckoutForm";
import Layout from "./Layout";
import { STRIPE_KEY } from "./Http";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe(STRIPE_KEY);
export const Checkout = () => {
  return (
    <Layout>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Layout>
  );
};

