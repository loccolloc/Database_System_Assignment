import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import EditPassword from './EditPassword'
import EditUsername from './EditUsername'
import axios from "axios";
import { useEffect } from "react";
import {  toast } from "react-toastify";
const Profile = () => {
  
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  useEffect(() => {
    axios.post("http://localhost/BE/index.php", {
      id: 8,
      action: "getUser",
    }).then((res) => {
      setFullname(res.data[0]["full_name"]);
      setEmail(res.data[0]["email"]);
      setPhoneNumber(res.data[0]["phone_number"]);
      setAddress(res.data[0]["address"]);
    });
  }, []);


  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    // console.log("Username:", username);
    // console.log("Password:", password);
    console.log("Fullname:", fullname);
    console.log("Email:", email);
    console.log("Phone Number:", phoneNumber);
    console.log("Address:", address);
  };
  
  const handleEditInfo = async (e) => {
    e.preventDefault();
    setOnEdit(!onEdit);

    await axios
      .post("http://localhost/BE/index.php", {
        id: 8,
        full_name: fullname,
        email: email,
        phone_number: phoneNumber,
        address: address,
        action: "updateInfo",
      })
      .then((res) => {
        if (res.data) {
          toast.success("Update Info successfully!!!", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.warning("Update failed!!!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  return (
    <div className="grid m-4 gap-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
        
          className="text-xl md:text-3xl font-semibold"
          sx={{ m: "0 0 5px 0" }}
        >
          Thông tin người dùng
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-2/4">
          <EditUsername/>
          <EditPassword/>
        </div>
      </div>
      <form onSubmit={(e) => handleEditInfo(e)}>
        <div className="grid gap-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
                <label>Họ và tên</label>
              <Input
                size="lg"
                
                name="fullName"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                disabled={onEdit}
              />
            </div>
            <div>
            <label>Email</label>
              <Input
                size="lg"
               
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={onEdit}
              />
            </div>
            <div>
            <label>Số điện thoại</label>
              <Input
                size="lg"
               
                name="phone_number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={onEdit}
              />
            </div>
            <div>
            <label>Địa chỉ</label>
              <Input
                size="lg"
              
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={onEdit}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-end">
              <Button type="submit">
                {onEdit ? `Lưu thông tin` : `Chỉnh sửa thông tin`}
              </Button>
            </div>
          </div>
        </div>
      </form>

    </div>
  );
};

export default Profile;
