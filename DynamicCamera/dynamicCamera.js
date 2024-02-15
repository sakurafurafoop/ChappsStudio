let canvas;
let cam;
let camShader;
let mixShader;
let prevFrames; // 10フレームを保存する配列
let isCamera; // カメラが使用できるかどうか
let isPush; // ボタンを押しているかどうか
let isDraw; // 絵を描き続けるかどうか
const RATE = 10; // frameRate
const FRAMES = 5;
let btnPush;
let btnSave;
let btnReset;

function preload(){
    camShader = loadShader('cam.vert', 'cam.frag');
    mixShader = loadShader('cam.vert', 'mix.frag');
}

function setup(){
    isCamera = false;
    isPush = false;
    frameRate(RATE);
    // buttonの設定
    btnPush = document.getElementById('btn_push');
    btnPush.disabled = true;
    btnPush.onclick = pressPush;
    btnPush.addEventListener('mousedown', pressPush);
    btnSave = document.getElementById('btn_save');
    btnSave.onclick = saveImg;
    btnSave.disabled = true;
    btnReset = document.getElementById('btn_reset');
    btnReset.onclick = reset;
    btnReset.disabled = true;
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    cam = createCapture({
        audio: false,
        video: {facingMode: "environment"}},
        function(){
            isCamera = true;
            btnPush.disabled = false;
        }
    );
    cam.size(windowWidth, windowHeight);
    cam.hide();
    setFrames();
}

function setFrames(){
    prevFrames = [];
    for(let i = 0; i < FRAMES; i++){
        prevFrames.push(createGraphics(windowWidth, windowHeight, WEBGL));
    }
}

//　実質フレームの初期化関数
function initFrames(){
    btnSave.disabled = true;
    btnReset.disabled = true;
    btnPush.disabled = false;
}



function draw(){
    if(isDraw){
        displayImage();
    }
    else{
        displayCamera();
    }

    if(isPush){
        if(timeCount < FRAMES){
            takePhoto();
        }
        else{
            stopPhoto();
        }
    }
}

function displayCamera(){
    if(!isCamera) return;
    frameRate(60);
    camShader.setUniform('tex', cam);
    shader(camShader);
    rect(0, 0, width, height);
}

function displayImage(){   
    mixShader.setUniform('frames', timeCount);
    shader(mixShader);
    rect(0, 0, width, height);   
}

function takePhoto(){
    if(timeCount >= FRAMES) return;
    prevFrames[timeCount].image(cam, -width / 2, -height / 2, width, height);
    mixShader.setUniform('tex' + timeCount, prevFrames[timeCount]);
    timeCount++;
}

function pressPush(){
    if(!isCamera) return;
    frameRate(RATE);
    isPush = true;
    isDraw = true;
    timeCount = 0;
    btnPush.disabled = true;
}

function stopPhoto(){
    if(!isPush) return;
    isPush = false;
    btnSave.disabled = false;
    btnReset.disabled = false;
    
}

function saveImg(){
    btnSave.disabled = true;
    saveCanvas(canvas, 'dynamicCamera', 'jpg')
}

function reset(){
    isDraw = false;
    initFrames();
}