import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { TextField, Button, Box, Typography, Grid, LinearProgress } from '@mui/material';

const TaskCreator = () => {
  const [socket, setSocket] = useState(null);
  const [clientId, setClientId] = useState('');
  const [taskData, setTaskData] = useState('');
  const [taskId, setTaskId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [file, setFile] = useState(null); // State to hold the selected file

  useEffect(() => {
    const newSocket = io('wss://netofcomputers.com:5113', {
      transports: ['websocket'],
      auth: { token: 'gAAAAABniRf4hefWUhPluLlK5_Vwgkp-PgKFLniAJJNLTOF0oQGqNr9xbK-pxFwHE0XhQXVtV77P_VnCnUx7-Y7cbAwVNDZtKK5RJTsxh4YKZ4BRi48zsXTys1CMyjUi0u821W9FQvvlGPg4xGtvAMlsUabO6mDmMwTq0QR3DtvnJQNchLnsA2TQOU7g3Z6wU7Iwv0id8PrP' },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      console.log('Connected to server with SID:', newSocket.id);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Disconnected from server due to:', reason);
    });
    newSocket.on('update_now', (data) => {
      console.log('update is requested by server!')
      newSocket.emit('my_tasks')
    });
    newSocket.on('your_tasks', (data) => {
      console.log('Received updated set of my tasks', data);
      if (data && data.tasks) {
        setTasks(data.tasks);
      }
    });
    // Listen for service readiness
    newSocket.on('service_is_ready_to_receive_heavy_payload', (data) => {
      console.log('Service is ready to receive payload:', data);
      if (file) {
        sendFile(newSocket, file, data);
      } else {
        console.warn('No file selected to send!');
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [file]); // Rerun effect if the file changes

  const sendFile = (socket, file, task) => {
    const CHUNK_SIZE = 1024 * 512; // 1 MB per chunk
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    const reader = new FileReader();
    let currentChunk = 0;

    reader.onload = (event) => {
      const chunkData = {
        task,
        chunkNumber: currentChunk,
        totalChunks,
        file_name: file.name,
        file_type: file.type,
        data: event.target.result, // Binary data
      };

      socket.emit('push_task_data', chunkData);
      // Calculate the upload progress
      const progressUpload = Math.round((currentChunk / totalChunks) * 100);

      // Update the specific task's progress_upload
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.task_id === task.task_id ? { ...t, progress_upload: progressUpload } : t
        )
      );
      console.log(`Sent chunk ${currentChunk + 1} of ${totalChunks}`, chunkData);

      currentChunk++;
      if (currentChunk < totalChunks) {
        readNextChunk();
      } else {
        console.log('File transfer complete. end_pushing_data');
        task.file_name = file.name
        task.file_type = file.type
        socket.emit('end_pushing_data', task);
      }
    };

    const readNextChunk = () => {
      const start = currentChunk * CHUNK_SIZE;
      const end = Math.min(file.size, start + CHUNK_SIZE);
      reader.readAsArrayBuffer(file.slice(start, end));
    };

    readNextChunk();
  };

  const handleRefresh = () => {
    socket.emit('my_tasks');
  }

  const handlePushTask = () => {
    if (socket && clientId && taskData) {
      let parsedTaskData;
      let __payload__ = {
          
      }
      try {

        parsedTaskData = typeof taskData === 'string' ? JSON.parse(taskData) : taskData;
        __payload__.task_type = 'heavy_load';
        __payload__.data = parsedTaskData
      } catch (err) {
        console.error('Error parsing task data:', err);
        return;
      }
      console.log('push_task', { task: __payload__ })
      socket.emit('push_task', { task: __payload__ });
    } else {
      alert('Please provide a client ID and task data.');
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
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
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleRefresh}>
        Refresh
      </Button>

      <Box sx={{ mt: 3 }}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </Typography>
        )}
      </Box>
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
              <Box sx={{ mt: 2 }}>
                {task.processed ? (
                  <Typography variant="body2" color="textSecondary">
                    Processed
                  </Typography>
                ) : (
                  <>
                    <Typography variant="body2" color="textSecondary">
                      Progress: {task.progress_upload}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={task.progress_upload}
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
