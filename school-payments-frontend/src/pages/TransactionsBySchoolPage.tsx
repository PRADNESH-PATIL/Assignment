"use client";
import { useState } from "react";

type Transaction = {
  id: string;
  student: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  date: string;
  school: string;
};

const dummyTransactions: Transaction[] = [
  { id: "TXN001", student: "Aarav Sharma", amount: 5000, status: "paid", date: "2025-09-01", school: "Delhi Public School" },
  { id: "TXN002", student: "Priya Mehta", amount: 4000, status: "pending", date: "2025-09-02", school: "St. Xavier's" },
  { id: "TXN003", student: "Rahul Kumar", amount: 3000, status: "failed", date: "2025-09-03", school: "Delhi Public School" },
  { id: "TXN004", student: "Simran Kaur", amount: 4500, status: "paid", date: "2025-09-04", school: "DAV School" },
  { id: "TXN005", student: "Ananya Gupta", amount: 6000, status: "paid", date: "2025-09-05", school: "St. Xavier's" },
];

const schools = ["Delhi Public School", "St. Xavier's", "DAV School"];

export default function TransactionsBySchoolPage() {
  const [selectedSchool, setSelectedSchool] = useState<string>("");

  const filteredTransactions = selectedSchool
    ? dummyTransactions.filter((t) => t.school === selectedSchool)
    : dummyTransactions;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Transactions by School</h1>

      {/* School Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select School</label>
        <select
          value={selectedSchool}
          onChange={(e) => setSelectedSchool(e.target.value)}
          className="p-2 border rounded-md w-full md:w-1/3 bg-white"
        >
          <option value="">All Schools</option>
          {schools.map((school) => (
            <option key={school} value={school}>
              {school}
            </option>
          ))}
        </select>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Transaction ID</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((txn) => (
              <tr key={txn.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{txn.id}</td>
                <td className="px-4 py-3">{txn.student}</td>
                <td className="px-4 py-3">₹{txn.amount}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      txn.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : txn.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {txn.status}
                  </span>
                </td>
                <td className="px-4 py-3">{txn.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTransactions.length === 0 && (
          <p className="text-center py-6 text-gray-500">No transactions found for this school.</p>
        )}
      </div>
    </div>
  );
}
