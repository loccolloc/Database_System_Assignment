
import NavbarGifts from "./NavbarGifts";

import Gift from "./Gift";



function DashGift() {
 

  return (
    <>
      <div className="flex">
       
        <NavbarGifts />
       
        <main className="ml-3 mt-3 grow">
          <Gift />
        </main>
      </div>
    </>
  );
}

export default DashGift;