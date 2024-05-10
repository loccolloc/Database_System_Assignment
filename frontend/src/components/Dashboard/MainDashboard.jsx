
import Navbar from "./Navbar";

import Profile from "../Profile/Profile";


function App() {
 

  return (
    <>
      <div className="flex">
      
        <Navbar />
      
        <main className="grow">
        
          <Profile />
        </main>
      </div>
    </>
  );
}

export default App;