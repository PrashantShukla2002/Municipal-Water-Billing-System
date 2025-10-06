import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BillDetails from '../components/BillDetails';
import PaymentLink from '../components/PaymentLink';
import EmailForm from '../components/EmailForm';
import { getBill } from "../services/api";

const BillPage = () => {
  const { billNumber } = useParams();
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);
  const [paymentLink, setPaymentLink] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBill = async () => {
      if (!billNumber) return navigate('/');
      setLoading(true);
      try {
        const response = await getBill(billNumber);
        setBill(response.data);  // Assume backend returns bill object
      } catch (error) {
        // Error handled in api.js; fallback to fetch if not found
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    loadBill();
  }, [billNumber, navigate]);

  const handleLinkCreated = (link) => {
    setPaymentLink(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl">Loading bill {billNumber}...</p>
      </div>
    );
  }

  if (!bill) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-red-500">Bill {billNumber} not found. <a href="/" className="underline">Go Home</a></p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Bill: {bill.billNumber}</h1>
          <a href="/" className="text-blue-500 hover:underline">← Back to Home</a>
        </div>
        
        {/* Bill Details */}
        <BillDetails bill={bill} />
        
        {/* Payment Link */}
        {bill.status !== 'PAID' && (
          <PaymentLink bill={bill} onLinkCreated={handleLinkCreated} />
        )}
        
        {/* Email Form (only if link created) */}
        {paymentLink && (
          <EmailForm bill={bill} paymentLink={paymentLink} />
        )}
        
        {/* Status Message */}
        {bill.status === 'PAID' && (
          <div className="text-center p-6 bg-green-100 rounded-lg">
            <h3 className="text-xl font-bold text-green-800">Bill Already Paid!</h3>
            <p className="text-green-600">No further action needed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillPage;