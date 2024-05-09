// import { useState } from "react";
import NavbarReceive from "./NavbarReceive";

import Receive from "./Receive";



function DashReceive() {
  

  return (
    <>
      <div className="flex">
        {/* Side Navigation Bar */}
        <NavbarReceive />
        {/* Main component on basis of selected navigation from nav bar */}
        <main className="ml-3 mt-3 grow">
          <Receive />
        </main>
      </div>
    </>
  );
}

export default DashReceive;