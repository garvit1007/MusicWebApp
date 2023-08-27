song = "";
song_1 = "";
LeftWristX = 0;
RightWristX = 0;
LeftWristY = 0;
RightWristY = 0;

function preload() {
    song = loadSound("music.mp3");
    song_1 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(550,500);
    canvas.position(500,200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is initialized");
}

function draw() {
    image(video, 0, 0, 550, 500);
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + LeftWristX + "Left Wrsit Y = " + LeftWristY );

        RighttWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + RightWristX + "Right Wrsit Y = " + RightWristY );
    }
}