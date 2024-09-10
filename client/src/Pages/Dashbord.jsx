import React from "react";
import { Outlet } from "react-router-dom";

const Dashbord = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashbord;
