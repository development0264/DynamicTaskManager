import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import PostTable from "./postTable";
import PostForm from "./postForm";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPostEdit, setSelectedPostEdit] = useState(null);
    const [selectedPostCreate, setSelectedPostCreate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

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
        setIsCreateModalOpen(true);
    };

    // For Create New Posts
    const handleCreateSubmit = () => {
        if (!selectedPostCreate.title || !selectedPostCreate.body) {
            return;
        }
        setPosts([...posts, selectedPostCreate]);
        saveDataToLocalStorage([...posts, selectedPostCreate]);
        setIsCreateModalOpen(false);
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
        setIsModalOpen(true);
    };

    // For Edit Posts

    const handleEditSubmit = () => {
        const updatedPosts = posts.map((post) =>
            post.id === selectedPostEdit.id ? selectedPostEdit : post
        );
        setPosts([...updatedPosts]);
        saveDataToLocalStorage(updatedPosts);
        setIsModalOpen(false);
    };

    const handleInputChange = (field, value) => {
        setSelectedPostCreate((prev) => ({
            ...prev,
            [field]: value,
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
        saveDataToLocalStorage(updatedPosts);
        setDeleteConfirmationOpen(false);
    };

    // For Toggle Task Completed and Incomplete

    const handleToggleCompletion = (postId) => {
        const updatedPosts = posts.map((post) =>
            post.id === postId ? { ...post, completed: !post.completed } : post
        );
        setPosts([...updatedPosts]);
        saveDataToLocalStorage(updatedPosts);
    };


    return (
        <Box>
            <Button style={{ marginLeft: "1200px", textDecoration: "none" }} onClick={handleCreate}>
                Add Post
            </Button>

            {/* Post Table Component passing props to it */}
            <PostTable posts={posts} handleEdit={handleEdit}
                handleDelete={handleDelete} handleToggle={handleToggleCompletion}
            // orderBy={orderBy} order={order} onSort={handleRequestSort}
            />

            {/* Delete Confirmation Modal for Delete */}
            <Modal open={deleteConfirmationOpen} onClose={handleCancelDelete}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography>Are you sure you want to delete this post?</Typography>
                    <Button onClick={handleConfirmDelete}>Yes</Button>
                    <Button onClick={handleCancelDelete}>No</Button>
                </Box>
            </Modal>

            {/* For Create Modal */}
            <Modal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    {/* PostForm Component passing props to it */}
                    <PostForm
                        post={selectedPostCreate}
                        onSubmit={handleCreateSubmit}
                        handleInputChange={handleInputChange}
                        onCancel={() => setIsCreateModalOpen(false)}
                        handleToggle={handleToggleCompletion}
                        buttonText={"Create"} />
                </Box>
            </Modal>

            {/* For Edit Modal */}
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    {/* PostForm Component passing props to it */}
                    <PostForm
                        post={selectedPostEdit}
                        onSubmit={handleEditSubmit}
                        handleInputChange={handleEditInputChange}
                        onCancel={() => setIsModalOpen(false)}
                        handleToggle={handleToggleCompletion}
                        buttonText={"Update"} />
                </Box>
            </Modal>
        </Box>
    );
};

export default Home;

