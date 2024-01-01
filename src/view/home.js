import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import PostTable from "../components/homePage/postTable";
import PostForm from "../components/homePage/postForm";
import AddIcon from '@mui/icons-material/Add';
import ConfirmationModal from "../components/Mui/Model/confirmationModel";
import PostModal from "../components/Mui/Model/postModel";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPostEdit, setSelectedPostEdit] = useState(null);
    const [selectedPostCreate, setSelectedPostCreate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [toggleConfirmationOpen, setToggleConfirmationOpen] = useState(false);
    const [postToToggle, setPostToToggle] = useState(null);
    const [modalType, setModalType] = useState('create');

    // Take Data from LocalStorage to list posts List

    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];

    const handleCreate = () => {
        setSelectedPostCreate({
            id: Date.now(),
            title: "",
            body: "",
            date: "",
            completed: false,
        });
        setModalType('create');
        setIsModalOpen(true);
    };

    // For Create New Posts
    const handleCreateSubmit = () => {
        if (!selectedPostCreate.title || !selectedPostCreate.body) {
            return;
        }
        setPosts([...posts, selectedPostCreate]);
        saveDataToLocalStorage([...posts, selectedPostCreate]);
        setIsModalOpen(false);
    }

    useEffect(() => {
        setPosts([...savedPosts]);
    }, []);

    const saveDataToLocalStorage = (data) => {
        localStorage.setItem("posts", JSON.stringify(data));
    };

    const handleEdit = (postId) => {
        const selectedPostEdit = posts.find((post) => post.id === postId);
        setSelectedPostEdit(selectedPostEdit);
        setModalType('edit');
        setIsModalOpen(true);
    };

    // For Edit Posts

    const handleEditSubmit = () => {
        const updatedPosts = posts.map((post) =>
            post.id === selectedPostEdit.id ? selectedPostEdit : post
        );
        const formattedUpdatedPosts = updatedPosts.map((post) => ({
            ...post,
            date: post.date ? new Date(post.date).toISOString().slice(0, 10) : null,
        }));

        setPosts([...formattedUpdatedPosts]);
        saveDataToLocalStorage([...formattedUpdatedPosts]);
        setIsModalOpen(false);
    };

    const handleInputChange = (field, value) => {
        setSelectedPostCreate((prevPost) => ({
            ...prevPost,
            [field]: field === "date" ? (value ? value.toISOString().slice(0, 10) : null) : value,
        }));
    };

    const handleEditInputChange = (field, value) => {
        setSelectedPostEdit((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleDelete = (postId) => {
        setPostToDelete(postId);
        setDeleteConfirmationOpen(true);
    };

    // For Delete Posts

    const handleCancelDelete = () => {
        setPostToDelete(null);
        setDeleteConfirmationOpen(false);
    };

    const handleConfirmDelete = () => {
        const updatedPosts = posts.filter((post) => post.id !== postToDelete);
        setPosts([...updatedPosts]);
        saveDataToLocalStorage([...updatedPosts]);
        setDeleteConfirmationOpen(false);
    };

    // For Toggle Task Completed and Incomplete

    const handleToggle = (postId) => {
        setPostToToggle(postId);
        setToggleConfirmationOpen(true);
    };

    const handleCancelToggle = () => {
        setPostToToggle(null);
        setToggleConfirmationOpen(false);
    };

    const handleToggleCompletion = () => {
        const updatedPosts = posts.map((post) =>
            post.id === postToToggle ? { ...post, completed: !post.completed } : post
        );
        setPosts([...updatedPosts]);
        saveDataToLocalStorage([...updatedPosts]);
        setToggleConfirmationOpen(false);
    };

    const handleModalSubmit = () => {
        if (modalType === 'create') {
            handleCreateSubmit();
        } else if (modalType === 'edit') {
            handleEditSubmit();
        }
        setIsModalOpen(false);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'left', marginTop: 2 }}>
                Task List
            </Typography>

            <Button style={{ margin: "10px 0px 10px auto", display: "block", backgroundColor: "#0277bd", color: "white" }} onClick={handleCreate}>
                <AddIcon style={{ marginBottom: "-6px" }} />Add Task
            </Button>

            {/* Post Table Component passing props to it */}
            <PostTable posts={posts} handleEdit={handleEdit}
                handleDelete={handleDelete} handleToggle={handleToggle}
            />

            {/* Delete Confirmation Modal for Delete */}
            <ConfirmationModal open={deleteConfirmationOpen} onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete} message="Are you sure you want to edit this post?" />

            {/* Task Status Confirmation Modal for Delete */}
            <ConfirmationModal open={toggleConfirmationOpen} onCancel={handleCancelToggle}
                onConfirm={handleToggleCompletion} message="Are you sure you want to change the status of task?" />

            {/* component for Create & Edit Modal */}
            <PostModal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                post={modalType === 'edit' ? selectedPostEdit : selectedPostCreate}
                handleInputChange={modalType === 'create' ? handleInputChange : handleEditInputChange}
                buttonText={modalType === 'create' ? 'Create' : 'Update'}
            />
        </Box>
    );
};

export default Home;

