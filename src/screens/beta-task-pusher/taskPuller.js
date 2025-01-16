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
    // Connect to the Socket.IO server with authentication

    /**
     * This is the fake task puller,
     * it is a worker with services
     * a worker has the service keys = what services it offers
     * priority that will be used later
     * compute status
     * max ram, cpu, temp etc EVERYTHING IS COMMING AT THE END
     * and too EACH SERVICE has a lot of params
     *  maximum per service
     *  isasync
     *  estimatedCostPerTask
     * 
     * Important is to be able to pull a task fake process it sending progress feedback
     */
    const newSocket = io('wss://netofcomputers.com:5113', {
      transports: ['websocket'], // Ensure WebSocket transport
      auth: {
        token: 'gAAAAABniRtNF9yC1vKcMXIbKxjusqQpJ3tkvapaYlnaWFv3LDGx6sajuePuJdgwUHH7dlzIFsYKSXp9bdim7vJBvIDxLucNcIH3XUiFZBbuBHrVhPAplNkLxtB6m313ytTeuJv5Be78e3E0fGwqs7wEVAPAjf-C2nvsQxzDShcF4BSHv1iXKUNu0Ay5vMfGiO2CY-ECCAho0L4S8aT5Yr65egy6RwZV1Q==',
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

    newSocket.on('begin_process', (task) => {
      console.log('processing task', task);

      let progress = 0; // Initialize the progress value

      // Set an interval to increment the progress every 5 seconds
      const interval = setInterval(() => {
        progress += 20; // Increment the progress by 5
        task.progress = progress; // Update the task's progress

        console.log(`Task progress: ${task.progress}%`);
        newSocket.emit('update_task', task)
        // If progress reaches or exceeds 100, clear the interval
        if (progress >= 100) {
          clearInterval(interval);
          console.log('Task complete');
          task.processed=true
          task.pulled=true
          task.state="Ended"
          newSocket.emit('task_ended', task)
        }
      }, 500); // 5000ms = 5 seconds
    });


    // // Listen for the task_pushed event
    // newSocket.on('task_pushed', (data) => {
    //   console.log('Task pushed event received:', data);
    //   if (data && data.task_identifier) {
    //     setTaskId(data.task_identifier); // Update taskId with received identifier
    //   }
    // });
    // newSocket.on('updated', (data) => {
    //   console.log('Updated--->:', data);
    // });

    // // Listen for the your_tasks event
    // newSocket.on('your_tasks', (data) => {
    //   console.log('Received updated set of my tasks', data);
    //   if (data && data.tasks) {
    //     setTasks(data.tasks); // Update tasks state
    //   }
    // });

    setSocket(newSocket);

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handlePushTask = () => {

    let taskId = ''
    socket.emit('pull_task', taskId);

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
        Pull Task
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
