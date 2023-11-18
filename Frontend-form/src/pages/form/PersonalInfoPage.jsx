// PersonalInfoPage.js
import React from "react";

const PersonalInfoPage = ({ onNext, formData, setFormData }) => {
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Personal Information</h1>
      <input
        type="text"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={(e) => handleInputChange("fullName", e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <button onClick={onNext} className="btn-blue">
        Next
      </button>
    </div>
  );
};

export default PersonalInfoPage;
