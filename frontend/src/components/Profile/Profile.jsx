import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import EditPassword from './EditPassword'
import EditUsername from './EditUsername'
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Profile = () => {
  
  const [displayName, setdisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  useEffect(() => {
    const uname= window.localStorage.getItem('username');

    axios.get(`http://localhost:8080/login/getprofile?username=${uname}`).then((res) => {
      setdisplayName(res.data.data[0].display_name);
      setUsername(res.data.data[0].username);
      setPassword(res.data.data[0].password);
      setRole(res.data.data[0].role);
    });
  }, []);

  const showSuccessMessage = () => {
    toast.success("DELETE Info successfully!!!");
  };
  const showFailMessage = () => {
    toast.error("delete failed!!!");
  };
 
  const handleFormSubmit = (e) => {
    e.preventDefault();
   
  };
   
  const handleDeleteAccount = async () => {
    console.log("tai khoan se duoc xoa: ",username,password );
    await axios
      .delete(`http://localhost:8080/login/delete?username=${username}&password=${password}`)
      .then((res) => {
        if (res.data.data === 0) {
          showSuccessMessage(); 
        } else if (res.data.data === 4) {
          toast.error("This account cannot be deleted because an order in progress is currently assigned to the account!");
        } else {
          showFailMessage();
        }
      })
      .catch((error) => {
        toast.error("Error in deleting account!");
        console.error("Error during account deletion:", error);
      });
  };
  
  
  
  const handleEditInfo = async (e) => {
    e.preventDefault();
    setOnEdit(!onEdit);

    await axios
      .post("", {
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
          toast.warning("Delete failed!!!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  return (
    <div className="grid m-4 gap-y-4">
       <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div 
        
          className="text-xl md:text-3xl font-semibold"
          sx={{ m: "0 0 5px 0" }}
        >
          Thông tin người dùng
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-2/4">
          {/* <EditUsername/> */}
          <EditPassword username={username} />
        </div>
      </div>
      <form onSubmit={(e) => handleEditInfo(e)}>
        <div className="grid gap-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
                <label>Display Name</label>
              <Input
                size="lg"
                
                name="displayName"
                value={displayName}
                onChange={(e) => setdisplayName(e.target.value)}
                disabled={onEdit}
              />
            </div>
            <div>
            <label>Username</label>
              <Input
                size="lg"
               
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={onEdit}
              />
            </div>
            <div>
            <label>Password</label>
              <Input
                size="lg"
               
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!onEdit}  
                on
              />
            </div>
            <div>
            <label>Role</label>
              <Input
                size="lg"
              
                name="role"
                value={role}
                disabled={!onEdit}               />
            </div>
          </div>
         
          <div className="grid grid-cols-1 gap-4 mt-3">
  <div className="flex justify-between">
    <Button type="submit" onClick={()=>{handleDeleteAccount()}} >
      Xóa tài khoản
    </Button>
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
