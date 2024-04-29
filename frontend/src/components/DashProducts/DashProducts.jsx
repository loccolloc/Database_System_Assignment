// import { useState } from "react";
import NavbarProducts from "./NavbarProducts";

import Products from "./Products";



function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex">
        {/* Side Navigation Bar */}
        <NavbarProducts />
        {/* Main component on basis of selected navigation from nav bar */}
        <main className="ml-3 mt-3 grow">
          <Products />
        </main>
      </div>
    </>
  );
}

export default App;