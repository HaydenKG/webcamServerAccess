//@ts-check
const EXPRESS = require("express");
const APP = EXPRESS();
const SERVER = require("http").createServer(APP);
const PATH = require("path");
const IO = require("socket.io")(SERVER);
const PORT = 3000;
let webcamStream = undefined;

APP.use(EXPRESS.static(process.cwd()));

APP.get("/", (req, res) => {
    // console.log(req.get('user-agent'));
    var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log(ip + " conntected to basic user panel");
    res.sendFile(process.cwd() + "/view.html");
});

SERVER.listen(PORT, () => {
    console.log("listening on: " + PORT);
});

IO.on("connection", (socket) => {
    console.log("Socket connection established")

    socket.on("start_webcam", () => startWebcam())
    socket.on("stop_webcam", () => stopWebcamStream())

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        stopWebcamStream();
    })
});

function startWebcam() {
    console.debug("Camera process started");
    webcamStream = require("child_process").spawn("C:\\Users\\Hayde\\Downloads\\ffmpeg-master-latest-win64-gpl\\bin\\ffmpeg.exe", [
        // "-f",
        // "dshow",
        // "-i",
        // "video=Integrated Camera",
        // "-preset",
        // "ultrafast",
        // "-tune",
        // "zerolatency,fastdecode",
        // "-f",
        // "mjpeg",
        // "pipe:1",

        "-s",
        "1280x720",
        "-f",
        "dshow",
        "-re",
        "-thread_queue_size",
        "5096",
        "-framerate",
        "30",
        "-i",
        "video=Integrated Camera",
        "-tune",
        "fastdecode",
        "-maxrate",
        "6M",
        "-bufsize",
        "1M",
        "-q:v",
        "1",
        "-f",
        "mjpeg",
        "pipe:1"
    ]);

    webcamStream.stdout.on("data", function (data) {
        var frame = Buffer.from(data).toString("base64");
        IO.emit("webcam_img", frame);
    });

    webcamStream.on("error", (error) => {
        console.debug(`error: ${error.message}`);
    });

    webcamStream.on("close", (code) => {
        console.debug(`Webcam process exited with code ${code}`);
    });
}

function stopWebcamStream() {
    try {
        webcamStream.kill('SIGINT');
    } catch (error) {
        console.debug("Error occured during kill of webcam process." + error);
    }
}