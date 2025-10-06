import React from 'react';

const BillDetails = ({ bill }) => {
  if (!bill) return null;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Bill Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><strong>Bill Number:</strong> {bill.billNumber}</div>
        <div><strong>Consumer Name:</strong> {bill.consumerName}</div>
        <div><strong>Email:</strong> {bill.email}</div>
        <div><strong>Address:</strong> {bill.address}</div>
        <div><strong>Service Period:</strong> {bill.servicePeriodStart} to {bill.servicePeriodEnd}</div>
        <div><strong>Due Date:</strong> {new Date(bill.dueDate).toLocaleDateString()}</div>
        <div><strong>Base Amount:</strong> ₹{bill.baseAmount?.toFixed(2)}</div>
        <div><strong>Penalty:</strong> ₹{bill.penaltyAmount?.toFixed(2)}</div>
        <div className="col-span-2"><strong>Total Amount:</strong> ₹{bill.totalAmount?.toFixed(2)}</div>
        <div className="col-span-2"><strong>Status:</strong> <span className={`px-2 py-1 rounded text-sm ${bill.status === 'PAID' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>{bill.status}</span></div>
      </div>
    </div>
  );
};

export default BillDetails;