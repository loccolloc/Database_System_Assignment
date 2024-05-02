// import { useState } from "react";
import NavbarGifts from "./NavbarGifts";

import Gift from "./Gift";



function DashGift() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex">
        {/* Side Navigation Bar */}
        <NavbarGifts />
        {/* Main component on basis of selected navigation from nav bar */}
        <main className="ml-3 mt-3 grow">
          <Gift />
        </main>
      </div>
    </>
  );
}

export default DashGift;