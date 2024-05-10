import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  Card,
  CardBody,
  Typography,
  Input,
} from "@material-tailwind/react";

export default function EditPassword({ username }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    if (newPass !== confirmPass) {
      toast.error("The new passwords do not match.");
      return;
    }
    const url = `http://localhost:8080/login/changePassword?username=${encodeURIComponent(username)}&password=${encodeURIComponent(oldPass)}&newPassword=${encodeURIComponent(newPass)}`;

    axios
      .put(url)
      .then((res) => {
        console.log("thay doi mat khau: ", res);
        if(res.data.data===0)
        {

          toast.success("Update Password successfully!!!");
        }else if(res.data.data===1)
          {
            toast.error("Please fill out all fields (all fields are required)!");

          }else if(res.data.data===2)
            {
              toast.error("Password incorrect!");

            }else if(res.data.data===3)
              {
                toast.error("The new password you entered is the same as your old password. Enter a different password!");

              }
        else
        {
          toast.error("Update failed, Your password is incorrect!!!");
        }

      });
  }

  return (
    <>
      <ToastContainer />
      <Button className="text-white bg-dark rounded py-2" onClick={handleOpen}>Thay đổi mật khẩu</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem] p-2">
          <CardBody className="flex flex-col gap-4">
            <Typography
              variant="h5"
              color="blue-gray"
              className="text-center w-fit"
            >
              Thay đổi mật khẩu
            </Typography>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="grid grid-cols-1 gap-y-4">
              <label>Mật khẩu</label>
                <Input
                  type="password"
                  size="lg"
                 
                  name="oldPass"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                />
                <label>Mật khẩu mới</label>
                <Input
                  type="password"
                  size="lg"
              
                  name="newPass"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
                <label>Xác nhận mật khẩu mới</label>
                <Input
                  type="password"
                  size="lg"

                  name="confirmPass"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
                <Button  className="text-white mt-5 bg-dark " variant="gradient" type="submit" onClick={handleOpen} fullWidth>
                  Xác nhận
                </Button>
              </div>
            </form>
            {/* <ToastContainer/>; */}
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
EditPassword.propTypes = {
  username: PropTypes.string.isRequired
};
