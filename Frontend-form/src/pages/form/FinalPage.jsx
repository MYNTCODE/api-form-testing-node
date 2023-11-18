// FinalPage.js
import React from "react";

const FinalPage = ({ onSubmit, onPrev, formData, setFormData }) => {
  const handleFormSubmit = async () => {
    // ทำตามที่คุณต้องการทำในฟังก์ชัน onSubmit
    // ตรงนี้คุณสามารถทำการส่งข้อมูลไปยัง API หรือทำตามกระบวนการที่คุณต้องการ

    // เช่น
    try {
      // ส่งข้อมูลไปยัง API
      // ตัวอย่างเท่านั้น, คุณต้องแก้ไขตามที่ API ของคุณต้องการ
      const response = await axios.post(
        "http://localhost:4000/auth/register",
        formData
      );

      // ตรวจสอบการตอบกลับจาก API และทำการจัดการตามความเหมาะสม
      if (response.status === 200) {
        console.log("Data submitted successfully");
        // ทำอย่างอื่น ๆ ที่คุณต้องการทำหลังจากส่งข้อมูลสำเร็จ
      } else {
        console.error("Failed to submit data");
        // ทำอย่างอื่น ๆ ที่คุณต้องการทำหลังจากส่งข้อมูลไม่สำเร็จ
      }
    } catch (error) {
      console.error("An error occurred:", error);
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
