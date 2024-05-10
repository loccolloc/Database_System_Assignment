
import NavbarProducts from "./NavbarProducts";

import Products from "./Products";



function App() {
 

  return (
    <>
      <div className="flex">
      
        <NavbarProducts />
       
        <main className="ml-3 mt-3 grow">
          <Products />
        </main>
      </div>
    </>
  );
}

export default App;