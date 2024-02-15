let canvas;
let cam;
let camShader;
let mixShader;
let prevFrames; // 10フレームを保存する配列
let isCamera; // カメラが使用できるかどうか
let isPush; // ボタンを押しているかどうか
let isDraw; // 絵を描き続けるかどうか
const RATE = 1; // frameRate
const FRAMES = 2;
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
    btnPush.addEventListener('mousedown', startPress);
    btnPush.addEventListener('mouseup', stopPress);
    btnSave = document.getElementById('btn_save');
    btnSave.disabled = true;
    btnSave.onclick = saveImg;
    btnReset = document.getElementById('btn_reset');
    btnReset.disabled = true;
    btnReset.onclick = reset;

    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    cam = createCapture(VIDEO, function(){
        isCamera = true;
        btnPush.disabled = false;
    });
    cam.size(windowWidth, windowHeight);
    cam.hide();
    setFrames();
}

function setFrames(){
    prevFrames = [];
    for(let i = 0; i < FRAMES; i++){
        prevFrames.push(createGraphics(windowWidth, windowHeight, WEBGL));
    }
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
        takePhoto();
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
    shader(mixShader);
    rect(0, 0, width, height);   
}

function takePhoto(){
    if(timeCount >= FRAMES) return;
    prevFrames[timeCount].image(cam, -width / 2, -height / 2, width, height);
    mixShader.setUniform('tex' + timeCount, prevFrames[timeCount]);
    timeCount++;
}

function startPress(){
    if(!isCamera) return;
    frameRate(RATE);
    isPush = true;
    isDraw = true;
    timeCount = 0;
    prevFrames[0].image(cam, -width / 2, -height / 2, width, height);
    mixShader.setUniform('tex0', prevFrames[0]);
}

function stopPress(){
    isPush = false;
    prevFrames[1].image(cam, -width / 2, -height / 2, width, height);
    mixShader.setUniform('tex1', prevFrames[1]);
    btnSave.disabled = false;
    btnReset.disabled = false;
    btnPush.disabled = true;
}

function saveImg(){
    print('save');
    btnSave.disabled = true;
    saveCanvas(canvas, 'dynamicCamera', 'jpg')
}

function reset(){
    isDraw = false;
    setFrames();
}