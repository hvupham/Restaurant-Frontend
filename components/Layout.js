import React, { useEffect } from "react";
import { userLogin } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import Footer from "./Footer";
import Navbar from "./navbar/Navbar";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        console.log("Stored user:", user);
        dispatch(userLogin(user));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, [dispatch]);
  
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
