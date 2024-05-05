import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import createApiClient from "../../api/axios";
import { MRT_EditActionButtons, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, Button, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const ImageCell = ({ cell }) => (
  <img src={`data:image/png;base64,${cell.getValue()}`} alt="Product" style={{ width: '100px', height: 'auto' }} />
);

ImageCell.propTypes = {
  cell: PropTypes.shape({
    getValue: PropTypes.func.isRequired,
  }).isRequired
};

const Products = () => {
  const [productData, setProductData] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [editImageFile, setEditImageFile] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const handleDeleteProduct = (productId) => {
    const axios = createApiClient();
    console.log("id xoa",productId);
    axios.delete(`http://localhost:8080/products/delete/${productId}`)
      .then(response => {
        console.log('Product deleted:', response.data);
        toast.success("Deleted product!!!");
        setProductData(currentData => currentData.filter(item => item.id !== productId));
      })
      .catch(toast.error("Deleted product fail!!!"));
  };
  useEffect(() => {
    const axios = createApiClient();
    axios.get("/products/all")
      .then(response => setProductData(response.data))
      .catch(error => console.error('Failed to fetch products:', error));
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleEditImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEditImageFile(file);
    }
  };

  const columns = useMemo(() => [
    { accessorKey: 'id', header: 'Id', enableEditing: false, size: 80 },
    { accessorKey: 'name', header: 'Name', muiEditTextFieldProps: { required: true, error: !!validationErrors.name, helperText: validationErrors.name, onFocus: () => setValidationErrors({ ...validationErrors, name: undefined }) } },
    { accessorKey: 'type', header: 'Type', muiEditTextFieldProps: { required: true, error: !!validationErrors.type, helperText: validationErrors.type, onFocus: () => setValidationErrors({ ...validationErrors, type: undefined }) } },
    { accessorKey: 'image', header: 'Image', Cell: ImageCell },
    { accessorKey: 'list_price', header: 'List Price', muiEditTextFieldProps: { required: true, error: !!validationErrors.list_price, helperText: validationErrors.list_price, onFocus: () => setValidationErrors({ ...validationErrors, list_price: undefined }) } },
  ], [validationErrors]);

  const table = useMaterialReactTable({
    columns,
    data: productData,
    getRowId: (row) => row.id,
    enableEditing: true,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    onCreatingRowCancel: () => {
      setImageFile(null);
      setValidationErrors({});
    },
    onCreatingRowSave: ({ values }) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('type', values.type);
      formData.append('list_price', values.list_price);
      if (imageFile) {
        formData.append('image', imageFile);
      }
      const axios = createApiClient();
      axios.post('/products/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(response => console.log('Product created:', response.data))
      .catch(error => console.error('Failed to create product:', error));
    },
    onEditingRowCancel: () => {
      setEditImageFile(null);
      setValidationErrors({});
    },
    onEditingRowSave: ({ values, row }) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('type', values.type);
      formData.append('list_price', values.list_price);
      if (editImageFile) {
        formData.append('image', editImageFile);
      }
      const axios = createApiClient();
      axios.put(`/products/update/${row.original.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(response => console.log('Product updated:', response.data))
      .catch(error => console.error('Failed to update product:', error));
    },
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New Product</DialogTitle>
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
        <DialogTitle variant="h3">Edit Product</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDeleteProduct(row.original.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button variant="contained" onClick={() => table.setCreatingRow(true)}>Create New Product</Button>
    ),
  });

  return (
    <div>
      <h1 className='font-bold' style={{ fontSize: '30px', textAlign: 'center', marginTop: '8px' }}>Products</h1>
      <ToastContainer />
      <MaterialReactTable table={table} />
    </div>
  );
};

export default Products;
