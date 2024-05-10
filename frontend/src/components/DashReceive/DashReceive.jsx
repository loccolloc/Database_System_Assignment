
import NavbarReceive from "./NavbarReceive";

import Receive from "./Receive";



function DashReceive() {
  

  return (
    <>
      <div className="flex">
      
        <NavbarReceive />
      
        <main className="ml-3 mt-3 grow">
          <Receive />
        </main>
      </div>
    </>
  );
}

export default DashReceive;