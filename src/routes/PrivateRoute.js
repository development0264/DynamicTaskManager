import React from "react";
import Layout from "./../layout/index";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    return isAuthenticated ? (
        <Layout>{children}</Layout>
    ) : (
        <Navigate to="/" replace />
    )
};

export default PrivateRoute;


