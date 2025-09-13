import React, { useEffect, useState } from "react";
import axios from "axios";

interface Transaction {
  _id: string;
  order_id: string;
  transaction_amount: number;
  payment_mode: string;
  status: string;
  payment_time: string | null;
}

const TransactionsBySchool: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10; // adjust as needed

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OGM1OTE2N2VhZTBlNTk0NmIwNmZjZjIiLCJyb2xlIjoic2Nob29sX3VzZXIiLCJpYXQiOjE3NTc3NzgyOTksImV4cCI6MTc1Nzc4MTg5OX0.A5FAMifsqfIkYNFcqJLwKxKr3rZWRhG4EkuEgoSsqKk";

        const response = await axios.get("/api/transactions", {
          headers: { Authorization: `Bearer ${token}` },
          params: { page, limit },
        });

        console.log("Full response:", response.data); // <--- check structure here

        // Use safe fallback in case response structure differs
        const dataArray = Array.isArray(response.data.data)
          ? response.data.data
          : Array.isArray(response.data)
          ? response.data
          : [];

        const normalized = dataArray.map((tx: any) => ({
          _id: tx._id?.$oid ?? tx._id ?? "N/A",
          order_id: tx.custom_order_id ?? "N/A",
          transaction_amount: tx.transaction_amount ?? 0,
          payment_mode: tx.gateway ?? "N/A",
          status: tx.status ?? "created",
          payment_time: tx.payment_time ?? null,
        }));

        setTransactions(normalized);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]); // clear table on error
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [page]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">#</th>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Payment Mode</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Payment Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => {
              const statusLower = (tx.status ?? "").toLowerCase();
              return (
                <tr
                  key={tx._id}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50`}
                >
                  <td className="border p-2">{(page - 1) * limit + index + 1}</td>
                  <td className="border p-2">{tx.order_id}</td>
                  <td className="border p-2">{tx.transaction_amount}</td>
                  <td className="border p-2">{tx.payment_mode}</td>
                  <td
                    className={`border p-2 font-medium ${
                      statusLower === "paid" ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {statusLower === "paid" ? "Paid" : "Pending"}
                  </td>
                  <td className="border p-2">
                    {tx.payment_time
                      ? new Date(tx.payment_time).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {/* Pagination controls (simplified) */}
      <div className="mt-4 flex justify-between">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsBySchool;
