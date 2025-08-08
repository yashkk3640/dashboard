import React, { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [fieldConfig, setFieldConfig] = useState([]);

  return (
    <DashboardContext.Provider value={{ fieldConfig, setFieldConfig }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
