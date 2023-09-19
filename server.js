import path from "path";
import express from "express";
import cors from "cors";
import multer from "multer";
import amqp from "amqplib"; // Import the amqplib library
const app = express();
const port = 3000;
app.use(cors());

// Configure Multer to handle file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, Date.now() + extname);
  },
});

const upload = multer({ storage });

// Establish a connection to RabbitMQ server when the application starts
let connection;
(async () => {
  try {
    connection = await amqp.connect(
      "amqps://mzgsorhe:7WpAYGIA2shm6vHUT7yVrw9EO_gLHtj5@chimpanzee.rmq.cloudamqp.com/mzgsorhe"
    );
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
})();

// Define a route for video uploads
app.post("/upload", upload.single("video"), async (req, res) => {
  const uploadedVideo = req.body.video;
  try {
    if (!connection) {
      throw new Error("RabbitMQ connection is not established");
    }

    const channel = await connection.createChannel();

    const queueName = "videoUploadQueue"; // Specify the queue name

    // Send a message to the RabbitMQ queue
    await channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(uploadedVideo));

    console.log("Message sent to RabbitMQ:", uploadedVideo);

    // Close the channel (do not close the connection to reuse)
    await channel.close();

    res.status(200).json({ message: "Video uploaded successfully" });
  } catch (error) {
    console.error("Error sending message to RabbitMQ:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
