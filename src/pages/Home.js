import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BillSearch from '../components/BillSearch';

const Home = () => {
  const [fetchedBill, setFetchedBill] = useState(null);
  const navigate = useNavigate();

  const handleBillFetched = (bill) => {
    setFetchedBill(bill);
    // Navigate to bill page after fetch
    navigate(`/bill/${bill.billNumber}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          Municipal Water Bill Payment System
        </h1>
        <p className="text-center text-lg mb-8 text-gray-600">
          Search for a bill by number to view details, create payment links, and send emails.
        </p>
        <BillSearch onBillFetched={handleBillFetched} />
        {fetchedBill && (
          <div className="mt-4 text-center">
            <p className="text-green-600">Bill {fetchedBill.billNumber} fetched successfully! Redirecting...</p>
          </div>
        )}
        <div className="mt-8 text-center">
          <a href="/dashboard" className="text-blue-500 hover:underline">
            Or go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;