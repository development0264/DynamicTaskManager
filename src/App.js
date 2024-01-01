import React from "react";
import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";
import Home from "./view/home";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignInSide from "./view/sign-in-side/SignInSide";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const defaultTheme = createTheme();

  return (
    <Router>
      <ThemeProvider theme={defaultTheme}>
        <Routes>
          <Route path="/" element={
            <PublicRoute restricted={false}>
              <SignInSide />
            </PublicRoute>
          } />
          <Route path="/private" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}
export default App;