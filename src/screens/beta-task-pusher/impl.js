import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid,
     LinearProgress, Dialog, 
     DialogActions, DialogContent, DialogTitle,
     IconButton, Menu, MenuItem } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import taskio from "../../api/taskio/taskio";

const TaskCreator = () => {
    const [clientId, setClientId] = useState("");
    const [taskData, setTaskData] = useState("");
    const [tasks, setTasks] = useState([]);
    const [file, setFile] = useState(null);
    //details
    const [showDetails, setShowDetails] = useState(false);
    const [taskDetails, setTaskDetails] = useState(""); // To hold the details for a selected task
    //actions
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const handleMenuOpen = (event, taskId) => {
        setAnchorEl(event.currentTarget);
        setSelectedTaskId(taskId);
    };
    
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedTaskId(null);
    };
    
    const handleDeleteTask = (taskId) => {
        taskio.deleteTask(taskId);  // Assuming you have a deleteTask method in your API
        handleMenuClose();  // Close menu after action
    };
    
    const handleCancelTask = (taskId) => {
        taskio.cancelTask(taskId);  // Assuming you have a cancelTask method in your API
        handleMenuClose();  // Close menu after action
    };
    
    useEffect(() => {
        taskio.onTasksUpdated((updatedTasks) => {
            setTasks(updatedTasks);
        });

        taskio.onServiceReadyToReceiveHeavyPayload((data) => {
            console.log("Service is ready to receive heavy payload");
            if (file) {
                taskio.sendFile(file, data);
            } else {
                console.warn("No file selected to send!");
            }
        });


    }, [file]);

    const handlePushTask = () => {
        if (clientId && taskData) {
            taskio.pushTask(taskData);
        } else {
            alert("Please provide a client ID and task data.");
        }
    };
    //NOTE: taskio.anyMethod cant be called directly from the component in the return or 
    // it is going to return a null
    const handleRefreshTask = () => {
        taskio.refreshTasks()
    }

    const handleShowDetails = (details) => {
        setTaskDetails(details);
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
        setShowDetails(false);
    };

    return (
        <Box sx={{ p: 3, maxWidth: 800, mx: "auto", textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
                Task Creator
            </Typography>

            <TextField
                label="Client ID"
                variant="outlined"
                fullWidth
                margin="normal"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
            />
            <TextField
                label="Task Data"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={taskData}
                onChange={(e) => setTaskData(e.target.value)}
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handlePushTask}>
                Push Task
            </Button>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleRefreshTask}>
                Refresh
            </Button>

            <Box sx={{ mt: 3 }}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                {file && (
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </Typography>
                )}
            </Box>

            <Typography variant="h5" sx={{ mt: 4 }} gutterBottom>
                My Tasks
            </Typography>

            <Grid container spacing={2}>
                {tasks.map((task) => (
                    <Grid item xs={12} md={6} key={task.task_id}>
                        <Box sx={{ border: "1px solid #ddd", borderRadius: "8px", p: 2, boxShadow: 2 }}>
                            <Typography variant="h6">{task.data.task}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Task ID: {task.task_id}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Owned-By {task.token}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                State: {task.state}
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Progress: {task.progress}%
                                </Typography>
                                <LinearProgress variant="determinate" value={task.progress} sx={{ height: 10, borderRadius: 5 }} />
                            </Box>

                            <Typography
                                variant="body2"
                                sx={{ color: 'blue', cursor: 'pointer', mt: 2 }}
                                onClick={() => handleShowDetails(task.data.details)}
                            >
                                Show Details
                            </Typography>

                            {/* 3-point menu for task actions */}
                            <IconButton
                                sx={{ position: 'absolute', top: 10, right: 10 }}
                                onClick={(e) => handleMenuOpen(e, task.task_id)}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={() => handleDeleteTask(task.task_id)}>Delete</MenuItem>
                                <MenuItem onClick={() => handleCancelTask(task.task_id)}>Cancel</MenuItem>
                            </Menu>
                        </Box>
                    </Grid>

                ))}
            </Grid>

            {/* Dialog to show task details */}
            <Dialog open={showDetails} onClose={handleCloseDetails}>
                <DialogTitle>Task Details</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">{taskDetails}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetails} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TaskCreator;
