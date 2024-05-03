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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



const ImageCell = ({ cell }) => (
  <img src={`data:image/png;base64,${cell.getValue()}`}  style={{ width: '100px', height: 'auto' }} />
);

ImageCell.propTypes = {
  cell: PropTypes.shape({
    getValue: PropTypes.func.isRequired
  }).isRequired
};

const Products = () => {
  const [productData, setProductData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const axios = createApiClient();
    axios.get("/products/all")
      .then(response => {
        setProductData(response.data);
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
        error: !!validationErrors.name,
        helperText: validationErrors.name,
        onFocus: () => setValidationErrors({
          ...validationErrors,
          name: undefined,
        }),
      },
    },
    {
      accessorKey: 'type', 
      header: 'type',
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors.type,
        helperText: validationErrors.type,
        onFocus: () => setValidationErrors({
          ...validationErrors,
          type: undefined,
        }),
      },
    },
    {
      accessorKey: 'image',
      header: 'Image',
      Cell: ImageCell,
    },
    {
      accessorKey: 'list_price', 
      header: 'list_price',
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors.type,
        helperText: validationErrors.type,
        onFocus: () => setValidationErrors({
          ...validationErrors,
          type: undefined,
        }),
      },
    },
  ], [validationErrors]);

  const table = useMaterialReactTable({
    columns,
    data: productData,
    getRowId: (row) => row.id,
    enableEditing: true,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: ({ values }) => console.log('Create action', values),
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: ({ values }) => console.log('Edit action', values),
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New Product</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit Product</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => console.log('Delete action', row.original.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button variant="contained" onClick={() => table.setCreatingRow(true)}>
        Create New Product
      </Button>
    ),
  });

  return (
    <div>
      <h1 className='font-bold' style={{ fontSize: '30px', textAlign: 'center', marginTop: '8px' }}>Products</h1>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default Products;
