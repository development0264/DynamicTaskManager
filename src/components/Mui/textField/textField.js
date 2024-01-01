import React from 'react';
import TextField from '@mui/material/TextField';

const TextFieldComponent = ({ label, name, type, autoComplete, autoFocus, onChange,value }) => {
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            label={label}
            name={name}
            type={type}
            id={name}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            onChange={onChange}
            value={value}
        />
    );
};

export default TextFieldComponent;
