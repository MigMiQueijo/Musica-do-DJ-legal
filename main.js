var musica = ""
var pulsoEsquerdoX =  0
var pulsoEsquerdoY =  0
var pulsoDireitoY =  0
var pulsoDireitoX =  0
var scoreRight = 0
var scoreLeft = 0
    function preload(){
    musica = loadSound("music.mp3")
}
function setup(){
    canvas = createCanvas(400, 400)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
}
function draw(){
    image(video, 0, 0, 400, 400)
    fill("red")
    stroke("black")
    if (scoreRight > 0.2) {
        circle(pulsoDireitoX, pulsoDireitoY, 20)
        velocidade = 1
        if (pulsoDireitoY< 150) {
            velocidade = 0.5
            musica.rate(velocidade)
            document.getElementById("velocity").innerHTML = "0.5"
        }
        else if(pulsoDireitoY>150 && pulsoDireitoY<250){
            velocidade = 1
            musica.rate(velocidade)
            document.getElementById("velocity").innerHTML = "1"
        }
        else if(pulsoDireitoY>250 && pulsoDireitoY<320){
            velocidade = 2
            musica.rate(velocidade)
            document.getElementById("velocity").innerHTML = "2"
        }
        else if(pulsoDireitoY>320){
            velocidade = 2.5
            musica.rate(velocidade)
            document.getElementById("velocity").innerHTML = "2.5"
        }
    }
    if (scoreLeft > 0.2) {
        circle(pulsoEsquerdoX, pulsoEsquerdoY, 20)
        numeroLeft = Number(pulsoEsquerdoY)
        numeroLeft = floor(pulsoEsquerdoY)
        console.log(numeroLeft)
        Oolume = numeroLeft/500
        musica.setVolume(Oolume)
        document.getElementById("sound").innerHTML = Oolume;
    }

}

function modelLoaded(){
    console.log("qualquer coisa aí")
}

function gotPoses(results) {
    if (results.length > 0) {
        pulsoEsquerdoX = results[0].pose.leftWrist.x -160
        pulsoEsquerdoY = results[0].pose.leftWrist.y
        pulsoDireitoY = results[0].pose.rightWrist.y  
        pulsoDireitoX = results[0].pose.rightWrist.x -100
        scoreLeft = results[0].pose.keypoints[9].score
        scoreRight = results[0].pose.keypoints[10].score
    }
}
function Comecar(){
    musica.play()
    musica.setVolume(1)
    musica.rate(1)
}