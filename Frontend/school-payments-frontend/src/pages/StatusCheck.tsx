import React, { useState } from "react";
import api from "../services/api";

export default function StatusCheck() {
  const [id, setId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function check() {
    setLoading(true);
    try {
      const res = await api.get(`/transaction-status/${encodeURIComponent(id)}`);
      setResult(res.data);
    } catch (err: any) {
      setResult({ error: err?.response?.data || err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Transaction Status Check</h2>
      <div className="flex gap-2 items-center">
        <input className="px-2 py-1 border rounded" value={id} onChange={(e)=>setId(e.target.value)} placeholder="custom_order_id" />
        <button onClick={check} className="px-3 py-1 bg-indigo-600 text-white rounded" disabled={!id || loading}>
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      <pre className="mt-4 bg-slate-100 dark:bg-slate-800 p-4 rounded">
        {result ? JSON.stringify(result, null, 2) : "No result"}
      </pre>
    </div>
  );
}
