var status = "";
var objects = [];
var multi_objects = "";

function preload(){
    multi_objects = loadImage("bed.jpeg");
}

function setup(){
    canvas = createCanvas(480, 480);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded(){
    console.log("Model is loaded");
    status = true;
    objectDetector.detect(multi_objects, getResults);
}

function draw(){
    image(multi_objects, 0, 0, 480, 480);
    if(status != ""){
        document.getElementById("object_count").innerHTML = objects.length;

        for(var i = 0; i<objects.length; i++){
            fill(255, 0, 0);
            textSize(15);
            textFont('Arial');
            strokeWeight(2);
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x + 10, objects[i].y + 30);
            noFill();
            strokeWeight(5);
            stroke(255, 0, 0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
        }
    }
}

function getResults(error, results){
    if(error){
console.log(error);
    } else {
console.log(results);
objects = results;
    }
}