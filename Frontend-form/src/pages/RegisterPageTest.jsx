import { useState } from "react";
import { Button, Form, Input, Checkbox, message } from "antd";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  // Initialize form
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const inputStyle = "border rounded-lg border-grey300 w-[100%] h-12 px-4 py-2";

  const formStyle =
    "bg-white border border-grey300 rounded-lg h-full mt-[3.25rem] mb-[5.4375rem] px-[5.4375rem] pt-[2rem] pb-[3.3125rem] flex flex-col w-[840px] items-center gap-4";

  const labelStyle = {
    marginTop: "10px",
    color: " #323640)",
    fontFamily: "Prompt",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%", // 24px
  };

  // State for checked checkbox and form submission
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const onFinish = async (values) => {
    if (!isSubmitting) {
      try {
        setIsSubmitting(true);

        // Prepare registration data
        const data = {
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          email: values.email,
          password: values.password,
          role: "customer",
        };

        // Make API request
        const response = await axios.post(
          "http://localhost:3000/auth/register",
          data
        );

        // Check API response
        if (response.status === 200) {
          message.success("ลงทะเบียนสำเร็จ");
          // Redirect to login page or another page on success
          navigate("/login");
        } else {
          message.error("ลงทะเบียนล้มเหลว");
        }
      } catch (error) {
        console.error(error);
        message.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-[100%] min-h-screen justify-center bg-bg">
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 24 }}
          form={form}
          autoComplete="off"
          onFinish={onFinish}
          className={formStyle}
        >
          {/* Name */}
          <h1 className="text-blue950 text-center text-[32px] font-medium">
            ลงทะเบียน
          </h1>

          <Form.Item
            className="w-[80%] h-[72px]"
            name="fullName"
            label={<span style={labelStyle}>ชื่อ - นามสกุล</span>}
            labelAlign="top"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "กรุณากรอกชื่อ-นามสกุล",
              },
              {
                validator: (rule, value) => {
                  if (!/^[-a-zA-Z'.ก-๙\s]+$/.test(value)) {
                    return Promise.reject("กรุณากรอกชื่อ นามสกุลให้ถูกต้อง");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              className={inputStyle}
              placeholder="กรุณากรอกชื่อ - นามสกุล"
            />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item
            className="w-[80%] h-[72px]"
            name="phoneNumber"
            label={<span style={labelStyle}>เบอร์โทรศัพท์</span>}
            labelAlign="top"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "กรุณากรอกเบอร์โทรศัพท์",
              },
              {
                validator: (rule, value) => {
                  if (!/^0[6-9]{1}[0-9]{8}$/.test(value)) {
                    return Promise.reject("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              className={inputStyle}
              placeholder="กรุณากรอกเบอร์โทรศัพท์"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            className="w-[80%] h-[72px]"
            name="email"
            label={<span style={labelStyle}>อีเมล </span>}
            labelAlign="top"
            labelCol={{ span: 24 }}
            rules={[
              {
                type: "email",
                message: "กรุณากรอกอีเมลให้ถูกต้อง",
              },
              {
                required: true,
                message: "กรุณากรอกอีเมล",
              },
              {
                validator: (rule, value) => {
                  if (
                    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(
                      value
                    )
                  ) {
                    return Promise.reject("กรุณากรอกอีเมลให้ถูกต้อง");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input className={inputStyle} placeholder="กรุณากรอกอีเมล" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            className="w-[80%]"
            name="password"
            label={<span style={labelStyle}>รหัสผ่าน</span>}
            labelAlign="top"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "กรุณากรอกรหัสผ่าน",
              },
              {
                validator: (rule, value) => {
                  if (
                    !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(
                      value
                    )
                  ) {
                    return Promise.reject("กรุณากรอกรหัสผ่านให้ถูกต้อง");
                  }
                  if (!/[A-Z]/.test(value)) {
                    return Promise.reject("ต้องมี Uppercase อย่างน้อย 1 ตัว");
                  }
                  if (!/[a-z]/.test(value)) {
                    return Promise.reject("ต้องมี Lowercase อย่างน้อย 1 ตัว");
                  }
                  if (!/[0-9]/.test(value)) {
                    return Promise.reject("ต้องมีตัวเลขอย่างน้อย 1 ตัว");
                  }
                  if (!/[!@#$%^&*]/.test(value)) {
                    return Promise.reject("ต้องมีอักขระพิเศษอย่างน้อย 1 ตัว");
                  }
                  if (value.length < 8) {
                    return Promise.reject("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password
              className={inputStyle}
              placeholder="กรุณากรอกรหัสผ่าน"
            />
          </Form.Item>

          {/* Accept Terms and Conditions */}
          <Form.Item>
            <div className="h-[36px]">
              <label className="flex items-center">
                <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
                <span
                  className="ml-2"
                  style={{
                    color: "var(--gray-900, #323640)",
                    fontFamily: "Prompt",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "150%", // 24px
                  }}
                >
                  ยอมรับ{" "}
                  <a
                    href="#"
                    className="underline"
                    style={{
                      color: "var(--blue-600, #336DF2)",
                      fontFamily: "Prompt",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "150%", // 24px
                      textDecorationLine: "underline",
                    }}
                  >
                    ข้อตกลงและเงื่อนไข
                  </a>{" "}
                  และ{" "}
                  <a
                    href="#"
                    className="underline"
                    style={{
                      color: "var(--blue-600, #336DF2)",
                      fontFamily: "Prompt",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "150%", // 24px
                      textDecorationLine: "underline",
                    }}
                  >
                    นโยบายความเป็นส่วนตัว
                  </a>
                </span>
              </label>
            </div>

            <Button
              className={`btn-blue-950 w-full h-10 my-5 ${
                !isChecked || isSubmitting
                  ? "disabled:opacity-50 cursor-not-allowed"
                  : ""
              }`}
              htmlType="submit"
              disabled={!isChecked || isSubmitting}
              style={{
                marginTop: "30px",
                marginBottom: "30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Prompt",
              }}
            >
              {isSubmitting ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
            </Button>

            <div className="text-center">
              <a
                className="btn-ghost"
                onClick={() => navigate("/login")}
                style={{
                  color: "var(--blue-600, #336DF2)",
                  fontFamily: "Prompt",
                  fontSize: "16px",
                  fontWeight: "600",
                  textDecorationLine: "underline",
                }}
              >
                กลับไปหน้าเข้าสู่ระบบ
              </a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
