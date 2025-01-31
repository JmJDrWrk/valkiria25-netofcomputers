import io from "socket.io-client";

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

    this.socket.on("update_now", () => {
      console.log("Update is requested by server!");
      this.socket.emit("my_tasks");
    });

    this.socket.on("your_tasks", (data) => {
      console.log("Received updated set of my tasks", data);
      if (this.tasksCallback) this.tasksCallback(data.tasks);
    });

    this.socket.on("service_is_ready_to_receive_heavy_payload", (data) => {
      console.log("Service is ready to receive payload:", data);
      if (this.heavyPayloadCallback) this.heavyPayloadCallback(data);
    });
  }

  onTasksUpdated(callback) {
    this.tasksCallback = callback;
  }

  onServiceReadyToReceiveHeavyPayload(callback) {
    this.heavyPayloadCallback = callback;
  }

  pushTask(taskData) {
    try {
      let payload = {
        task_type: "heavy_load",
        data: typeof taskData === "string" ? JSON.parse(taskData) : taskData,
      };
      console.log("push_task", { task: payload });
      this.socket.emit("push_task", { task: payload });
    } catch (err) {
      console.error("Error parsing task data:", err);
    }
  }

  refreshTasks() {
    this.socket.emit("my_tasks");
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

      this.socket.emit("push_task_data", chunkData);

      console.log(`Sent chunk ${currentChunk + 1} of ${totalChunks}`);

      currentChunk++;
      if (currentChunk < totalChunks) {
        readNextChunk();
      } else {
        console.log("File transfer complete. end_pushing_data");
        task.file_name = file.name;
        task.file_type = file.type;
        this.socket.emit("end_pushing_data", task);
      }
    };

    const readNextChunk = () => {
      const start = currentChunk * CHUNK_SIZE;
      const end = Math.min(file.size, start + CHUNK_SIZE);
      reader.readAsArrayBuffer(file.slice(start, end));
    };

    readNextChunk();
  }

}

const taskio = new TaskIo();
export default taskio;
