import React, { useState, useEffect } from "react";
import axios from "axios";

function ConfigureBudgets() {
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [budgetList, setBudgetList] = useState([]);
  const [monthlyBudget, setmonthlyBudget] = useState([
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
  ]);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [userData, setuserData] = useState(localStorage.getItem("userData"));
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleAddBudget = async () => {
    if (category && budget && selectedMonth) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:4000/check-existing-budget/${userData}/${selectedMonth}/${category}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.exists) {
          setFeedbackMessage(
            "Budget for this category already exists for the selected month."
          );
        } else {
          setBudgetList([
            ...budgetList,
            { category, budget, month: selectedMonth },
          ]);
          setCategory("");
          setBudget("");
          setFeedbackMessage("");
        }
      } catch (error) {
        console.error("Error checking existing budget:", error);
        setFeedbackMessage("Error checking existing budget.");
      }
    }
  };

  const handleEditBudget = (index) => {
    const editedBudget = budgetList[index];
    setCategory(editedBudget.category);
    setBudget(editedBudget.budget);

    const updatedBudgetList = [...budgetList];
    updatedBudgetList.splice(index, 1);
    setBudgetList(updatedBudgetList);
  };

  const handleSaveBudgets = async () => {
    try {
      if (budgetList.length === 0 || !selectedMonth) {
        console.error("Month or budget list is empty");
        return;
      }
      const token = localStorage.getItem("token");
      console.log(token);
      console.log(monthlyBudget);
      await axios.post(
        "http://localhost:4000/configure-budgets",
        {
          userData,
          monthlyBudget: selectedMonth,
          budgetList,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Budgets saved successfully!");

      setBudgetList([]);
      setSelectedMonth("");
      setFeedbackMessage("Budgets saved successfully!");
    } catch (error) {
      setBudgetList([]);
      setSelectedMonth("");
      setFeedbackMessage("Error saving budgets: " + error.message);
      console.error("Error saving budgets:", error);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <main className="center" id="main" aria-label="main">
      <div
        style={{
          width: "450px",
          margin: "auto",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ccc",
          borderRadius: "10px",
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
          Configure Budgets
        </h2>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="monthlyBudget"
            style={{ display: "block", margin: "10px 0" }}
          >
            Month:
          </label>
          <select
            id="monthlyBudget"
            onChange={(e) => setSelectedMonth(e.target.value)}
            value={selectedMonth}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          >
            <option value="">Select Month</option>
            {monthlyBudget.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="category"
            style={{ display: "block", margin: "10px 0" }}
          >
            Category:
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={handleCategoryChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="budget"
            style={{ display: "block", margin: "10px 0" }}
          >
            Budget:
          </label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={handleBudgetChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <button
          type="button"
          onClick={handleAddBudget}
          style={{
            backgroundColor: "#4caf50",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Add Budget
        </button>

        {feedbackMessage && (
          <p style={{ textAlign: "center" }}>{feedbackMessage}</p>
        )}

        <ul style={{ marginBottom: "20px" }}>
          {budgetList.map((item, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              {item.category}: {item.budget}
              <button
                type="button"
                onClick={() => handleEditBudget(index)}
                style={{ marginLeft: "10px" }}
              >
                Edit Here
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={handleSaveBudgets}
          style={{
            backgroundColor: "#4caf50",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "48%",
            marginRight: "10px",
          }}
        >
          Save The Entered Budget
        </button>

        <button
          type="button"
          onClick={handleBack}
          style={{ width: "48%", cursor: "pointer" }}
        >
          Go Back
        </button>
      </div>
    </main>
  );
}

export default ConfigureBudgets;
