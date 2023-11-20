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
      <h1 className="text-3xl font-bold mb-6">Experience</h1>
      <div className="mt-10">
        <label>
          Work Experience
          <input
            type="text"
            placeholder="Show your relevant experience."
            value={formData.work_experience}
            onChange={(e) =>
              handleInputChange("work_experience", e.target.value)
            }
            className="ml-4 mb-4 p-2 border rounded w-[500px]"
          />
        </label>
      </div>
      <div className="mt-6">
        <label className="ml-[-40px]">
          <p className=" absolute ml-[-35px] mt-4">Summary Description</p>
          <textarea
            type="text"
            placeholder="Mention your role, experience & most importantly - your biggest achievements, best qualities and skills."
            value={formData.summary_description}
            onChange={(e) =>
              handleInputChange("summary_description", e.target.value)
            }
            className="ml-[170px] mb-4 p-2 border rounded w-[500px]"
          />
        </label>
      </div>
      <div className="mt-6">
        <label className="ml-[80px]">
          Skill
          <input
            type="text"
            placeholder="Important skills that show you fit the position. Make sure they match the key skills mentioned in the job listing."
            value={formData.skill_title}
            onChange={(e) => handleInputChange("skill_title", e.target.value)}
            className="ml-4 mb-4 p-2 border rounded w-[500px]"
          />
        </label>
      </div>
      <div className="mt-6">
        <button onClick={onPrev} className="bg-slate-50 mr-4">
          Previous
        </button>
        <button onClick={onNext} className="bg-slate-50 btn-blue">
          Next
        </button>
      </div>
    </div>
  );
};

export default ContactInfoPage;
