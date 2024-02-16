let sketch = function(s) {
    let canvas;
    let cam;
    let camShader;
    let mixShader;
    let prevFrames = []; // 10フレームを保存する配列
    let isCamera = false; // カメラが使用できるかどうか
    let isPush = false; // ボタンを押しているかどうか
    let isDraw = false; // 絵を描き続けるかどうか
    const RATE = 10; // frameRate
    const FRAMES = 5;
    let timeCount = 0; 
    let btnPush;

    s.preload = function() {
        camShader = s.loadShader('cam.vert', 'cam.frag');
        mixShader = s.loadShader('cam.vert', 'mix.frag');
    };

    s.setup = function() {
        btnPush = document.getElementById('btn_push');
        canvas = s.createCanvas(s.windowWidth * 0.8, s.windowHeight * 0.8, s.WEBGL);
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
        document.getElementById('btn_save').addEventListener('click', saveImg);
        document.getElementById('btn_reset').addEventListener('click', reset);
    };

    function setFrames() {
        prevFrames = [];
        for (let i = 0; i < FRAMES; i++) {
            prevFrames.push(s.createGraphics(s.windowWidth * 0.8, s.windowHeight * 0.8, s.WEBGL));
        }
    }

    function initFrames() {
        document.getElementById('btn_save').disabled = true;
        document.getElementById('btn_reset').disabled = true;
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
        document.getElementById('btn_push').disabled = true;
    }

    function stopPhoto() {
        if (!isPush) return;
        isPush = false;
        document.getElementById('btn_save').disabled = false;
        document.getElementById('btn_reset').disabled = false;
    }

    function saveImg() {
        document.getElementById('btn_save').disabled = true;
        s.saveCanvas(canvas, 'dynamicCamera', 'jpg');
    }

    function reset() {
        isDraw = false;
        initFrames();
    }

    // イベントリスナーの設定

};

new p5(sketch, "sketch");
