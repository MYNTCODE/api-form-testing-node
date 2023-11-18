import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import Profile from "./Profile";
import Logout from "./Logout";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
