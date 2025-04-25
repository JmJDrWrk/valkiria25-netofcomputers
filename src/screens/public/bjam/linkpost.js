//This class is for allowing friends push youtube video links that later in the bjam will be played
// src/pages/SubmitLink.js
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

const SubmitLink = () => {
  const [link, setLink] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidYouTube = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(link);
    if (!isValidYouTube) {
      setStatus({ type: "error", message: "Please enter a valid YouTube link." });
      return;
    }

    try {
      const response = await fetch("https://netofcomputers.com:3090/tbotw/ytLink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ youtubeLink: link }),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error");
      }

      setStatus({ type: "success", message: "Link submitted successfully!" });
      setLink("");
    } catch (error) {
      setStatus({
        type: "error",
        message: "There was an error submitting the link. Try again later.",
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Share a YouTube Track
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Paste a YouTube link you want to share with the bjam crew.
      </Typography>

      {status && (
        <Alert severity={status.type} sx={{ mb: 3 }}>
          {status.message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="YouTube Link"
          variant="outlined"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Button variant="contained" type="submit" fullWidth>
          Submit Link
        </Button>
      </Box>
    </Container>
  );
};

export default SubmitLink;
