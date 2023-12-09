import React from "react";
import { Button } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RegisterButton() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".home-page");

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible) {
          element.classList.add("slide-up");
        } else {
          element.classList.remove("slide-up");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="home-page">
        <p className=" text-[25px]">
          {" "}
          This is a website to helps you create a resume.
        </p>

        <div className="mt-10">
          <Button
            className=" text-center"
            onClick={() => {
              navigate("/register");
            }}
          >
            <p>Create your resume</p>
          </Button>
        </div>
      </div>
    </>
  );
}

export default RegisterButton;
