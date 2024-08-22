let sketch = function(s) {
    let canvas;
    let cam;
    let filter;
    let camShader;
    let mixShader;
    let prevFrames = []; // 10フレームを保存する配列
    let isCamera = false; // カメラが使用できるかどうか
    let isPush = false; // ボタンを押しているかどうか
    let isDraw = false; // 絵を描き続けるかどうか
    const RATE = 10; // frameRate
    const FRAMES = 5;
    const SCALE = 0.7;
    let timeCount = 0; 
    let btnPush;
    let btnSave;
    let btnReset;
    let btnOriginal;
    let btnFilter1, btnFilter2, btnFilter3, btnFilter4;

    s.preload = function() {
        camShader = s.loadShader('cam.vert', 'cam.frag');
        mixShader = s.loadShader('cam.vert', 'mix.frag');
    };

    s.setup = function() {
        btnPush = document.getElementById('btn_push');
        btnSave = document.getElementById('btn_save');
        btnReset = document.getElementById('btn_reset')
        btnOriginal = document.getElementById('filter_original');
        btnFilter1 = document.getElementById('filter_1');
        btnFilter2 = document.getElementById('filter_2');
        btnFilter3 = document.getElementById('filter_3');
        btnFilter4 = document.getElementById('filter_4');
        btnOriginal.addEventListener('click', () => displayFilter(s.color(20, 50)));
        btnFilter1.addEventListener('click', () => displayFilter(s.color(100, 50)));
        btnFilter2.addEventListener('click', () => displayFilter(s.color(120, 50)));
        btnFilter3.addEventListener('click', () => displayFilter(s.color(140, 50)));
        btnFilter4.addEventListener('click', () => displayFilter(s.color(160, 50)));
        canvas = s.createCanvas(s.windowWidth * SCALE, s.windowHeight * SCALE, s.WEBGL);
        filter = s.createGraphics(s.windowWidth * SCALE, s.windowHeight * SCALE);
        cam = s.createCapture({
            audio: false,
            video: { facingMode: "environment" }
        }, function() {
            isCamera = true;
            btnPush.disabled = false;
        });
        cam.size(s.windowWidth, s.windowHeight);
        cam.hide();
        setFrames();
        btnPush.addEventListener('click', pressPush);
        btnPush.disabled = true;
        btnSave.addEventListener('click', saveImg);
        btnReset.addEventListener('click', reset);
    };

    function setFrames() {
        prevFrames = [];
        for (let i = 0; i < FRAMES; i++) {
            prevFrames.push(s.createGraphics(s.windowWidth * SCALE, s.windowHeight * SCALE, s.WEBGL));
        }
    }

    function initFrames() {
        btnSave.disabled = true;
        btnReset.disabled = true;
        btnPush.disabled = false;
    }

    s.draw = function() {
        if (isDraw) {
            displayImage();
        } else {
            displayCamera();
        }

        if (isPush) {
            if (timeCount < FRAMES) {
                takePhoto();
            } else {
                stopPhoto();
            }
        }
    };

    function displayCamera() {
        if (!isCamera) return;
        s.frameRate(60);
        camShader.setUniform('tex', cam);
        s.shader(camShader);
        s.rect(0, 0, s.width, s.height);
    }

    function displayImage() {
        mixShader.setUniform('frames', timeCount);
        s.shader(mixShader);
        s.rect(0, 0, s.width, s.height);
    }

    function takePhoto() {
        if (timeCount >= FRAMES) return;
        prevFrames[timeCount].image(cam, -s.width / 2, -s.height / 2, s.width, s.height);
        mixShader.setUniform('tex' + timeCount, prevFrames[timeCount]);
        timeCount++;
    }

    function pressPush() {
        if (!isCamera) return;
        s.frameRate(RATE);
        isPush = true;
        isDraw = true;
        timeCount = 0;
        btnPush.disabled = true;
    }

    function stopPhoto() {
        if (!isPush) return;
        isPush = false;
        btnSave.disabled = false;
        btnReset.disabled = false;
    }

    function saveImg() {
        btnSave.disabled = true;
        s.saveCanvas(canvas, 'dynamicCamera', 'jpg');
    }

    function reset() {
        isDraw = false;
        initFrames();
    }

    function displayFilter(col){
        filter.fill(col);
        filter.rect(0, 0, s.width, s.height);
        s.image(filter, 0, 0);
    }

};

new p5(sketch, "sketch");
