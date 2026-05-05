import React from "react";
import "./App.css";
import "./loader.css";
import "@ant-design/v5-patch-for-react-19";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Index from "./pages/routes";
function App() {
  return (
    <div>
      <ToastContainer />
      <Index />
    </div>
  );
}

export default App;
