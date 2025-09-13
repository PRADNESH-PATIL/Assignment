import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left side - Links */}
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-lg font-semibold">
            School Payments
          </Link>
          <Link to="/transactions" className="text-sm text-slate-500 hover:text-slate-700">
            Transactions
          </Link>
          <Link to="/school-transactions" className="text-sm text-slate-500 hover:text-slate-700">
            By School
          </Link>
          <Link to="/status-check" className="text-sm text-slate-500 hover:text-slate-700">
            Status Check
          </Link>
        </div>

        {/* Right side - Auth buttons */}
        <div className="flex items-center gap-3">
          {token ? (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
                window.location.reload();
              }}
              className="px-3 py-1 border rounded text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                const t = prompt("Paste JWT token for testing:");
                if (t) {
                  localStorage.setItem("token", t);
                  window.location.reload();
                }
              }}
              className="px-3 py-1 border rounded text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              Set Token (dev)
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
