import { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import createApiClient from "../../api/axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,InputAdornment,TextField,Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';



const ImageCell = ({ cell }) => {
  return <img src={`data:image/png;base64,${cell.getValue()}`}  style={{ width: '100px', height: 'auto' }} />
};


ImageCell.propTypes = {
  cell: PropTypes.shape({
    getValue: PropTypes.func.isRequired
  }).isRequired
};
const Gift = () => {
  const accountId= window.localStorage.getItem('id');

  const role= window.localStorage.getItem('role');
  const [validationErrors, setValidationErrors] = useState({});
  const [giftData, setGiftData] = useState([]);
  const [point, setPoint] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editImageFile, setEditImageFile] = useState(null);

  const handleClaimGift = (giftId ) => {
    const quantity=1;
    const axios = createApiClient();
    axios.get(`http://localhost:8080/login/exGifts?account_id=${accountId}&gift_id=${giftId}&quantity=${quantity}`)
      .then(response => {

        if(response.data===0)
          {
            toast.success("Gift exchanged successfully!");
          }else if(response.data===1)
            {
              toast.error("You cannot exchange gift!");
              return;
            }
        // setShowPopup(true);
      })
      .catch((error) => {
        
        toast.error("Claim gift failed!");
        console.error('Error claiming gift:', error);});
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleDeleteProduct = (productId) => {

    console.log("id xoa",productId);
    axios.delete(`http://localhost:8080/gifts/delete/${productId}`)
      .then(response => {
        console.log('Product deleted:', response.data);
        toast.success("Deleted gift successfully!!!");
        setGiftData(currentData => currentData.filter(item => item.id !== productId));
      })
      .catch(err=>console.log("loi ", err));
  };
  useEffect(() => {
    const uname= window.localStorage.getItem('username');
    
    const axios = createApiClient();
    axios.get(`http://localhost:8080/login/getprofile?username=${uname}`).then((res) => {
    
    
    setPoint(res.data.data[0].point);
  });
  const query = searchQuery.trim() ? `/gifts/getByName?name=${encodeURIComponent(searchQuery.trim())}` : '/gifts/all';

  axios.get(query)
  .then(response => setGiftData(response.data))
  .catch(error => console.error('Failed to fetch products:', error));
}, [searchQuery]); 
const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageFile(reader.result.split(',')[1]); 
    };
    reader.readAsDataURL(file);
  }
};
const createGift = (newGift) => {
  const axios = createApiClient();
  const formData = {
    name: newGift.name,
    image: imageFile, 
    quantity: newGift.quantity,
    point: newGift.point
  };

  axios.post('http://localhost:8080/gifts/post', formData, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    toast.success("Gift created successfully!");
    setGiftData(current => [...current, response.data]); 
    setImageFile(null); 
  })
  .catch(error => {
    toast.error(`Failed to create gift: ${error.message}`);
    console.error('Failed to create gift:', error);
  });
};
const handleEditImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditImageFile(reader.result.split(',')[1]); 
    };
    reader.readAsDataURL(file);
  }
};
const columns = useMemo(() => [
  { accessorKey: 'id', header: 'Id', enableEditing: false, size: 80 },
  { accessorKey: 'name', header: 'Name', muiEditTextFieldProps: { required: true, error: !!validationErrors.name, helperText: validationErrors.name, onFocus: () => setValidationErrors({ ...validationErrors, name: undefined }) } },
  { accessorKey: 'point', header: 'Point', muiEditTextFieldProps: { required: true, error: !!validationErrors.point, helperText: validationErrors.point, onFocus: () => setValidationErrors({ ...validationErrors, point: undefined }) }, Cell: ({ row }) => `${row.original.point.toLocaleString('vi-VN')} ` },
  { accessorKey: 'image', header: 'Image', Cell: ImageCell,enableEditing: false },
  { accessorKey: 'quantity', header: 'Quantity', muiEditTextFieldProps: { required: true, error: !!validationErrors.quantity, helperText: validationErrors.quantity, onFocus: () => setValidationErrors({ ...validationErrors, quantity: undefined }) } }
], [validationErrors]);


  const table = useMaterialReactTable({
    columns,
    data: giftData, 
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: ({ values }) => createGift(values),
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: ({ values }) => {
      
      console.log("values:", values);
      const formData = {
        name: values.name,
        quantity: values.quantity,
        point: values.point,
        image: editImageFile, 
      };
    
      const axios = createApiClient();
      axios.put(`http://localhost:8080/gifts/put`, formData, {  
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) =>{ 
        toast.success("Gift updated!");
        console.log('Gift updated:', response.data);})
      .catch((error) =>{ 
        toast.error("Failed to update Gift!");

        console.error('Failed to update product:', error);});
    },    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New Gift</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {internalEditComponents}
          <TextField
            type="file"
            onChange={handleImageChange}
            inputProps={{ accept: 'image/*' }}
          />
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
      
        <DialogTitle variant="h3">Edit Gift</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents}
          <TextField
            type="file"
            onChange={handleEditImageChange}
            inputProps={{ accept: 'image/*' }}
          />
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
         {role !== "user" && (
         <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
         )}
       {role !== "admin" && (
          <>
        <Tooltip title="Claim">
        {((point >= row.original.point)&& row.original.quantity>0 ) && (
          <IconButton  color="black" onClick={() => handleClaimGift(row.original.id)}>
          <i style={{ fontSize: '30px', textAlign:'center' }}  className="text-center fa fa-hand-paper"></i>
          </IconButton>
            )}
        </Tooltip>
        <Tooltip title={(point >= row.original.point)&& row.original.quantity>0 ? "Enough points to claim" : "Not enough points to claim"}>
      <IconButton color={(point >= row.original.point)&& row.original.quantity>0 ? "success" : "error"}>
        <i className="material-icons">{(point >= row.original.point)&& row.original.quantity>0 ? "Enough" : "Not enough"}</i>
      </IconButton>
    </Tooltip>
        </>
       )}
       {role !== "user" && (
    <Tooltip title="Delete">
      <IconButton color="error" onClick={() => handleDeleteProduct(row.original.id)}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
    

)}

      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button variant="contained" onClick={() => table.setCreatingRow(true)}>Create New Gift</Button>
    ),
  });

  return<div>
   <h1 className='font-bold' style={{ fontSize: '30px', textAlign:'center',marginTop:'8px' }}>Customer rewards</h1>
   <TextField 
        style={{ margin: '20px auto', display: 'block' }}
        placeholder="Search Gifts"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Dialog open={showPopup} onClose={handleClosePopup}>
        <DialogTitle>Claimed Gift</DialogTitle>
        <DialogContent>
          <IconButton onClick={handleClosePopup} style={{ position: 'absolute', top: '5px', right: '5px' }}>
            <CloseIcon />
          </IconButton>
        </DialogContent>
      </Dialog>
   <ToastContainer />
   {role !== "admin" && (<div className='mb-10 ml-10 mt-10 font-bold' style={{ fontSize: '20px' }}> Your Point: {point} <i style={{ color: '#F28A00' }} className="fa-solid fa-coins fs-3  "></i></div>)}
   <MaterialReactTable table={table} />;
  </div> 
};

export default Gift;


