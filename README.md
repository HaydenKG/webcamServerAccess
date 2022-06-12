# webcamServerAccess
A basic setup for accessing a camera of a server for e.g. remote maintenance or event-streaming directly to a website

To get the ffmpeg exe for the camera stream:
https://github.com/BtbN/FFmpeg-Builds/releases


All following cmd commands are for windows

To get all the capture devices: 
-list_devices true -f dshow -i dummy

To get the capabilities of the camera one uses: 
ffmpeg -f dshow -list_options true -i video="YOUR CAMERA NAME"

Different ffmpeg parameters work best for different cameras.
E.g.: 

Lenovo Laptop: 
 Pure basic: 
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

    Best quality:
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

Dell Laptop:
  "-s",
    "1280x720",
    "-f",
    "dshow",
    "-re",
    "-thread_queue_size",
    "5096",
    "-framerate",
    "30",
    "-c:v",
    "mjpeg",
    "-i",
    "video=Integrated Webcam",
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