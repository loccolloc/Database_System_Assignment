import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";


import axios from "axios";


import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Info = () => {


  const id= window.localStorage.getItem('id');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [locations, setLocations] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accountId, setAccountId] = useState("");


  useEffect(() => {
    
    

    axios.get(`http://localhost:8080/login/getCusByAccId?account_id=${id}`).then((res) => {
      console.log("customer: ",res.data.data); 
      setFirstName(res.data.data.first_name);
      setLastName(res.data.data.last_name);
      setGender(res.data.data.gender);
      setLocations(res.data.data.locations);
      setPhoneNumber(res.data.data.phone_number);
      setAccountId(res.data.data.id);
    });
  }, []);

 

 


  
  
  
  const handleEditInfo = async (e) => {
    e.preventDefault();
    const formData = {
      id: accountId,
      last_name: lastName,
      first_name: firstName,
      gender: gender, 
      locations: locations, 
      phone_number: phoneNumber 
    };
      await axios.put(`http://localhost:8080/login/putCus`,formData, {  
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((res) => {
          console.log("res",res);
          if (res.data) {
            toast.success("Update Info successfully!!!");
          } else {
            toast.warning("Update failed!!!");
          }
        });
    
  };
  return (
    <div className="grid m-4 gap-y-4">
       <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div 
        
          className="text-xl md:text-3xl font-semibold"
        
        >
          Thông tin khách hàng
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-2/4">
        
        </div>
      </div>
      <form onSubmit={(e) => handleEditInfo(e)}>
        <div className="grid gap-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
                <label>Last Name</label>
              <Input
                size="lg"
                
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
               
              />
            </div>
            <div>
            <label>First Name</label>
              <Input
                size="lg"
               
                name="username"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              
              />
            </div>
            <div>
            <label>Gender</label>
              <Input
                size="lg"
               
                name="password"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
               
              />
            </div>
            <div>
            <label>Location</label>
              <Input
                size="lg"
              
                name="location"
                value={locations}
                onChange={(e) => setLocations(e.target.value)}
                  />
            </div>
            <div>
            <label>Phone Number</label>
              <Input
                size="lg"
              
                name="phone_number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                  />
            </div>
            <div>
            <label>Customer Id</label>
              <Input
                size="lg"
                disabled={true}
                name="customer_id"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                  />
            </div>
          </div>
         
          <div className="grid grid-cols-1 gap-4 mt-3">
  <div className="flex justify-between">
    
    <Button type="submit">
      Lưu thông tin
    </Button>
  </div>
</div>
        </div>
      </form>

    </div>
  );
};

export default Info;
