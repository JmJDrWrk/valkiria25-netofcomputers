import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const ChatBox = ({disableChat=false, onSendMessage }) => {
    console.log('disable?', disableChat)
    const [input, setInput] = useState("");
    const [disableChat_, setDisableChat_] = useState(disableChat);
    const sendMessage = () => {
        if (!input.trim()) return;

        setInput("");
        setDisableChat_(true)
        onSendMessage(input)
    };
    return (
        <Box
            sx={{
                opacity: !disableChat_ ? 1 : 0.5, // Makes the box semi-transparent when disabled
                pointerEvents: !disableChat_ ? "auto" : "none", // Disables interaction when showCard is false
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
                onKeyPress={(e) => e.key === "Enter" && sendMessage(input)}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "16px", // Rounded corners for the input
                    },
                }}
            />
            <Button
                variant="contained"
                onClick={() => sendMessage(input)}
                sx={{
                    borderRadius: "16px", // Rounded corners for the button
                    height: "100%", // Ensure button height matches the input field
                }}
            >
                Send
            </Button>
        </Box>
    );
};

export default ChatBox;
