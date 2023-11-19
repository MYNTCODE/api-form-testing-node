// FinalPage.js
import React from "react";

const FinalPage = ({ onSubmit, onPrev, formData, setFormData }) => {
  const handleFormSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful API response
        console.log("Form submitted successfully!");
        onSubmit();
      } else {
        // Handle API error response
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Final Page</h1>
      {/* แสดงข้อมูลหรืออื่น ๆ ที่คุณต้องการแสดงใน FinalPage */}
      <button onClick={onPrev} className="btn-blue mr-2">
        Previous
      </button>
      <button onClick={handleFormSubmit} className="btn-blue">
        Submit
      </button>
    </div>
  );
};

export default FinalPage;
