import { Image, Modal } from "antd"; // Assuming you're using Ant Design for the modal
import React from "react";

const QRCodeModal = ({ qrVisible, setQrVisible, qrOrderData }) => {
  return (
    <Modal
      title="QR Code for Order"
      open={qrVisible}
      onCancel={() => setQrVisible(false)}
      footer={null}
      width={300} // Adjust as necessary
      style={{ textAlign: "center" }} // Center content in modal
    >
      {qrOrderData ? (
        <Image
          style={{
            maxWidth: "100%" /* Make image responsive */,
            height: "auto" /* Maintain aspect ratio */,
            borderRadius: "8px" /* Optional: rounded corners for aesthetics */,
            boxShadow:
              "0 2px 10px rgba(0, 0, 0, 0.1)" /* Optional: subtle shadow */,
          }}
          src={qrOrderData?.qrCodeURL}
          alt="QR Code"
        />
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
  );
};

export default QRCodeModal;
