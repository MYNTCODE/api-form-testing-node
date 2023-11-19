// RegisterPage.js

import { useNavigate } from "react-router-dom";
import PersonalInfoPage from "./form/PersonalInfoPage";
import ContactInfoPage from "./form/ContactInfoPage";
import FinalPage from "./form/FinalPage";

// RegisterPage.js
import { useState, useEffect } from "react";

const RegisterPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "ข้อมูลที่คุณกรอกอาจจะหายไป แน่ใจหรือไม่?";
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const pages = [
    <PersonalInfoPage
      key="personal-info"
      onNext={() => setCurrentPage(1)}
      formData={formData}
      setFormData={setFormData}
    />,
    <ContactInfoPage
      key="contact-info"
      onNext={() => setCurrentPage(2)}
      onPrev={() => setCurrentPage(0)}
      formData={formData}
      setFormData={setFormData}
    />,
    <FinalPage
      key="final-page"
      onSubmit={() => {
        navigate(`/login`);
        console.log("Form submitted:", formData);
      }}
      onPrev={() => setCurrentPage(1)}
      formData={formData}
      setFormData={setFormData}
    />,
  ];

  return <div className="container mx-auto">{pages[currentPage]}</div>;
};

export default RegisterPage;
