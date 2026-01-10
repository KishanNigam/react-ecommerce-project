import React from "react";
import AdminRoutes from "./routes/AdminRoutes";
import ErrorBoundary from "./components/common/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <AdminRoutes />
    </ErrorBoundary>
  );
}

export default App;
