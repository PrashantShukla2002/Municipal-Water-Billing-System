import React, { useState, useEffect } from 'react';
import { getBills } from "../services/api";

const Dashboard = () => {
  const [bills, setBills] = useState([]);
  const [filters, setFilters] = useState({ status: '', fromDate: '', toDate: '', search: '' });
  const [loading, setLoading] = useState(false);

  const loadBills = async () => {
    setLoading(true);
    try {
      const response = await getBills(filters);
      setBills(response.data || []);  // Assume backend returns array of bills
    } catch (error) {
      // Error handling is done in api.js interceptors
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBills();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Dashboard - All Bills</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-100 rounded-lg">
        <input
          type="text"
          placeholder="Search (Bill # or Name)"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="UNPAID">Unpaid</option>
          <option value="PAID">Paid</option>
          <option value="LINK_SENT">Link Sent</option>
          <option value="CREATED">Created</option>
        </select>
        <input
          type="date"
          value={filters.fromDate}
          onChange={(e) => handleFilterChange('fromDate', e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={filters.toDate}
          onChange={(e) => handleFilterChange('toDate', e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={loadBills}
          disabled={loading}
          className="md:col-span-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Apply Filters'}
        </button>
      </div>

      {/* Bills Table */}
      {loading ? (
        <p className="text-center">Loading bills...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Bill Number</th>
                <th className="px-4 py-2 text-left">Consumer</th>
                <th className="px-4 py-2 text-left">Total Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Due Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bills.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                    No bills found
                  </td>
                </tr>
              ) : (
                bills.map((bill) => (
                  <tr key={bill.id || bill.billNumber} className="border-t">
                    <td className="px-4 py-2">{bill.billNumber}</td>
                    <td className="px-4 py-2">{bill.consumerName}</td>
                    <td className="px-4 py-2">₹{bill.totalAmount?.toFixed(2)}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          bill.status === "PAID"
                            ? "bg-green-200 text-green-800"
                            : bill.status === "LINK_SENT"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {bill.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {new Date(bill.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <a
                        href={`/bill/${bill.billNumber}`}
                        className="text-blue-500 hover:underline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
