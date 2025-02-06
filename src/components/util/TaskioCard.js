import React, { useState } from "react";
import { Box, Typography, Chip, CircularProgress, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import taskio from "../../api/taskio/taskio";
import { fontSize } from "@mui/system";
import './taskio.css'
const TaskioCard =
  ({
    task,
    handleCopyToClipboard,
    handleDownloadFile,
    handleShowDetails,
    handleMenuOpen,
    handleDeleteTask,
    handleCancelTask,
    minimalInfo = false
  }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const handleMenuClose = () => {
      setAnchorEl(null);
      setSelectedTaskId(null);
    };

    return (
      <Box sx={{ border: "1px solid #ddd", borderRadius: "8px", p: 2, boxShadow: 2, position: "relative" }}>
        {minimalInfo && (
          <>
            <Typography variant="h6">{task.data.task}</Typography>
            <Typography variant="body2" color="textSecondary">
              Task ID: {task.task_id}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Owned-By{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => handleCopyToClipboard(task.token)}
              >
                Copy
              </span>
            </Typography>
          </>
        )

        }

        {/* Displaying progress bar or Circular progress based on task state */}
        {task.state === "uploading" && (

          <Box sx={{ position: "relative", display: "inline-flex", mt: 2 }}>
            <CircularProgress
              variant="determinate"
              value={task.progress}
              size={100}
              thickness={4}
              sx={{
                color: "#e0e0e0",
                borderRadius: "50%",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontWeight: "bold",
                color: "#3f51b5",
              }}
            >
              {minimalInfo ? (
                <Typography variant="h6">{task.progress}%</Typography>
              ) : (
                <Typography variant="h6">Uploading Data</Typography>
              )}
            </Box>
          </Box>
        )}

        {task.state === "processing" ? (
          <Box sx={{ position: "relative", display: "inline-flex", mt: 2, animation: "blink 1.5s infinite ease-in-out" }}>
            <CircularProgress
              size={100}
              thickness={4}
              sx={{
                color: "#4f4f4f",
                animationDuration: "1150ms",
                // animation: "blink 0.5s infinite ease-in-out"
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontWeight: "bold",
                color: "#3f51b5",

              }}
            >
              {minimalInfo ? (
                <Typography variant="h6">{task.progress}%</Typography>
              ) : (
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "0.85rem",
                    color: "black",
                    // animation: "blink 1.5s infinite ease-in-out"
                  }}
                >
                  generating image...
                </Typography>
              )}
            </Box>
          </Box>
        ) : (
          <Chip
            label={task.state}
            color="primary"
            sx={{
              borderRadius: "16px",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: "bold",
              marginTop: "8px",
              display: "inline-block",
            }}
          />
        )}

        {/* Display available files for download */}
        {task.data.files && task.data.files.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Files available for download:
            </Typography>
            {task.data.files.map((file, index) => (
              <Button
                key={index}
                variant="outlined"
                onClick={() => handleDownloadFile(task, file.name)}
              >
                Download {file.name}
              </Button>
            ))}
          </Box>
        )}

        {/* Show Details button */}
        {minimalInfo && (
          <Typography
            variant="body2"
            sx={{ color: "blue", cursor: "pointer", mt: 2 }}
            onClick={() => handleShowDetails(task.data.details)}
          >
            Show Details
          </Typography>

        )}
        {/* 3-point menu for task actions */}
        {minimalInfo && (
          <>
            <IconButton
              sx={{ position: "absolute", top: 10, right: 10 }}
              onClick={(e) => handleMenuOpen(e, task.task_id)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedTaskId === task.task_id}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleDeleteTask(task.task_id)}>Delete</MenuItem>
              <MenuItem onClick={() => handleCancelTask(task.task_id)}>Cancel</MenuItem>
            </Menu>
          </>
        )}
      </Box>
    );
  };

export default TaskioCard;
