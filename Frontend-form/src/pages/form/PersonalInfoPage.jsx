// PersonalInfoPage.js
import React, { useState } from "react";

const PersonalInfoPage = ({ onNext, formData, setFormData }) => {
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    // Clear the validation error for the field when the user types
    setErrors({
      ...errors,
      [field]: null,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate Full Name
    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
      valid = false;
    }

    // Validate Phone Number
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
      valid = false;
    } else if (!/^\d{10}$/i.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format (10 digits)";
      valid = false;
    }

    // Validate Email
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    // Validate Password
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleNextClick = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create a new account</h1>
      <div className=" pt-6">
        <label>
          Full Name
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="ml-4 mb-4 p-2 border rounded w-[290px]"
          />
          {errors.fullName && (
            <p className="text-red-500 absolute ml-[90px] text-[12px] mt-[-15px]">
              {errors.fullName}
            </p>
          )}
        </label>
      </div>
      <div className="pt-6">
        <label className="ml-[-40px]">
          Phone Number
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            className="mb-4 ml-4 p-2 border rounded w-[290px]"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 absolute ml-[90px] text-[12px] mt-[-15px]">
              {errors.phoneNumber}
            </p>
          )}
        </label>
      </div>
      <div className="pt-6">
        <label className="ml-6">
          Email
          <input
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="mb-4 ml-4 p-2 border rounded w-[290px]"
          />
          {errors.email && (
            <p className="text-red-500 absolute ml-[90px] text-[12px] mt-[-15px]">
              {errors.email}
            </p>
          )}
        </label>
      </div>
      <div className="pt-6">
        <label className="ml-[-8px]">
          Password
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="mb-4 ml-4 p-2 border rounded w-[290px]"
          />
          {errors.password && (
            <p className="text-red-500 absolute ml-[90px] text-[12px] mt-[-15px]">
              {errors.password}
            </p>
          )}
        </label>
        <span
          type="button"
          className="ml-6 text-gray-500 absolute cursor-pointer mt-2 text-[15px]"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>
      <button onClick={handleNextClick} className="bg-slate-50 mt-10">
        Next
      </button>
    </div>
  );
};

export default PersonalInfoPage;
