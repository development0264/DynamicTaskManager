// PublicRoute.js
import React from "react";
import { Navigate} from "react-router-dom";

const isAuthenticated = localStorage.getItem('isAuthenticated');

const PublicRoute = ({ children, restricted }) => (
    isAuthenticated && restricted ? (
        <Navigate to="/private" replace />
    ) : (
        <>{children}</>
    )
);

export default PublicRoute;
