// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../AuthContext";
// import { useNavigate } from "react-router-dom";
// import "./Login.scss"; // Import the CSS file

// const LoginPage = (props) => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     axios
//       .post("https://personal-budget-2z33.onrender.com/login", formData)
//       .then((response) => {
//         setSuccessMessage(response.data.message);
//         if (response.data.user) {
//           localStorage.setItem("userData", response.data.user._id.toString());
//         }
//         localStorage.setItem("token", response.data.token);
//         login();
//         setIsLoggedIn(true);
//         props.callBack(true);
//         navigate("/");
//       })
//       .catch((error) => {
//         setErrorMessage("");
//         setSuccessMessage("Invalid username or password");
//       });
//   };

//   return (
//     <section className="login-container">
//       <section className="form-container">
//         <h2 className="form-heading">Login Page</h2>
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//         <form onSubmit={handleLogin}>
//           <label htmlFor="username" className="form-label">
//             Username:
//           </label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleInputChange}
//             required
//             className="form-input"
//           />
//           <br />
//           <label htmlFor="password" className="form-label">
//             Password:
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             required
//             className="form-input"
//           />
//           <br />
//           <button type="submit" className="submit-button">
//             Login
//           </button>
//         </form>
//       </section>
//     </section>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import "./Login.scss"; // Import the CSS file

const LoginPage = (props) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    axios
      .post("https://personal-budget-2z33.onrender.com/login", formData)
      .then((response) => {
        setSuccessMessage(response.data.message);
        if (response.data.user) {
          localStorage.setItem("userData", response.data.user._id.toString());
        }
        localStorage.setItem("token", response.data.token);
        login();
        setIsLoggedIn(true);
        props.callBack(true);
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage("");
        setSuccessMessage("Invalid username or password");
      });
  };

  return (
    <section className="login-container">
      <section className="form-container">
        <h2 className="form-heading">Login Page</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <br />
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <br />
          <button type="submit" className="submit-button">
            Login
          </button>
          {/* Add a link/button to redirect to signup page */}
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            New user?{" "}
            <Link
              to="/signup"
              className="signup-link"
              style={{ textDecoration: "none", color: "#4d5791" }}
            >
              Sign up here
            </Link>
          </p>
        </form>
      </section>
    </section>
  );
};

export default LoginPage;
