// PostForm.js
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import * as yup from "yup";

const PostForm = ({ post, handleInputChange, onSubmit, buttonText, onCancel }) => {
    const [errors, setErrors] = useState({});

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
            <TextField
                label="Body"
                fullWidth
                margin="normal"
                value={post.body}
                onChange={(e) => handleInputChange("body", e.target.value)}
                error={!!errors.body}
                helperText={errors.body}
            />
            <TextField
                label="Date"
                fullWidth
                margin="normal"
                value={post.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                error={!!errors.date}
                helperText={errors.date}
            />
            <Button onClick={handleSubmit}>{buttonText}</Button>
            <Button onClick={onCancel}>Cancel</Button>
        </>
    );
};

export default PostForm;
