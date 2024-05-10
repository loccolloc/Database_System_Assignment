
import Navbar from "./Navbar";

import Info from "./Info";


function App() {


  return (
    <>
      <div className="flex">
      
        <Navbar />
       
        <main className="grow">
        
          <Info />
        </main>
      </div>
    </>
  );
}

export default App;