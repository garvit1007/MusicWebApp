song = "";
song_1 = "";
LeftWristX = 0;
RightWristX = 0;
LeftWristY = 0;
RightWristY = 0;
scoreLeftWrist = 0;
StatusOfSong_1 = "";
scoreRightWrist = 0;
StatusOfSong_2 = "";

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

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw() {
    image(video, 0, 0, 550, 500);

    StatusOfSong_1 = song.isPlaying();
    fill("red");
    stroke("red");
    if(scoreLeftWrist > 0.2) {
        circle(LeftWristX, LeftWristY, 20);
        song_1.stop();
        if(StatusOfSong_1 == false) {
            song.play();
            document.getElementById("song_name").innerHTML = "Song Name is Song 1";
        }
    }

    StatusOfSong_2 = song_1.isPlaying();
    fill("red");
    stroke("red");
    if(scoreRightWrist > 0.2) {
        circle(RightWristX, RightWristY, 20);
        song.stop()
        if(StatusOfSong_2 == false) {
            song_1.play();
            document.getElementById("song_name").innerHTML = "Song Name is Song 2";
        }
    }
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + LeftWristX + "Left Wrsit Y = " + LeftWristY );

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score of Left wrist = " + scoreLeftWrist);

        RighttWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + RightWristX + "Right Wrsit Y = " + RightWristY );

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of Right wrist = " + scoreRightWrist);
    }
}