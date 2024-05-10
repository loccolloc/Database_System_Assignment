import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import createApiClient from "../../api/axios";
import { MRT_EditActionButtons, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, Button, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip , TextField ,InputAdornment} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


import 'react-toastify/dist/ReactToastify.css';

const ImageCell = ({ cell }) => {
  const imageSrc = cell.getValue();
  if (!imageSrc) {
    return <span>No image</span>; 
  }
  return (
    <img src={`data:image/png;base64,${imageSrc}`} alt="Product" style={{ width: '100px', height: 'auto' }} />
  );
};

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
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedStartDate, setSelectedStartDate] = useState(dayjs().subtract(1, 'month'));
  const [totalProfit, setTotalProfit] = useState('');
  useEffect(() => {
    const axios = createApiClient();
    const endDate = dayjs().format('DD-MM-YYYY HH:mm:ss');
    const startDate = selectedStartDate.format('DD-MM-YYYY HH:mm:ss');
    axios.get(`http://localhost:8080/products/calculateTotalProfitByDate?start_date=${startDate}&end_date=${endDate}`)
      .then(response => {
        setTotalProfit(response.data);
       
      })
      .catch(err => {
        toast.error("Failed to fetch total profit: " + err.message);
      });
  }, [selectedStartDate]);
  const handleDeleteProduct = (productId) => {
    const axios = createApiClient();
    console.log("id xoa",productId);
    axios.delete(`http://localhost:8080/products/delete/${productId}`)
      .then(response => {
        console.log('Product deleted:', response.data);
        toast.success("Deleted product!!!");
        setProductData(currentData => currentData.filter(item => item.id !== productId));
      })
      .catch(err=>{toast.error(err)});
  };
  
  useEffect(() => {
    const axios = createApiClient();
    const query = searchQuery.trim() ? `/products/getByName?name=${encodeURIComponent(searchQuery.trim())}` : '/products/all';
    axios.get(query)
      .then(async response => {
        const products = response.data;
        const productsWithClassification = await Promise.all(products.map(async (product) => {
          const classifyResponse = await axios.get(`/products/classify/${product.id}`);

          return { ...product, classify: classifyResponse.data };
        }));
        setProductData(productsWithClassification);
      })
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
  const createProduct = (newProduct) => {
    const axios = createApiClient();
    const formData = {
      name: newProduct.name,
      type: newProduct.type,
      list_price: newProduct.listPrice,
      discount: newProduct.discount || 0.0, 
      state: newProduct.state || "available", 
      image: imageFile 
    };

    axios.post(`http://localhost:8080/products/post`, formData, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      toast.success("Product created successfully!");
      setProductData(current => [...current, response.data]); 
      setImageFile(null); 
    })
    .catch(error => {
      toast.error(`Failed to create product: ${error.message}`);
      console.error('Failed to create product:', error);
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
    { accessorKey: 'type', header: 'Type', muiEditTextFieldProps: { required: true, error: !!validationErrors.type, helperText: validationErrors.type, onFocus: () => setValidationErrors({ ...validationErrors, type: undefined }) } },
    { accessorKey: 'image', header: 'Image', Cell: ImageCell,enableEditing: false },
    { accessorKey: 'classify', header: 'Classify',enableEditing: false, },
    { accessorKey: 'discount', header: 'Discount' },
    { accessorKey: 'state', header: 'State' },
    {
      accessorKey: 'listPrice', 
      header: 'List Price', 
      muiEditTextFieldProps: { 
        required: true, 
        error: !!validationErrors.listPrice, 
        helperText: validationErrors.listPrice, 
        onFocus: () => setValidationErrors({ ...validationErrors, listPrice: undefined }) 
      },
      Cell: ({ row }) => `${row.original.listPrice.toLocaleString('vi-VN')} đồng`
    },  ], [validationErrors]);

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
    onEditingRowSave: ({ values }) => {
     
      console.log("values:", values);
      const formData = {
        name: values.name,
        type: values.type,
        list_price: values.listPrice,
        discount: values.discount,  
        state: values.state,  
        image: editImageFile, 
      };
    
      const axios = createApiClient();
      axios.put(`http://localhost:8080/products/put`, formData, {  
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) =>{ 
        toast.success("Product updated!");
        console.log('Product updated:', response.data);})
      .catch((error) =>{ 
        toast.error("Failed to update product!");

        console.error('Failed to update product:', error);});
    },
    onEditingRowCancel: () => {
      setEditImageFile(null);
      setValidationErrors({});
    },
    onCreatingRowSave: ({ values }) => {
      createProduct(values);
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
      <LocalizationProvider style={{marginTop:'20px'}} dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select Start Date"
          value={selectedStartDate}
          onChange={(newValue) =>{ setSelectedStartDate(newValue);

            toast.success("Total Profit updated!");
          }}
          components={{
            TextField: TextField,
          }}
        />
      </LocalizationProvider>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <strong style={{fontSize:'20px'}}>Total Profit: {totalProfit.toLocaleString('vi-VN')} đồng</strong>
      </div>
      <TextField
        style={{ margin: '20px auto', display: 'block' }}
        placeholder="Search Products"
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
      <ToastContainer />
      <MaterialReactTable table={table} />
    </div>
  );
};

export default Products;
