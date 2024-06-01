import React, { useState } from "react";
import { Button, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PasswordReset.css";
const PasswordReset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Function to initiate the password reset process
  const initiatePasswordReset = async () => {
    try {
      await axios.post(
        `${
          import.meta.env.VITE_SERVER
        }/api/v1/user/reset-otp-password/initiate`,
        { email }
      );
      message.success("OTP sent to your email");
      setIsOtpSent(true);
    } catch (error) {
      message.error("Failed to send OTP");
      console.error(error);
    }
  };

  // Function to handle password reset using OTP
  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/reset-password-otp`,
        {
          email,
          newPassword,
          otp,
        }
      );
      message.success("Password reset successfully");
      setNewPassword("");
      setConfirmPassword("");
      setOtp("");
      setEmail("");
      setIsOtpSent(false);
      navigate("/login");
    } catch (error) {
      message.error("Failed to reset password");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {!isOtpSent ? (
          <div>
            <h2>Password Reset</h2>
            <Input
              placeholder="Enter Registered Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <Button type="primary" onClick={initiatePasswordReset}>
              Send OTP
            </Button>
          </div>
        ) : (
          <div>
            <h2>Reset Password</h2>
            <Input
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <Input.Password
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <Input.Password
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <Button type="primary" onClick={handlePasswordReset}>
              Reset Password
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
