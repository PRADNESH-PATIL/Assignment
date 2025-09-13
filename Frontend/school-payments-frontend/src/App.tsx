
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from "react-router-dom";
import TransactionsTable from "./components/TransactionsTable";
import TransactionsBySchoolPage from "./pages/TransactionsBySchoolPage"; // updated
import StatusCheck from "./pages/StatusCheck"; // make sure you have this page

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="bg-white p-4 shadow-md">
        <ul className="flex gap-6 text-gray-800 font-medium">
          <li>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors duration-300 ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              Transactions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/school-transactions"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors duration-300 ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              School Transactions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/status-check"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors duration-300 ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              Status Check
            </NavLink>
          </li>
        </ul>
      </nav>


      {/* Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/transactions" />} />
        <Route path="/transactions" element={<TransactionsTable />} />
        <Route path="/school-transactions" element={<TransactionsBySchoolPage />} />
        <Route path="/status-check" element={<StatusCheck />} />
      </Routes>


    </Router>
  );
}

export default App;
