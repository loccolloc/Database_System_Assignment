// ProtectedRoute.js

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, blockRole }) => {
  const role = window.localStorage.getItem('role');
if(blockRole)
    {
        if (role === blockRole) {
            return <Navigate to="/" replace />;
          }else if(role === null)
            {
                return <Navigate to="/" replace />;

            }

    }
    else{
        if (role === null) {
            return <Navigate to="/" replace />;
          }
    }
 

  return children;
};

export default ProtectedRoute;
