import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      console.log(values);
      const response = await login(values);
      console.log("Response:", response);

      if (response.success) {
        navigate(`/profile/${response.data.data.user_id}`);
      } else {
        message.error("Invalid email or password format ");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const inputStyle =
    "border rounded-lg border-grey300 w-[100%] h-11 px-4 py-2.5";

  const formStyle =
    "bg-white border  rounded-lg h-full mt-[52px] mb-[87px] px-[87px] pt-[32px] pb-[53px] w-[740px] items-center gap-4";

  const labelStyle = {
    marginTop: "10px",
    color: " #323640)",
    fontFamily: "Prompt",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%",
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-[100%] min-h-screen justify-center items-center ">
          <Form
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 24 }}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
            className={formStyle}
          >
            <h1 className=" mt-10 text-blue950 text-center text-[32px] font-medium">
              MYNTCODE
            </h1>
            <Form.Item
              className="w-440px h-72px"
              label={<span style={labelStyle}>Email</span>}
              name="email"
              labelAlign="top"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Email is required",
                },
              ]}
            >
              <Input className={inputStyle} placeholder="email" />
            </Form.Item>

            <Form.Item
              className="w-440px h-72px"
              label={<span style={labelStyle}>Password</span>}
              labelAlign="top"
              name="password"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
              ]}
            >
              <Input.Password className={inputStyle} placeholder="password" />
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <button className=" bg-slate-200 w-[50%] mt-5 mb-5" type="submit">
                Login
              </button>
            </Form.Item>
            <div className="text-center">
              <span className="text-grey-700"></span>
              <a className="" onClick={handleRegisterClick}>
                <span className="underline">Register</span>
              </a>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
