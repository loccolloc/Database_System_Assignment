import { useState } from "react";
import axios from "axios";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Dialog,
  Card,
  CardBody,
  Typography,
  Input,
} from "@material-tailwind/react";

export default function EditPassword() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [oldPass, setOldPass] = useState();
  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost/BE/index.php", {
        id: 6,
        oldPass: oldPass,
        newPass: newPass,
        action: "updatePass",
      })
      .then((res) => {
        if(res.data)
        {
          toast.success("Update Password successfully!!!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        else
        {
          toast.warning("Update failed, Your password is incorrect!!!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }

      });
  }

  return (
    <>
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