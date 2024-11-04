import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Dropdown = ({ label, value, onChange, options, multiple = false }) => {
  return (
    <FormControl
      fullWidth
      variant='outlined'
      style={{ marginBottom: '10px', marginTop: '10px', minWidth: '200px' }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        multiple={multiple}
        value={value}
        onChange={onChange}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
