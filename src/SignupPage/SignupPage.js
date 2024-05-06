import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/Signup", formData)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setErrorMessage("");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error while signing up:", error);
        setErrorMessage("Error while signing up. Please try after some time.");
        setSuccessMessage("");
      });
  };

  return (
    <section
      style={{
        textAlign: "center",
        padding: "20px",
        position: "relative",
      }}
    >
      <section
        style={{
          display: "inline-block",
          textAlign: "left",
          backgroundColor: "#e6ffe6",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          width: "400px",
        }}
      >
        <form onSubmit={handleSignup}>
          <h2
            style={{
              fontSize: "40px",
              marginLeft: "70px",
              color: "#4caf50", // Green color
            }}
          >
            Signup Page
          </h2>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

          <label
            htmlFor="username"
            style={{
              display: "block",
              margin: "10px 0",
              color: "#333",
              textAlign: "left",
            }}
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            style={{
              marginTop: "5px",
              marginBottom: "20px",
              marginLeft: "5px",
              width: "100%",
              padding: "10px",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            required
          />
          <br />

          <label
            htmlFor="password"
            style={{
              display: "block",
              margin: "10px 0",
              color: "#333",
              textAlign: "left",
            }}
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={{
              marginBottom: "40px",
              marginLeft: "5px",
              width: "100%",
              padding: "10px",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            required
          />
          <br />

          <button
            type="submit"
            style={{
              fontWeight: "600",
              letterSpacing: "0.05em",
              fontSize: "20px",
              backgroundColor: "#4caf50",
              color: "white",
              padding: "12px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
              transition: "background-color 0.3s ease",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              outline: "none",
              marginTop: "20px",
            }}
          >
            Signup
          </button>
        </form>
      </section>
    </section>
  );
}

export default SignupPage;
