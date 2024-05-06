import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const buttonStyle = {
    backgroundColor: "#4a90e2",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "200px", // Adjusted width for consistency
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "16px",
  };

  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
          Welcome to the Dashboard!
        </h2>

        <div style={{ marginBottom: "10px" }}>
          <Link to="/configure-budgets" style={{ textDecoration: "none" }}>
            <button style={buttonStyle}>Add New Budgets</button>
          </Link>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <Link to="/add-expense" style={{ textDecoration: "none" }}>
            <button style={buttonStyle}>Add New Expenses</button>
          </Link>
        </div>
      </div>

      <Link to="/" style={{ textDecoration: "none" }}>
        <button style={{ ...buttonStyle, backgroundColor: "#4caf50" }}>
          Go Back
        </button>
      </Link>
    </main>
  );
}

export default Dashboard;
