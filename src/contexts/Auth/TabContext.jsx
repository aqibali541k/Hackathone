import React, { createContext, useContext, useState } from "react";

const TabContext = createContext();

const TabProvider = ({ children }) => {
  const [isSiderOpen, setIsSiderOpen] = useState(false);
  // const [currentTab, setCurrentTab] = useState("profile");

  return (
    <TabContext.Provider value={{ isSiderOpen, setIsSiderOpen }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => useContext(TabContext);

export default TabProvider;
