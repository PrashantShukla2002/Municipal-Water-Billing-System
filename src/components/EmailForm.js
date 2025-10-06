import React, { useState } from 'react';
import { sendEmail } from "../services/api";

const EmailForm = ({ bill, paymentLink }) => {
  const [toEmail, setToEmail] = useState(bill.email || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paymentLink) return alert('Create payment link first');
    if (!toEmail.trim()) return alert('Enter email');
    setLoading(true);
    try {
      await sendEmail(bill.billNumber, toEmail);
      alert('Email sent successfully! Check MailHog at http://localhost:8025');
    } catch (error) {
      // Handled in api.js interceptors
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Send Payment Link Email</h3>
      <input
        type="email"
        placeholder="To Email (default: bill email)"
        value={toEmail}
        onChange={(e) => setToEmail(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        disabled={loading || !paymentLink}
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Email'}
      </button>
      {!paymentLink && <p className="text-red-500 text-sm mt-2">Create payment link first</p>}
    </form>
  );
};

export default EmailForm;
