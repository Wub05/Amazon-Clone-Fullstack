import React, { useContext, useEffect } from "react";
import { DataContext } from "../dataProvider/DataProvider";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const [{ user, cart }, dispatch] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, [user]); //mount only when user changes

  return <>{children}</>;
};

export default ProtectedRoute;
