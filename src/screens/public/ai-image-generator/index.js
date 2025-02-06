import { useState, useEffect, useRef } from "react";
import { TextField, Button, Container, Box, Typography, Card } from "@mui/material";
import { motion } from "framer-motion"; // Import framer-motion
import TaskioCard from "../../../components/util/TaskioCard"
import ChatBox from "./components/ChatBox";
import taskio from "../../../api/taskio/taskio";
const ChatGPTClone = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showCard, setShowCard] = useState(false);
  const chatEndRef = useRef(null);

  // autoscroll to latest message?? unneeded
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  // taskio implementation
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState();
  const [file, setFile] = useState(null);
  const [clientId, setClientId] = useState("any");
  const [disableChat, setDisableChat] = useState(false)


  useEffect(() => {
    taskio.refreshTasks();
    taskio.onUpdate_tasks((utasks) => {
      if (utasks.length > 0) {
        const lastTask = utasks[utasks.length - 1];
        console.log("Last Task Updated:", lastTask);
        setTask(lastTask);
        setDisableChat(lastTask.state == 'processing'); // Disable chat if not processed
      } else {
        setDisableChat(false); // Default to disabled if no tasks exist
      }
    });

    taskio.onServiceReadyToReceiveChunks((data) => {
      console.log("Service is ready to receive heavy payload");
      if (file) {
        taskio.sendFileOptimized(file, data);
      } else {
        console.warn("No file selected to send!");
      }
    });
  }, []);

  const onChatInput = (input) => {
    // taskio.taskBuilder.no_data()
    const pseudoTask = {
      "explicit_service_name": "generate_image_with_ai",
      "file": "ack.ukn",
      "use_public_files": false,
      "task_type": "no_data",
      "argdict": {
        "output_file_name": input.replaceAll(' ', '_'),
        "prompt": input,
        "steps": 1
      },
      "task_type": "no_data"
    }



    if (clientId && pseudoTask) {
      taskio.pushTask(pseudoTask);
      console.log(' Sending', pseudoTask)
    } else {
      alert("Please provide a client ID and task data.");
    }
  }
  // Function to download files
  const handleDownloadFile = (task, fileName) => {
    console.log('flint', task, fileName)
    taskio.requestFile(task, fileName);
  };
  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", height: "100vh", p: 2, justifyContent: "center", alignItems: "center" }}>


      <ChatBox disableChat={disableChat} onSendMessage={onChatInput} />

      {task && (


        <motion.div
          initial={{ opacity: 0 }} // Start with opacity 0
          animate={{ opacity: 1 }} // Animate to full opacity
          transition={{ duration: 0.5 }} // Set the duration of the fade-in
          style={{
            position: "absolute", // Position it absolutely within the parent
            top: "38%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Ensure it stays centered both horizontally and vertically
            textAlign: "center"
          }}
        >
          {/* <Card> */}
          {/* <Typography variant="h6">Your Message Has Been Sent!</Typography> */}

          <TaskioCard
            sx={{
              padding: 3,
              width: 400,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: 3,
              borderRadius: 2,
            }}
            task={task}
            handleCopyToClipboard={() => { }}
            handleDownloadFile={handleDownloadFile}
            handleShowDetails={() => { }}
            handleMenuOpen={() => { }}
            handleDeleteTask={() => { }}
            handleCancelTask={() => { }}
          >
          </TaskioCard>

          {/* </Card> */}
        </motion.div>





      )}
    </Container>
  );
};

export default ChatGPTClone;
