import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

const TransactionTable = ({ role }) => {
  const [search, setSearch] = useState("");

  // 🔽 Filters
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // 🔽 Dropdown states
  const [openType, setOpenType] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  // 🔽 Data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Mock API
  useEffect(() => {
    setTimeout(() => {
      const fakeAPI = [
        {
          id: 1,
          date: "2026-04-01",
          amount: 2000,
          category: "Salary",
          type: "income",
        },
        {
          id: 2,
          date: "2026-04-02",
          amount: 500,
          category: "Food",
          type: "expense",
        },
        {
          id: 3,
          date: "2026-04-03",
          amount: 800,
          category: "Travel",
          type: "expense",
        },
        {
          id: 4,
          date: "2026-04-04",
          amount: 3000,
          category: "Freelance",
          type: "income",
        },
      ];

      setData(fakeAPI);
      setLoading(false);
    }, 800);
  }, []);

  // 💾 LocalStorage Save
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("transactions", JSON.stringify(data));
    }
  }, [data, loading]);

  // 🔍 Filter Logic
  const filtered = data.filter((t) => {
    const matchSearch = t.category.toLowerCase().includes(search.toLowerCase());

    const matchType = typeFilter === "all" || t.type === typeFilter;

    const matchCategory =
      categoryFilter === "all" || t.category === categoryFilter;

    return matchSearch && matchType && matchCategory;
  });

  // ❌ Delete
  const handleDelete = (id) => {
    setData(data.filter((t) => t.id !== id));
  };

  // ✏️ Edit
  const handleEdit = (id) => {
    const newAmount = prompt("Enter new amount:");
    if (!newAmount) return;

    setData(
      data.map((t) => (t.id === id ? { ...t, amount: Number(newAmount) } : t)),
    );
  };

  // 📤 Export
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.json";
    a.click();
  };

  // 💡 Insights
  const highest = data.length
    ? data.reduce((max, t) => (t.amount > max.amount ? t : max))
    : null;

  const totalExpense = data
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // 🔒 Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".dropdown")) {
        setOpenType(false);
        setOpenCategory(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="bg-white/5 backdrop-blur-lg p-5 rounded-2xl border border-white/10 mt-10 text-white shadow-lg shadow-green-500/10">
      <h3 className="text-lg font-semibold mb-4 text-gray-300">Transactions</h3>

      {/* Admin Buttons */}
      {role === "admin" && (
        <div className="flex gap-3 mb-4">
          <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-sm">
            + Add Transaction
          </button>

          <button
            onClick={handleExport}
            className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md text-sm"
          >
            Export JSON
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search category..."
          className="bg-white/5 border border-white/10 text-white p-2 rounded-md w-full md:w-1/3"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Type Dropdown */}
        <div className="relative dropdown w-full md:w-1/4">
          <button
            onClick={() => setOpenType(!openType)}
            className="w-full bg-white/5 border border-white/10 p-2 rounded-md text-left"
          >
            {typeFilter === "all"
              ? "All Type"
              : typeFilter === "income"
                ? "Income"
                : "Expense"}
          </button>

          {openType && (
            <div className="absolute w-full bg-black border border-white/10 mt-1 rounded-md z-10">
              {["all", "income", "expense"].map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setTypeFilter(item);
                    setOpenType(false);
                  }}
                  className="p-2 hover:bg-white/10 cursor-pointer"
                >
                  {item === "all"
                    ? "All Type"
                    : item === "income"
                      ? "Income"
                      : "Expense"}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="relative dropdown w-full md:w-1/4">
          <button
            onClick={() => setOpenCategory(!openCategory)}
            className="w-full bg-white/5 border border-white/10 p-2 rounded-md text-left"
          >
            {categoryFilter === "all" ? "All Category" : categoryFilter}
          </button>

          {openCategory && (
            <div className="absolute w-full bg-black border border-white/10 mt-1 rounded-md z-10">
              {["all", "Food", "Travel", "Salary", "Freelance"].map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setCategoryFilter(item);
                    setOpenCategory(false);
                  }}
                  className="p-2 hover:bg-white/10 cursor-pointer"
                >
                  {item === "all" ? "All Category" : item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <table className="w-full text-left text-gray-300">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-white/10">
              <th className="py-2">Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              {role === "admin" && <th className="text-center">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {filtered.map((t) => (
              <motion.tr
                key={t.id}
                whileHover={{ scale: 1.01 }}
                className="border-b border-white/10 hover:bg-white/10 transition duration-200"
              >
                <td className="py-2">{t.date}</td>
                <td>₹ {t.amount}</td>
                <td>{t.category}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      t.type === "income" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {t.type}
                  </span>
                </td>

                {role === "admin" && (
                  <td>
                    <div className="flex items-center justify-center gap-3">
                      {/* Edit */}
                      <button
                        onClick={() => handleEdit(t.id)}
                        title="Edit"
                        className="p-2 rounded-lg hover:bg-blue-500/20 transition"
                      >
                        <Pencil size={18} className="text-blue-400" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(t.id)}
                        title="Delete"
                        className="p-2 rounded-lg hover:bg-red-500/20 transition"
                      >
                        <Trash2 size={18} className="text-red-400" />
                      </button>
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Insights */}
     {/* Insights */}
<div className="bg-white/5 border border-white/10 rounded-xl p-5 mt-6">
  <h2 className="text-lg font-semibold mb-3 text-white">
    Insights
  </h2>

  <div className="text-sm text-gray-300 space-y-2">
    
    {highest && (
      <p>
        🔹 Highest transaction: {highest.category} (₹ {highest.amount})
      </p>
    )}

    <p>
      🔹 Total expenses: ₹ {totalExpense}
    </p>

    <p>
      🔹 Expenses are controlled compared to income 
    </p>

  </div>
</div>
    </div>
  );
};

export default TransactionTable;
