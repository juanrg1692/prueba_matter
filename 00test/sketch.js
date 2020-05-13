

let video;
let hp;
let poses = [];
var col;
var xx = 640/2;
var yy = 480/2;
var xref;
var yref;
let img;
var a = 0;


  

function preload(){
  img = loadImage('nueva.jpeg');
}


function setup() {
  createCanvas(640, 480,WEBGL);
  video = createCapture(VIDEO);
  video.size(width, height);

  col = color(255,0,0); 


  hp = ml5.handPose(video, modelReady);


  hp.on('pose', function(results) {
    poses = results;
  });
  video.hide();
}

function modelReady() {
  select('#status').html('listo');
  hp.singlePose();
}

function draw() {
  background(200);
  


  var val = map(0,1,0,1);



  drawKeypoints();
  drawSkeleton();

  var rotX = map(yref,0,height,0,90);
  var rotY = map(xref,0,width,0,360);

  push();
  translate(0,0,0);
  rotateY(radians(rotY));
  //rotateX(radians(rotX));
  strokeWeight(1);
  stroke(0);
  fill(255,0,0);
  noStroke();
  texture(img);
  sphere(500);
  pop();



  image(video, -width/2, -height/2, width/4, height/4);



}


function drawKeypoints()  {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];

      let keypoint0 = pose.landmarks[8];

      xref = keypoint0[0]-xx;
      yref = keypoint0[1]-yy;
      strokeWeight(50);
      stroke(0);
      //point(keypoint0[0]-xx,keypoint0[1]-yy);

    for (let j = 0; j < pose.landmarks.length; j++) {
      let keypoint = pose.landmarks[j];

        fill(col);
        noStroke();
        ellipse(keypoint[0]-xx, keypoint[1]-yy, 10, 10);



    }
  }
}

function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    let annotations = poses[i].annotations;
    strokeWeight(1);
    stroke(col);
    for (let j = 0; j < annotations.thumb.length - 1; j++) {
 

      line(annotations.thumb[j][0]-xx, annotations.thumb[j][1]-yy, annotations.thumb[j + 1][0]-xx, annotations.thumb[j + 1][1]-yy);
    }
    for (let j = 0; j < annotations.indexFinger.length - 1; j++) {
      line(annotations.indexFinger[j][0]-xx, annotations.indexFinger[j][1]-yy, annotations.indexFinger[j + 1][0]-xx, annotations.indexFinger[j + 1][1]-yy);
    }
    for (let j = 0; j < annotations.middleFinger.length - 1; j++) {
      line(annotations.middleFinger[j][0]-xx, annotations.middleFinger[j][1]-yy, annotations.middleFinger[j + 1][0]-xx, annotations.middleFinger[j + 1][1]-yy);
    }
    for (let j = 0; j < annotations.ringFinger.length - 1; j++) {
      line(annotations.ringFinger[j][0]-xx, annotations.ringFinger[j][1]-yy, annotations.ringFinger[j + 1][0]-xx, annotations.ringFinger[j + 1][1]-yy);
    }
    for (let j = 0; j < annotations.pinky.length - 1; j++) {
      line(annotations.pinky[j][0]-xx, annotations.pinky[j][1]-yy, annotations.pinky[j + 1][0]-xx, annotations.pinky[j + 1][1]-yy);
    }

    line(annotations.palmBase[0][0]-xx, annotations.palmBase[0][1]-yy, annotations.thumb[0][0]-xx, annotations.thumb[0][1]-yy);
    line(annotations.palmBase[0][0]-xx, annotations.palmBase[0][1]-yy, annotations.indexFinger[0][0]-xx, annotations.indexFinger[0][1]-yy);
    line(annotations.palmBase[0][0]-xx, annotations.palmBase[0][1]-yy, annotations.middleFinger[0][0]-xx, annotations.middleFinger[0][1]-yy);
    line(annotations.palmBase[0][0]-xx, annotations.palmBase[0][1]-yy, annotations.ringFinger[0][0]-xx, annotations.ringFinger[0][1]-yy);
    line(annotations.palmBase[0][0]-xx, annotations.palmBase[0][1]-yy, annotations.pinky[0][0]-xx, annotations.pinky[0][1]-yy);
  }
}
