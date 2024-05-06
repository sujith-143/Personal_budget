import React from "react";

const TokenExpirationPopup = ({ onRefresh, onClose }) => {
  const popupStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    border: "1px solid #ccc",
    boxShadow: "0 3px 15px rgba(0, 0, 0, 0.2)",
    padding: "30px",
    zIndex: "999",
    width: "300px", // Adjusted width
  };

  const contentStyle = {
    textAlign: "center",
    fontSize: "25px", // Adjusted font size
  };

  const buttonContainerStyle = {
    marginTop: "20px", // Increased margin top
  };

  const buttonStyle = {
    margin: "0 20px", // Increased margin
    padding: "20px", // Increased padding
    cursor: "pointer",
    fontSize: "20px", // Adjusted font size
  };

  return (
    <div style={popupStyle}>
      <div style={contentStyle}>
        <p>Session is going to expire refresh as soon as possible</p>
        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={onRefresh}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenExpirationPopup;
