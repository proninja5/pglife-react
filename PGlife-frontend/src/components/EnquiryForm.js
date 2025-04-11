import React, { useState } from 'react';
import axios from 'axios';

const EnquiryForm = ({ propertyId, onClose = () => {} }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    let userId = null;

    try {
      const parsedUser = JSON.parse(storedUser);
      userId = parsedUser?.id;
    } catch (e) {
      console.error("Error parsing user from localStorage", e);
    }

    if (!userId) {
      alert("Please login to send enquiry.");
      return;
    }

    console.log("Sending:", { userId, propertyId, message });

    try {
      const res = await axios.post("http://localhost/pglife/sendEnquiry.php", {
        user_id: userId,
        property_id: propertyId,
        message,
      });

      console.log("Enquiry response:", res.data);
      alert(res.data.message || "No message returned from server.");

      if (typeof onClose === "function") {
        onClose();
      }
    } catch (err) {
      console.error("Error sending enquiry:", err);
      alert("Failed to send enquiry.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Your Message</label>
        <textarea
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Send Enquiry</button>
    </form>
  );
};

export default EnquiryForm;
