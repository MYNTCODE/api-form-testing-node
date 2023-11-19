import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import Profile from "./Profile";
import LoginPage from "./LoginPage";
// import Logout from "./Logout";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile/:user_id" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
