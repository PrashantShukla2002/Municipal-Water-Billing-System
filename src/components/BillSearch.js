import React, { useState } from "react";
import { fetchBill } from "../services/api";

function BillSearch() {
  const [billNumber, setBillNumber] = useState("");
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!billNumber.trim()) {
      setError("Please enter a valid Bill Number.");
      return;
    }

    setLoading(true);
    setError("");
    setBill(null);

    try {
      const response = await fetchBill(billNumber);
      setBill(response.data);
    } catch (err) {
      setBill(null);
      setError("Failed to fetch bill. Please try again.");
      // API interceptor in api.js will also alert the actual error.
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3 text-center">Search Your Bill</h2>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Enter Bill Number"
          value={billNumber}
          onChange={(e) => setBillNumber(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          onClick={handleFetch}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Loading..." : "Fetch Bill"}
        </button>
      </div>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      {bill && (
        <div className="bg-gray-50 p-3 rounded border">
          <h3 className="text-lg font-semibold mb-2">Bill Details</h3>
          <p><strong>Name:</strong> {bill.consumerName}</p>
          <p><strong>Email:</strong> {bill.email}</p>
          <p><strong>Address:</strong> {bill.address}</p>
          <p><strong>Total Amount:</strong> ₹{bill.totalAmount}</p>
          <p><strong>Status:</strong> {bill.status}</p>
        </div>
      )}
    </div>
  );
}

export default BillSearch;
