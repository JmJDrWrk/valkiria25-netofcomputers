import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { TextField, Button, Box, Typography, Grid, LinearProgress } from '@mui/material';

const TaskCreator = () => {
  const [socket, setSocket] = useState(null);
  const [clientId, setClientId] = useState('');
  const [taskData, setTaskData] = useState('');
  const [taskId, setTaskId] = useState(null);
  const [tasks, setTasks] = useState([]); // New state to hold the tasks

  // useEffect(() => {
  //   // Connect to the Socket.IO server with authentication
  //   const newSocket = io('wss://netofcomputers.com:5113', {
  //     transports: ['websocket'], // Ensure WebSocket transport
  //     auth: {
  //       token: 'gAAAAABniOc-qhDKELOVssGMyvQ1OmTkciDaUKCpXv3cR4mtWoLOcxUFE3yz4dXabsIeNiKyrlgqRbUyKMCJ1dnCb_a0A8JCixhxjR6l-wMIa2wwmKSbiBe5li-L4HboixS1XYQygS5Y',
  //     },
  //   });


  //   newSocket.on('connect', () => {
  //     console.log('Connected to server with SID:', newSocket.id);
  //   });

  //   newSocket.on('disconnect', () => {
  //     console.log('Disconnected from server.');
  //   });

  //   // Listen for the task_pushed event
  //   newSocket.on('task_pushed', (data) => {
  //     console.log('Task pushed event received:', data);
  //     if (data && data.task_identifier) {
  //       setTaskId(data.task_identifier); // Update taskId with received identifier
  //     }
  //   });
  //   newSocket.on('updated', (data) => {
  //     console.log('Updated--->:', data);
  //   });

  //   // Listen for the your_tasks event
  //   newSocket.on('your_tasks', (data) => {
  //     console.log('Received updated set of my tasks', data);
  //     if (data && data.tasks) {
  //       setTasks(data.tasks); // Update tasks state
  //     }
  //   });

  //   setSocket(newSocket);

  //   // Cleanup on component unmount
  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    const newSocket = io('wss://netofcomputers.com:5113', {
      transports: ['websocket'],
      auth: { token: 'gAAAAABniRf4hefWUhPluLlK5_Vwgkp-PgKFLniAJJNLTOF0oQGqNr9xbK-pxFwHE0XhQXVtV77P_VnCnUx7-Y7cbAwVNDZtKK5RJTsxh4YKZ4BRi48zsXTys1CMyjUi0u821W9FQvvlGPg4xGtvAMlsUabO6mDmMwTq0QR3DtvnJQNchLnsA2TQOU7g3Z6wU7Iwv0id8PrP' },
      reconnectionAttempts: 5,  // Allow up to 5 reconnection attempts
      reconnectionDelay: 1000,  // 1 second delay between attempts
    });

    newSocket.on('connect', () => {
      console.log('Connected to server with SID:', newSocket.id);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Disconnected from server due to:', reason);
    });

    // Handle reconnection failure
    newSocket.on('reconnect_failed', () => {
      console.error('Reconnection attempts failed.');
      alert('Failed to reconnect to the server.');
    });

    newSocket.on('task_pushed', (data) => {
      console.log('Task pushed event received:', data);
      if (data && data.task_identifier) {
        setTaskId(data.task_identifier);
      }
    });

    newSocket.on('updated', (data) => {
      console.log('Updated--->:', data);
    });

    newSocket.on('your_tasks', (data) => {
      console.log('Received updated set of my tasks', data);
      if (data && data.tasks) {
        setTasks(data.tasks);
      }
    });

    newSocket.on('service_is_ready_to_receive_heavy_payload', (data) => {
      console.log('Service is trully ready to receive your payload, press or whatever...')

    })

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handlePushTask = () => {
    if (socket && clientId && taskData) {
      let parsedTaskData;
      try {
        // Parse taskData only if it's a string
        parsedTaskData = typeof taskData === 'string' ? JSON.parse(taskData) : taskData;

        // Ensure taskData is an object
        if (typeof parsedTaskData === 'object' && parsedTaskData !== null) {
          // Force a heavy_load task
          parsedTaskData.task_type = "heavy_load";
          parsedTaskData.data = "Data needs to be streamed on pull request";
        } else {
          console.error('taskData is not a valid object');
          return;
        }
      } catch (err) {
        console.error('Cannot parse content to add heavy_load property', err);
        return; // Stop further execution if parsing fails
      }

      // Emit the task data with the heavy_load property
      socket.emit('push_task', { task: parsedTaskData });
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
                Owned-By {task.token}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                State: {task.state}
              </Typography>

              {/* Display Progress or Processed */}
              <Box sx={{ mt: 2 }}>
                {task.processed ? (
                  <Typography variant="body2" color="textSecondary">
                    Processed
                  </Typography>
                ) : (
                  <>
                    <Typography variant="body2" color="textSecondary">
                      Progress: {task.progress}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={task.progress}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  </>
                )}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};

export default TaskCreator;
