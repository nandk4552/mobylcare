import React, { useState } from "react";
import axios from "axios";
import { Button, message } from "antd";
import DefaultLayout from "../DefaultLayout/DefaultLayout";

const WhatsAppSender = () => {
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    setLoading(true);
    message.success("Sending message...");

    try {
      const response = await sendMessage("919346921679");
      console.log("Message sent:", response);
      message.success("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      message.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (phoneNumber) => {
    const apiUrl = "https://graph.facebook.com/v19.0/108695218686380/messages";
    const token =
      "EAALJSz72664BOw9EFnv5S0oUuRjLRYLO4wY2uZAnHmZB1N84QVfaRaSzFBToumimeCYOC7cXZAhC46uRFBzpvGF1GWHfJ99fmP6ZCL8lgt2CiRwCZAnU0WlZBflrpo0lCx4DQyCbNjTI2qZAKcZBhxgurmp9dGPctY6tyBu3zscyVQowS7ldtWTC8qst7m3yWCIZCUUyQJZCaAldCVuaoZBTYQZD"; // Replace with your actual access token

    const data = {
      messaging_product: "whatsapp",
      to: phoneNumber,
      type: "template",
      template: {
        name: "testonlu",
        language: {
          code: "en",
        },
      },
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(apiUrl, data, config);
      console.log("Message sent successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

  return (
    <DefaultLayout>
      <Button type="primary" loading={loading} onClick={handleSendMessage}>
        Send WhatsApp Message
      </Button>
    </DefaultLayout>
  );
};

export default WhatsAppSender;
