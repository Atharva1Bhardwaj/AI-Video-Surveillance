video = "";
status = "";
objects = [];
function setup(){
    canvas = createCanvas(400, 300);
    canvas.center();
}
function preload(){
    video = createVideo("video.mp4");
    video.hide();
}
function draw(){
    image(video, 0, 0, 400, 300);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Detected Objects !";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are :" + objects.length;

            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x,objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded(){
    console.log("Model is Loaded !");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error, results) {
   if (error){
    console.log(error);
   }
   else {
    console.log(results);
    objects = results;
   }
}