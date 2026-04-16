// frontend/src/components/RazorpayPayment.jsx
import { useNavigate } from 'react-router-dom';
import { createPaymentOrder, verifyPayment } from '../services/paymentApi';

export default function RazorpayPayment({ amount, orderId, onSuccess, onFailure }) {
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Check your internet connection.');
      return;
    }

    const order = await createPaymentOrder(amount);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.data.amount,
      currency: order.data.currency,
      name: 'Jharkhand Tourism',
      description: 'Payment for your booking',
      order_id: order.data.id,
      handler: async (response) => {
        const verifyData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          orderId: orderId
        };
        const result = await verifyPayment(verifyData);
        if (result.success) {
          onSuccess?.(result);
          navigate('/payment-success');
        } else {
          onFailure?.(result);
        }
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#FF6B35'
      }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button onClick={handlePayment} className="w-full bg-accent text-white py-3 rounded-lg font-semibold">
      Pay ₹{amount}
    </button>
  );
}