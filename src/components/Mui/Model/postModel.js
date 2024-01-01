import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import PostForm from '../../homePage/postForm';

const PostModal = ({ open, onCancel, onSubmit, post, handleInputChange, buttonText }) => {
    return (
        <Modal open={open} onClose={onCancel}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontSize: 20 }}>
                    {buttonText === 'Create' ? 'Add Task' : 'Edit Task'}
                </Typography>
                <PostForm
                    post={post}
                    onSubmit={onSubmit}
                    handleInputChange={handleInputChange}
                    onCancel={onCancel}
                    buttonText={buttonText}
                />
            </Box>
        </Modal>
    );
};

export default PostModal;
