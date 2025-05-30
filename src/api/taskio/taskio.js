import io from "socket.io-client";
import pako from 'pako';
class TaskIo {
  constructor() {
    this.socket = io("wss://netofcomputers.com:5113", {
      transports: ["websocket"],
      auth: {
        token:
          "gAAAAABniRf4hefWUhPluLlK5_Vwgkp-PgKFLniAJJNLTOF0oQGqNr9xbK-pxFwHE0XhQXVtV77P_VnCnUx7-Y7cbAwVNDZtKK5RJTsxh4YKZ4BRi48zsXTys1CMyjUi0u821W9FQvvlGPg4xGtvAMlsUabO6mDmMwTq0QR3DtvnJQNchLnsA2TQOU7g3Z6wU7Iwv0id8PrP",
      },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on("connect", () => {
      console.log("Connected to server with SID:", this.socket.id);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Disconnected from server due to:", reason);
    });
    //update_now->
    this.socket.on("update_now", () => {
      console.log("Update is requested by server!");
      this.socket.emit("request_current_tasks");
    });

    this.socket.on("response_current_tasks", (data) => {
      console.log("Received updated set of my tasks", data);
      if (this.tasksCallback) this.tasksCallback(data.tasks);
    });

    this.socket.on("service_is_ready_to_receive_heavy_payload", (data) => {
      console.log("Service is ready to receive payload:", data);
      if (this.heavyPayloadCallback) this.heavyPayloadCallback(data);
    });

    this.socket.on("service_will_not_be_ready_to_receive_heavy_payload", (data) => {
      console.log("Not need to send payload:", data);
    })

    this.socket.on("service_to_web_chunk", (chunk) => {
      this.handleReceivedChunk(chunk);
    })
  }

  onUpdate_tasks(callback) {
    this.tasksCallback = callback;
  }

  onServiceReadyToReceiveChunks(callback) {
    this.heavyPayloadCallback = callback;
  }

  pushTask(taskData) {
    try {
      let payload = {
        data: typeof taskData === "string" ? JSON.parse(taskData) : taskData,
      };
      payload.task_type = payload.data.task_type;
      console.log(" socket.emit ... push_task", { task: payload });
      this.socket.emit("push_task", { task: payload });
    } catch (err) {
      console.error("Error parsing task data:", err);
    }
  }

  deleteTask(task) {
    console.log('deleting task', task)
    this.socket.emit('delete_task', task)
  }

  refreshTasks() {
    this.socket.emit("request_current_tasks");
  }
  
  sendFileOptimized(file, task) {
    console.log('omptimz')
    if(task.data.client_side_compression){
      this.compressAndSendFile(file, task)
    } else {
      this.sendFile(file, task)
    }
  }

  compressAndSendFile(file, task) {
    const CHUNK_SIZE = 1024 * 512; // 512 KB per chunk
  
    // Ensure there are at least 2 chunks, even for small files
    const totalChunks = Math.max(2, Math.ceil(file.size / CHUNK_SIZE));
  
    let currentChunk = 0;
    const reader = new FileReader();
  
    reader.onload = (event) => {
      // Compress the file chunk using pako
      const compressedData = pako.deflate(event.target.result);
  
      const chunkData = {
        task,
        chunkNumber: currentChunk,
        totalChunks,
        file_name: file.name,
        file_type: file.type,
        data: compressedData,
      };
  
      this.socket.emit("web_to_service_chunk", chunkData);
  
      console.log(`Sent chunk ${currentChunk + 1} of ${totalChunks}`);
  
      currentChunk++;
      if (currentChunk < totalChunks) {
        readNextChunk();
      } else {
        console.log("File transfer complete. end_pushing_data");
        task.file_name = file.name;
        task.file_type = file.type;
        this.socket.emit("end_web_to_service_chunks", task);
      }
    };
  
    const readNextChunk = () => {
      const start = currentChunk * CHUNK_SIZE;
      const end = Math.min(file.size, start + CHUNK_SIZE);
      reader.readAsArrayBuffer(file.slice(start, end));
    };
  
    readNextChunk();
  }
  
  sendFile(file, task) {
    const CHUNK_SIZE = 1024 * 512; // 512 KB per chunk

    // Ensure there are at least 2 chunks, even for small files
    const totalChunks = Math.max(2, Math.ceil(file.size / CHUNK_SIZE));

    let currentChunk = 0;
    const reader = new FileReader();

    reader.onload = (event) => {
      const chunkData = {
        task,
        chunkNumber: currentChunk,
        totalChunks,
        file_name: file.name,
        file_type: file.type,
        data: event.target.result,
      };

      this.socket.emit("web_to_service_chunk", chunkData);

      console.log(`Sent chunk ${currentChunk + 1} of ${totalChunks}`);

      currentChunk++;
      if (currentChunk < totalChunks) {
        readNextChunk();
      } else {
        console.log("File transfer complete. end_pushing_data");
        task.file_name = file.name;
        task.file_type = file.type;
        this.socket.emit("end_web_to_service_chunks", task);
      }
    };

    const readNextChunk = () => {
      const start = currentChunk * CHUNK_SIZE;
      const end = Math.min(file.size, start + CHUNK_SIZE);
      reader.readAsArrayBuffer(file.slice(start, end));
    };

    readNextChunk();
  }

  requestFile(task, fileName){
    console.log('Hwllo')
    // console.log('requesting file', task)
    task['data']['file_name'] = fileName
    this.socket.emit("request_file_from_task", task);
  }
  fileChunks = {};
  totalChunks = {};
  handleReceivedChunk (chunk) {
    const { task, file_name, chunk_number, total_chunks, data } = chunk;
    const task_id = task['task_id']
    if (!this.fileChunks[task_id]) {
      this.fileChunks[task_id] = [];
      this.totalChunks[task_id] = total_chunks;
    }

    this.fileChunks[task_id][chunk_number] = data;

    console.log(`Received chunk ${chunk_number + 1} of ${total_chunks} for ${file_name}`);

    // If all chunks are received, reconstruct the file
    if (this.fileChunks[task_id].length === total_chunks) {
      this.handleFileDownload(task_id, file_name);
    }
  };

  handleFileDownload = (task_id, file_name) => {
    if (!this.fileChunks[task_id] || this.fileChunks[task_id].length !== this.totalChunks[task_id]) {
      console.log(`Waiting for all chunks of ${file_name}...`);
      return;
    }

    const fileBlob = new Blob(this.fileChunks[task_id], { type: "application/octet-stream" });
    const url = URL.createObjectURL(fileBlob);

    const a = document.createElement("a");
    a.href = url;
    a.download = file_name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log(`File ${file_name} downloaded successfully!`);

    // Cleanup
    delete this.fileChunks[task_id];
    delete this.totalChunks[task_id];
  };
}


const taskio = new TaskIo();
export default taskio;
