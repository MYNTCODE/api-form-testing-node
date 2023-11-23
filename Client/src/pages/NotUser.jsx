import React from "react";
import { useNavigate } from "react-router-dom";

function NotUser() {
  const navigate = useNavigate();
  return (
    <div>
      Login
      <p className=" cursor-pointer" onClick={() => navigate("/login")}>
        Click here!
      </p>
    </div>
  );
}

export default NotUser;
