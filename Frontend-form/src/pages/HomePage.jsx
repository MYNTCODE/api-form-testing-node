import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import RegisterPage from "./RegisterPage";

function HomePage() {
  return (
    <>
      <RegisterPage />
    </>
  );
}

export default HomePage;
