import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Grid, LinearProgress } from "@mui/material";
import taskio from "../../api/taskio/taskio";

const TaskCreator = () => {
  const [clientId, setClientId] = useState("");
  const [taskData, setTaskData] = useState("");
  const [tasks, setTasks] = useState([]);
  const [file, setFile] = useState(null);

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

    taskio.refreshTasks();
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
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TaskCreator;
