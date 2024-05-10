import { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import createApiClient from "../../api/axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';

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
  Tooltip,InputAdornment,TextField
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
const Receive = () => {
  const accountId= window.localStorage.getItem('id');
  const username= window.localStorage.getItem('username');

  const role= window.localStorage.getItem('role');
  const [validationErrors, setValidationErrors] = useState({});
  const [giftData, setGiftData] = useState([]);
  const [point, setPoint] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState("");

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

  useEffect(() => {
   
    
    const axios = createApiClient();
    axios.get(`http://localhost:8080/login/getprofile?username=${username}`).then((res) => {
    
    
    setPoint(res.data.data[0].point);
  });
  const query = searchQuery.trim() ? `/gifts/getByName?name=${encodeURIComponent(searchQuery.trim())}` : `/login/availableGift?username=${username}`;

  axios.get(query)
  .then(response => setGiftData(response.data))
  .catch(error => console.error('Failed to fetch products:', error));
}, [searchQuery]); 


  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'Id',
      enableEditing: false,
      size: 80,
    },
    {
      accessorKey: 'name',
      header: 'name',
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors?.name,
        helperText: validationErrors?.name,
        onFocus: () => setValidationErrors({
          ...validationErrors,
          name: undefined,
        }),
      },
    },
    {
      accessorKey: 'point',
      header: 'Point',
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors?.point,
        helperText: validationErrors?.point,
        onFocus: () => setValidationErrors({
          ...validationErrors,
          point: undefined,
        }),
      },
    },
    {
      accessorKey: 'image',
      header: 'Image',
      Cell: ImageCell,
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors?.point,
        helperText: validationErrors?.point,
        onFocus: () => setValidationErrors({
          ...validationErrors,
          point: undefined,
        }),
      },
    },
  ], [validationErrors]);

  const table = useMaterialReactTable({
    columns,
    data: giftData, 
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: {
      color: 'error',
      children: 'Sample error message (simulated)',
    },
    muiTableContainerProps: {
      sx: { minHeight: '500px' },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: ({ values }) => console.log('Create action', values), 
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: ({ values }) => console.log('Edit action', values), 
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
         
        
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
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
     

      </Box>
    ),
   
  });

  return<div>
   <h1 className='font-bold' style={{ fontSize: '30px', textAlign:'center',marginTop:'8px' }}>Available gifts</h1>
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

export default Receive;


