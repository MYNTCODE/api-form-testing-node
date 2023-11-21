import { Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage.jsx";
import "../App.css";
import NotUser from "./NotUser.jsx";
import HomePage from "./HomePage.jsx";

function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/notuser" element={<NotUser />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
