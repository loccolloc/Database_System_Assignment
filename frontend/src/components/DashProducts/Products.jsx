import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
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

// Assume fakeData and usStates are already defined in './makeData';
import { fakeData, usStates } from './makeData';
const ImageCell = ({ cell }) => {
  console.log(cell.getValue()); // Kiểm tra xem giá trị là gì
  return <img src={cell.getValue()} alt="Product" style={{ width: '100px', height: 'auto' }} />;
};


ImageCell.propTypes = {
  cell: PropTypes.shape({
    getValue: PropTypes.func.isRequired
  }).isRequired
};
const Products = () => {
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'Id',
      enableEditing: false,
      size: 80,
    },
    {
      accessorKey: 'firstName',
      header: 'First Name',
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors?.firstName,
        helperText: validationErrors?.firstName,
        onFocus: () => setValidationErrors({
          ...validationErrors,
          firstName: undefined,
        }),
      },
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors?.lastName,
        helperText: validationErrors?.lastName,
        onFocus: () => setValidationErrors({
          ...validationErrors,
          lastName: undefined,
        }),
      },
    },
    {
      accessorKey: 'image',
      header: 'Image',
      Cell: ImageCell,
    },
    {
      accessorKey: 'state',
      header: 'State',
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
    data: fakeData, // Đảm bảo rằng fakeData bây giờ bao gồm URL hình ảnh thay vì email
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
    onCreatingRowSave: ({ values }) => console.log('Create action', values), // Simulate save action
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: ({ values }) => console.log('Edit action', values), // Simulate save action
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
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
      <Button
        variant="contained"
        onClick={() => table.setCreatingRow(true)}
      >
        Create New Product
      </Button>
    ),
  });

  return( <div>
       <h1 className='font-bold' style={{ fontSize: '30px', textAlign:'center',marginTop:'8px' }}>Products</h1>

    <MaterialReactTable table={table} />
    </div>)
 
  
  
};

export default Products;


// Validation function
function validateUser(user) {
  return {
    firstName: user.firstName ? '' : 'First Name is Required',
    lastName: user.lastName ? '' : 'Last Name is Required',
    email: user.email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) ? '' : 'Incorrect Email Format',
  };
}
