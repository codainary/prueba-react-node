import React from "react";
import ProtectedRoute from '@/components/protected-route';
const RootLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      <div>{children}</div>
    </ProtectedRoute>
  );
};

export default RootLayout;
