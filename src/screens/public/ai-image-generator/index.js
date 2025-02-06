import { useState, useEffect, useRef } from "react";
import { TextField, Button, Container, Box, Paper, Typography, Card } from "@mui/material";

const ChatGPTClone = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showCard, setShowCard] = useState(false); // New state to control card visibility
  const chatEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // Simulate AI response delay
    setTimeout(() => {
      setMessages([...newMessages, { text: "Thinking...", sender: "ai" }]);
      setTimeout(() => {
        setMessages([...newMessages, { text: "Here's my response!", sender: "ai" }]);
      }, 1000);
    }, 500);

    // Show the card and hide the input box after message is sent
    setShowCard(true);
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        p: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Chatbox input area, which disappears after sending a message */}
      {(
        <Box
          sx={{
            opacity: !showCard ? 1 : 0.5, // Makes the box semi-transparent when disabled
            pointerEvents: !showCard ? "auto" : "none", // Disables interaction when showCard is false
            display: "flex",
            // Optionally, you can add a grayish background to indicate it's disabled
            backgroundColor: !showCard ? "initial" : "gray",
            display: "flex",
            gap: 1,
            mt: 2,
            border: "1px solid #ddd", // Optional border for the box
            padding: 2, // Add padding for the box
            borderRadius: "8px", // Rounded corners for the box
            boxShadow: 2, // Optional shadow to make it stand out
            width: "100%", // Ensures it's taking up available width
            maxWidth: 500, // Restrict the max width of the input box
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px", // Rounded corners for the input
              },
            }}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            sx={{
              borderRadius: "16px", // Rounded corners for the button
              height: "100%", // Ensure button height matches the input field
            }}
          >
            Send
          </Button>
        </Box>
      )}

      {/* Card that pops up after sending a message */}
      {showCard && (
        <Card
          sx={{
            padding: 3,
            width: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: 3,
            borderRadius: 2,
            position: "absolute",
            top: "50%",
            // mt: 8,
            transform: "translateY(-50%)", // Center the card vertically
          }}
        >
          <Typography variant="h6">Your Message Has Been Sent!</Typography>
        </Card>
      )}
    </Container>
  );
};

export default ChatGPTClone;
