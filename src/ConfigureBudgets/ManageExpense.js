// ManageExpenses.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

function ManageExpense() {
  // const { isLoggedIn } = useAuth();
  const [monthlyBudget, setmonthlyBudget] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({
    categories: [],
  });
  const [expense, setExpenseAmount] = useState("");
  const [month, setmonth] = useState({
    monthlyBudget: [
      "January",
      "February",
      "March",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  });
  const [expenseAdded, setExpenseAdded] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setmonthlyBudget(month.monthlyBudget);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const userData = localStorage.getItem("userData");
        const token = localStorage.getItem("token");

        const categoriesResponse = await axios.get(
          `http://localhost:4000/get-categories/${userData}?month=${selectedMonth}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(
          "GOT USER CATEGORIES FOR SELECTED MONTH",
          categoriesResponse
        );
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (selectedMonth) {
      fetchCategories();
    } else {
      setCategories([]);
    }
  }, [selectedMonth]);

  const handleAddExpense = async () => {
    try {
      console.log("Hello There");
      const userData = localStorage.getItem("userData");

      const token = localStorage.getItem("token");
      if (!selectedMonth && !selectedCategory && !expense) {
        console.error("Month, category, and expense amount are required");
        return;
      }
      await axios.post(
        "http://localhost:4000/add-expense",
        {
          userData: userData,
          month: selectedMonth,
          category: selectedCategory,
          expense: parseFloat(expense),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Expense added successfully!");
      setExpenseAdded(true);
      setError("");
      setSelectedMonth("");
      setSelectedCategory("");
      setExpenseAmount("");
    } catch (error) {
      setExpenseAdded(false);
      setSelectedMonth("");
      setSelectedCategory("");
      setExpenseAmount("");
      setError("Error adding expense. Please try again.");
      console.error("Error adding expense:", error);
    }
  };
  const handleBack = () => {
    window.history.back();
  };

  return (
    <main className="center" id="main" aria-label="main">
      <div
        style={{
          width: "300px",
          margin: "auto",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            fontSize: "20px",
            textAlign: "center",
          }}
        >
          Manage Expenses
        </h2>

        <label htmlFor="month" style={{ display: "block", margin: "10px 0" }}>
          Month:
        </label>
        <select
          id="month"
          onChange={(e) => setSelectedMonth(e.target.value)}
          value={selectedMonth}
          style={{
            width: "100%",
            padding: "8px",
            boxSizing: "border-box",
            marginBottom: "15px",
          }}
        >
          <option value="">Select Month</option>
          {monthlyBudget.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <label
          htmlFor="category"
          style={{ display: "block", margin: "10px 0" }}
        >
          Category:
        </label>
        <select
          id="category"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          style={{
            width: "100%",
            padding: "8px",
            boxSizing: "border-box",
            marginBottom: "15px",
          }}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label
          htmlFor="expenseAmount"
          style={{ display: "block", margin: "10px 0" }}
        >
          Expense Amount:
        </label>
        <input
          type="number"
          id="expenseAmount"
          value={expense}
          onChange={(e) => setExpenseAmount(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            boxSizing: "border-box",
            marginBottom: "15px",
          }}
        />

        {expenseAdded && (
          <p style={{ textAlign: "center", marginBottom: "15px" }}>
            Expense added successfully!
          </p>
        )}
        {error && (
          <p
            style={{ color: "red", textAlign: "center", marginBottom: "15px" }}
          >
            {error}
          </p>
        )}

        <button
          onClick={handleAddExpense}
          style={{
            backgroundColor: "#4caf50",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
            marginBottom: "15px",
          }}
        >
          Add Expense
        </button>

        <button
          type="button"
          onClick={handleBack}
          style={{ width: "100%", cursor: "pointer" }}
        >
          Back
        </button>
      </div>
    </main>
  );
}

export default ManageExpense;
