import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import * as jwtDecode from "jwt-decode";
import jwtDecode from "jwt-decode";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });
  const [errorLogin, setErrorLogin] = useState("");

  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const result = await axios.post("http://localhost:3000/auth/login", data);
      console.log(result);
      const token = result.data.token;
      const fullName = result.data.data.fullName;
      localStorage.setItem("token", token);
      localStorage.setItem("fullName", fullName);
      const userDataFromToken = jwtDecode(token);
      setState({ ...state, user: userDataFromToken });
      localStorage.setItem("user_id", userDataFromToken.user_id);
      localStorage.setItem("fullName", userDataFromToken.fullName);
      localStorage.setItem("phoneNumber", userDataFromToken.phoneNumber);
      localStorage.setItem("email", userDataFromToken.email);
      navigate(`/profile/${userDataFromToken.user_id}`);
    } catch (e) {
      return {
        success: false,
        error: e.response ? e.response.data : e.message,
      };
    }
  };

  const register = async (data) => {
    await axios.post("http://localhost:3000/auth/register", data);
    navigate("/login");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState({ ...state, user: null, error: null });
    localStorage.removeItem("user_id");
    localStorage.removeItem("fullName");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("email");
    navigate("/login");
  };
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        register,
        errorLogin,
        setErrorLogin,
        isAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
