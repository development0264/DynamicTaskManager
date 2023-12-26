// PostForm.js
import React, { useState } from "react";
import { Box, Button, FormHelperText, TextField, TextareaAutosize } from "@mui/material";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const PostForm = ({ post, handleInputChange, onSubmit, buttonText, onCancel }) => {
    const [errors, setErrors] = useState({});

    console.log("Error", errors);

    // set Validation for Form
    const validateForm = async () => {

        const schema = yup.object().shape({
            title: yup.string().required("Title is required"),
            body: yup.string().required("Body is required"),
            date: yup.date()
                .required("Date is required")
                .typeError("Invalid date")
                .test(
                    'isValidDate',
                    'Invalid date format. Use yyyy-mm-dd',
                    (value) => {
                        if (!value) return true;
                        const regex = /^\d{4}-\d{2}-\d{2}$/;
                        return regex.test(value.toISOString().slice(0, 10));
                    }
                )
                .min(new Date("1900-01-01"), "Date must be after 1900-01-01")
                .max(new Date(), "Date must be before or equal to current date"),
        });

        try {
            await schema.validate(post, { abortEarly: false });
            setErrors({});
            return true;
        } catch (error) {
            const validationErrors = {};
            error.inner.forEach((err) => {
                validationErrors[err.path] = err.message;
            });
            setErrors(validationErrors);
            return false;
        }
    };

    const handleSubmit = async () => {
        const isValid = await validateForm();
        if (isValid) {
            onSubmit();
        }
    };

    return (
        <>
            <TextField
                label="Title"
                fullWidth
                margin="normal"
                value={post.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
            />
            <TextareaAutosize
                label="Body"
                fullWidth
                minRows={3}
                maxRows={10}
                margin="normal"
                placeholder="Enter Body"
                value={post.body}
                onChange={(e) => handleInputChange("body", e.target.value)}

            // error={!!errors.body}
            // helperText={errors.body}
            />
            <FormHelperText style={{ color: "red" }}>
                {errors.body}
            </FormHelperText>

            <DatePicker
                selected={post.date ? new Date(post.date) : null}
                onChange={(date) => handleInputChange("date", date)}
                margin="normal"
                dateFormat="yyyy-MM-dd"
                placeholderText="Select Date"
                className="form-control"
            // error={!!errors.date}
            // helperText={errors.date}
            />
            <FormHelperText style={{ color: "red" }}>
                {errors.date}
            </FormHelperText>
            <Box display="flex" justifyContent="flex-center" mt={2} mb={2} gap={2}>
                <Button style={{ backgroundColor: "green", color: "white" }} onClick={handleSubmit}>{buttonText}</Button>
                <Button style={{ backgroundColor: "red", color: "white" }} onClick={onCancel}>Cancel</Button>
            </Box>
        </>
    );
};

export default PostForm;
