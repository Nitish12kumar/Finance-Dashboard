import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SummaryCard from "./components/SummaryCard";
import CustomLineChart from "./components/Charts/LineChart";
import CustomPieChart from "./components/Charts/PieChart";
import TransactionTable from "./components/TransactionTable";

const App = () => {
  const [role, setRole] = useState("viewer");

  const cardsdata = [
  {
    title: "Total Balance",
    amount: "5000",
    icon: "💰",
    bg: "bg-gradient-to-r from-green-400 to-emerald-600",
  },
  {
    title: "Income",
    amount: "7000",
    icon: "📈",
    bg:"bg-gradient-to-r from-blue-400 to-indigo-600",
  },
  {
    title: "Expenses",
    amount: "2000",
    icon: "📉",
    bg: "bg-gradient-to-r from-pink-400 to-red-500",
  },
];

  return (
   <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 p-4">
    <div className="bg-black/80 backdrop-blur-xl rounded-3xl p-6">
      <Navbar role={role} setRole={setRole} />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-semibold text-green-400 mb-6">
          Dashboard
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cardsdata.map((elem, index) => (
            <SummaryCard
            key={index}
            title={elem.title}
            amount={elem.amount}
            bg={elem.bg}
            icon={elem.icon}
            />
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <CustomLineChart />
          <CustomPieChart />
        </div>

        {/* Table */}
        <TransactionTable role={role} />
          </div>
      </div>
    </div>
  );
};

export default App;