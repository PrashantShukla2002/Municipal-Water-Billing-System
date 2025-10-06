import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getBill } from '../services/api';
import { CheckCircleIcon } from '@heroicons/react/24/solid'; // Install Heroicons

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);
  const billNumber = searchParams.get('bill');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBill = async () => {
      if (!billNumber) return navigate('/');
      setLoading(true);
      try {
        const response = await getBill(billNumber);
        setBill(response.data);
      } catch (error) {
        console.error('Bill load error:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBill();
  }, [billNumber, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center">
        <p className="text-xl">Loading payment confirmation...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center py-8">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-xl ring-1 ring-green-200 text-center animate-fadeIn">
        <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-extrabold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-lg mb-6">Thank you for your payment.</p>
        {bill && (
          <>
            <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
              <div className="font-semibold text-gray-600">Bill Number: <span className="text-green-700">{bill.billNumber}</span></div>
              <div className="font-semibold text-gray-600">Amount Paid: <span className="text-green-700">₹{bill.amount}</span></div>
            </div>
          </>
        )}
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
