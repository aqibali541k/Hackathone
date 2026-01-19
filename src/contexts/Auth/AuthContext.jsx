// context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";

const AuthContext = createContext();
const initialState = { isAuth: false, user: null, token: "", role: null }; // added role

const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Fetch profile if token exists
  const fetchProfile = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsAppLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const userData = res.data.user || res.data; // backend may send { user } or just data
      setState({
        isAuth: true,
        user: userData,
        token,
        role: userData.role, // save role
      });
    } catch (error) {
      console.log("Error fetching user profile", error);
      handleLogout(); // token invalid
    } finally {
      setIsAppLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogin = (user, token) => {
    localStorage.setItem("authToken", token);
    setState({ isAuth: true, user, token, role: user.role }); // save role
  };

  const handleRegister = (user, token) => {
    localStorage.setItem("authToken", token);
    setState({ isAuth: true, user, token, role: user.role }); // save role
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setState(initialState);
  };

  if (isAppLoading) return <Loader />;

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuth: state.isAuth,
        token: state.token,
        role: state.role,
        handleLogout,
        handleRegister,
        handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
