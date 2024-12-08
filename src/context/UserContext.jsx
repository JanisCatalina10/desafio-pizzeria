import { createContext, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = (jwtToken, userEmail) => {
    setToken(jwtToken);
    setUser(userEmail);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  const loginRequest = async (email, password) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    const { token, email: userEmail } = response.data;
    login(token, userEmail);
    localStorage.setItem("token", token);
  };

  const registerRequest = async (email, password) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    const { token, email: userEmail } = response.data;
    login(token, userEmail);
    localStorage.setItem("token", token);
  };

  const fetchUserProfile = async () => {
    const response = await axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  return (
    <UserContext.Provider
      value={{
        token,
        user,
        loginRequest,
        registerRequest,
        logout,
        fetchUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
