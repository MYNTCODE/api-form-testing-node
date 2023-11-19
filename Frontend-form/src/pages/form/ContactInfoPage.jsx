// ContactInfoPage.js
import React from "react";

const ContactInfoPage = ({ onNext, onPrev, formData, setFormData }) => {
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Information</h1>
      <input
        type="text"
        placeholder="email"
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="password"
        value={formData.password}
        onChange={(e) => handleInputChange("password", e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <button onClick={onPrev} className="btn-gray mr-4">
        Previous
      </button>
      <button onClick={onNext} className="btn-blue">
        Next
      </button>
    </div>
  );
};

export default ContactInfoPage;
