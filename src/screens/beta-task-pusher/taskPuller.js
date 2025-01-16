import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { TextField, Button, Box, Typography, Grid, LinearProgress } from '@mui/material';

const TaskConsumer = () => {
  const [socket, setSocket] = useState(null);
  const [clientId, setClientId] = useState('');
  const [taskData, setTaskData] = useState('');
  const [taskId, setTaskId] = useState(null);
  const [tasks, setTasks] = useState([]); // New state to hold the tasks

  useEffect(() => {
    // Connect to the Socket.IO server
    // Connect to the Socket.IO server with authentication
    const socket = io('wss://netofcomputers.com:4999', {
      transports: ['websocket'], // Ensure WebSocket transport
      auth: {
        token: 'your-auth-token-here', // Replace with your actual token
      },
    });
    // // Register this client as a controller
    // newSocket.emit('mg25_reg_as_controller', {
    //   token: localStorage.getItem('hash'),
    //   workerName: 'valkiria24-web-lemon',
    // });

    // // Define the event listener for catching active workers
    // const catchActiveWorkers = (workers) => {
    //   setActiveWorkers(workers);
    //   console.log('The active workers...', workers);
    // };

    newSocket.on('connect', () => {
      console.log('Connected to server with SID:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server.');
    });

    // Listen for the task_pushed event
    newSocket.on('task_pushed', (data) => {
      console.log('Task pushed event received:', data);
      if (data && data.task_identifier) {
        setTaskId(data.task_identifier); // Update taskId with received identifier
      }
    });
    newSocket.on('updated', (data) => {
      console.log('Updated--->:', data);
    });

    // Listen for the your_tasks event
    newSocket.on('your_tasks', (data) => {
      console.log('Received updated set of my tasks', data);
      if (data && data.tasks) {
        setTasks(data.tasks); // Update tasks state
      }
    });

    setSocket(newSocket);

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handlePushTask = () => {
    if (socket && clientId && taskData) {
      const taskPayload = { client_id: clientId, task_data: taskData };
      socket.emit('push_task', clientId, { task: taskData });
    } else {
      alert('Please provide a client ID and task data.');
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Task Creator
      </Typography>

      {/* Task Input Form */}
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
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handlePushTask}
      >
        Push Task
      </Button>

      {taskId && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Task pushed successfully! Task ID: <strong>{taskId}</strong>
        </Typography>
      )}

      {/* Display Tasks */}
      <Typography variant="h5" sx={{ mt: 4 }} gutterBottom>
        My Tasks
      </Typography>

      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item xs={12} md={6} key={task.task_id}>
            <Box
              sx={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                p: 2,
                boxShadow: 2,
              }}
            >
              <Typography variant="h6">{task.data.task}</Typography>
              <Typography variant="body2" color="textSecondary">
                Task ID: {task.task_id}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Client ID: {task.client_id}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                State: {task.state}
              </Typography>

              {/* Display Progress */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Progress: {task.progress}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={task.progress}
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TaskConsumer;
