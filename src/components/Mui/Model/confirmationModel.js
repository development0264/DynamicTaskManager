import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ConfirmationModal = ({ open, onCancel, onConfirm, message }) => {
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
                <Typography>{message}</Typography>
                <Box display="flex" justifyContent="flex-end" gap={1} marginTop={5}>
                    <Button
                        style={{ backgroundColor: 'green', color: 'white', margin: '2px 2px 2px 2px' }}
                        onClick={onConfirm}
                    >
                        Yes
                    </Button>
                    <Button
                        style={{ backgroundColor: 'red', color: 'white', margin: '2px 2px 2px 2px' }}
                        onClick={onCancel}
                    >
                        No
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;

