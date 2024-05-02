import { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import createApiClient from "../../api/axios";

import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';


import { fakeData, usStates } from './makeData';
const ImageCell = ({ cell }) => {
  return <img src={`data:image/png;base64,${cell.getValue()}`}  style={{ width: '100px', height: 'auto' }} />
};


ImageCell.propTypes = {
  cell: PropTypes.shape({
    getValue: PropTypes.func.isRequired
  }).isRequired
};
const Gift = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [giftData, setGiftData] = useState([]);

  useEffect(() => {
    const axios = createApiClient();
    axios.get("/gifts/getAllGifts")
      .then(response => {
        setGiftData(response.data);
        console.log(response.data);
      })
      .catch(error => console.error('Failed to fetch products:', error));
  }, []); 

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
      header: 'quantity',
      editVariant: 'select',
      editSelectOptions: usStates,
      muiEditTextFieldProps: {
        select: true,
        error: !!validationErrors?.state,
        helperText: validationErrors?.state,
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
       
        <Tooltip title="Delete">
          <IconButton  color="black" onClick={() => console.log('Delete action', row.original.id)}>
          <i style={{ fontSize: '30px', textAlign:'center' }}  className="text-center fa fa-hand-paper"></i>
          </IconButton>
        </Tooltip>
      </Box>
    ),
   
  });

  return<div>
   <h1 className='font-bold' style={{ fontSize: '30px', textAlign:'center',marginTop:'8px' }}>Customer rewards</h1>
    <div className='mb-10 ml-10 mt-10 font-bold' style={{ fontSize: '20px' }}> Your Point: 0 <i style={{ color: '#F28A00' }} className="fa-solid fa-coins fs-3  "></i></div>
   <MaterialReactTable table={table} />;
  </div> 
};

export default Gift;


