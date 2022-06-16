# webcamServerAccess
A basic setup for accessing a camera of a server for e.g. remote maintenance or event-streaming directly to a website


## Getting started

Make sure you have ffmpeg installed for the camera stream:
https://github.com/BtbN/FFmpeg-Builds/releases

as well as NodeJS.

All following cmd commands are for windows.

To get all the capture devices: 
-list_devices true -f dshow -i dummy

To get the capabilities of the camera one uses: 
ffmpeg -f dshow -list_options true -i video="YOUR CAMERA NAME"

Different ffmpeg parameters work best for different cameras.
E.g.: 

Lenovo Laptop: 
 Pure basic: 
```
     "-f",
        "dshow",
        "-i",
        "video=Integrated Camera",
        "-preset",
        "ultrafast",
        "-tune",
        "zerolatency,fastdecode",
        "-f",
        "pipe:1",
        "mjpeg",
```
Best quality:
```
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
```

Dell Laptop:
```
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
```

Sometimes it can be a struggle to format nodejs process paramter calls back to cmd execution paramters for testing. For that purpose you can use my [string-format-helper](https://haydenkg.github.io/helpertools/)

## Run the application
Open the project in VS code, adapt the code so it works with the camera you want to use (check the ffmpeg commands above). 

Enter npm install in the cmd of VS code so all the needed packages (express, socket.io) are being installed. 
Start the server by executing
``
node server
``
and opening the browser with either localhost:3000/ or the IP address that you PC has (make sure to allow NodeJS access to your private network to reach it from another one in that network) 


