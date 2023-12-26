import React from "react";
import { BrowserRouter as Router, Route, Navigate, Switch, Routes } from "react-router-dom";
import Home from "./view/home";
import Layout from "./layout";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignInSide from "./view/sign-in-side/SignInSide";

const isAuthenticated = localStorage.getItem('isAuthenticated');

const PrivateRoute = ({ element }) => (
  isAuthenticated ? (
    element
  ) : (
    <Navigate to="/signin" replace />
  )
);

const PublicRoute = ({ element, restricted }) => (
  isAuthenticated && restricted ? (
    <Navigate to="/private" replace />
  ) : (
    element
  )
);

function App() {
  const defaultTheme = createTheme();

  return (
    <Router>
      <ThemeProvider theme={defaultTheme}>
        <Routes>
          <Route path="/" element={<PublicRoute element={<SignInSide />} restricted={false} />} />
          <Route path="/private" element={<PrivateRoute element={<Layout><Home /></Layout>} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}
export default App;