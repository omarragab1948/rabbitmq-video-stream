// import React, { useState, useEffect, useRef } from "react";
// import { useReactMediaRecorder } from "react-media-recorder";
// import axios from "axios";

// const Home = () => {
//   const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
//     useReactMediaRecorder({ video: true });
//   const [isRecording, setIsRecording] = useState(true); // Start recording automatically
//   const videoRef = useRef(null);
//   useEffect(() => {
//     async function openCamera() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error("Error accessing camera:", error);
//       }
//     }

//     openCamera();

//     return () => {
//       if (videoRef.current) {
//         const stream = videoRef.current.srcObject;
//         if (stream) {
//           const tracks = stream.getTracks();
//           tracks.forEach((track) => track.stop());
//         }
//       }
//     };
//   }, []);
//   useEffect(() => {
//     let intervalId;
//     console.log(status);
//     console.log(mediaBlobUrl);

//     if (isRecording) {
//       intervalId = setInterval(() => {
//         stopRecording(); // Stop the current recording
//         clearBlobUrl(); // Clear the previous blob URL

//         startRecording(); // Start a new recording
//       }, 1000);
//     } else {
//       clearInterval(intervalId); // Clear the interval when recording is stopped
//     }

//     return () => {
//       clearInterval(intervalId); // Clear the interval when component unmounts
//     };
//   }, [isRecording, startRecording, stopRecording, clearBlobUrl, mediaBlobUrl]);

//   useEffect(() => {
//     if (status === "stopped" && mediaBlobUrl) {
//       handleUpload();
//     }
//   }, [status, mediaBlobUrl]);

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append("video", mediaBlobUrl);
//     console.log("done");
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/upload",
//         formData
//       );

//       console.log("Video uploaded successfully!", response);
//     } catch (error) {
//       console.error("Error uploading video:", error);
//     }
//   };

//   return (
//     <div>
//       <div style={{ width: "400px", margin: "auto" }}>
//         <video ref={videoRef} autoPlay playsInline />
//       </div>
//     </div>
//   );
// };

// export default Home;
