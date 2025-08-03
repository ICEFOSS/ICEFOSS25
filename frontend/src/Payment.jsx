// PaymentPage.js
import React from 'react';
import './Register.css';
import { ArrowLeft } from 'lucide-react';

const Payment = ({ setCurrentStep }) => {
  return (
    <div className="min-h-screen bg-[#0a191e] p-8 text-white flex flex-col items-center justify-center">
      <button onClick={() => setCurrentStep('hackathon')} className="absolute top-8 left-8 flex items-center text-gray-300 hover:text-white">
        <ArrowLeft className="w-5 h-5 mr-1" />
        Back
      </button>

      <h2 className="text-3xl font-bold mb-4">Complete Your Payment</h2>
      <p className="mb-4 text-gray-400 text-center max-w-lg">
        Please scan the QR code below to pay, or follow the link provided. Once the payment is successful, click the button below to proceed.
      </p>

      {/* Replace with your real payment QR or UPI or Razorpay button */}
      <img src="/payment-qr.png" alt="QR Code" className="w-64 h-64 mb-6 border border-gray-500 rounded-lg" />

      <button
        onClick={() => setCurrentStep('submit')}
        className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl transition-all duration-300"
      >
        I've Paid, Proceed
      </button>
    </div>
  );
};

export default Payment;
