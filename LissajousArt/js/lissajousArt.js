const s = (p) => {
    let canvas;
    let ctx;
    let blues = ['#2af598', '#009efd'];
    let orenges = ['#ff7e5f', '#feb47b'];
    let pinks = ['#FAACA8', '#DDD6F3'];
    let colors = [];
    let lineGradient;
    let ellipseGradient;
    let r = 150;
    const elSize = 50;
    let degree = 0;
    let horizontalSpeed = 1;
    let verticalSpeed = 1;
    let addDegree = 0;
    let elSpeed = 1;
    let horizontalInput;
    let verticalInput;
    let addInput;
    let formulaToggle;
    let isDisplayFormula;
    const HEIGHTNUM = 0.65;

    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight * HEIGHTNUM);
        p.textFont('Quicksand');
        p.textStyle('light');
        const saveButton = document.getElementById("button-save");
        const blueButton = document.getElementById("button-blue");
        const orengeButton = document.getElementById("button-orenge");
        const pinkButton = document.getElementById("button-pink");
        horizontalInput = document.getElementById("input-horizontal");
        verticalInput = document.getElementById("input-vertical");
        addInput = document.getElementById("input-add");
        formulaToggle = document.getElementById("toggle-check");
        blueButton.addEventListener("click", function(){
            changeColor(blues);
        });
        orengeButton.addEventListener("click", function(){
            changeColor(orenges);
        });
        pinkButton.addEventListener("click", function(){
            changeColor(pinks);
        });
        saveButton.addEventListener("click", saveImage);
        colors = new Array(2);
        changeColor(blues);
        ctx = p.drawingContext;
        p.angleMode(p.DEGREES);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(25);
        p.strokeWeight(1);
        p.noFill();
        isDisplayFormula = true;
        changeR();
    };

    function changeColor(color){
        colors[0] = color[0];
        colors[1] = color[1];
    }

    function changeR(){
        r = p.windowWidth / 12;
        if(r >= 180){
            r = 180;
        }
        if(r <= 140){
            r = 140;
        }
    }

    p.draw = () => {
        p.translate(p.width / 2, p.height / 2);
        drawBack();
        updateVariables();
        updateFormula();
        drawLine();
        drawEllipse();
    };

    p.windowResized = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight * HEIGHTNUM);
        p.textAlign(p.CENTER, p.CENTER);
        changeR();
    }

    function updateVariables() {
        if (horizontalInput.value !== "" && !isNaN(horizontalInput.value)) {
            horizontalSpeed = parseFloat(horizontalInput.value);
        }
        if(verticalInput.value !== "" && !isNaN(verticalInput.value)){
            verticalSpeed = parseFloat(verticalInput.value);
        }
        if(addInput.value !== "" && !isNaN(addInput.value)){
            addDegree = parseFloat(addInput.value);
        }
        isDisplayFormula = formulaToggle.checked;
    }

    function drawBack() {
        p.push();
        p.stroke(220, 70);
        p.background("#0F110C");
        p.ellipse(0, 0, r * 2);
        p.line(0, -p.height, 0, p.height);
        p.line(-p.width / 2, 0, p.width / 2, 0);
        p.pop();
    }

    function drawLine() {
        p.stroke("#fff");
        lineGradient = ctx.createLinearGradient(
            r * 2 * p.cos(degree),
            r * 2 * p.sin(degree),
            r * 2 * p.cos(degree + 180),
            r * 2 * p.sin(degree + 180)
        );
        lineGradient.addColorStop(0.3, colors[0]);
        lineGradient.addColorStop(0.7, colors[1]);
        p.beginShape();
        p.push();
        p.strokeWeight(10);
        p.curveVertex(
            r * p.cos(horizontalSpeed * (360 - 20)),
            r * p.sin(verticalSpeed * (360 - 20) + addDegree)
        );
        p.curveVertex(
            r * p.cos(horizontalSpeed * (360 - 10)),
            r * p.sin(verticalSpeed * (360 - 10) + addDegree)
        );
        for (let i = 0; i < 360; i += 10) {
            p.curveVertex(
                r * p.cos(horizontalSpeed * i),
                r * p.sin(verticalSpeed * i + addDegree)
            );
        }
        p.curveVertex(
            r * p.cos(horizontalSpeed * 0),
            r * p.sin(verticalSpeed * 0 + addDegree)
        );
        p.curveVertex(
            r * p.cos(horizontalSpeed * 10),
            r * p.sin(verticalSpeed * 10 + addDegree)
        );
        ctx.shadowColor = "#fff";
        ctx.shadowblur = 30 * p.displayDensity();
        p.endShape();
        p.pop();

        p.push();
        p.blendMode(p.MULTIPLY); // 乗算モードに切り替え
        p.fill(255);
        p.noStroke();
        ctx.fillStyle = lineGradient; // 塗りをグラデーションに
        p.rect(-p.width / 2, -p.height / 2, p.width, p.height); // 全画面に四角を表示
        p.pop();
    }

    function drawEllipse() {
        p.push();
        p.noStroke();
        degree += elSpeed;
        const xPos = r * p.cos(horizontalSpeed * degree);
        const yPos = r * p.sin(verticalSpeed * degree + addDegree);
        ellipseGradient = ctx.createLinearGradient(
            xPos,
            yPos - elSize / 2,
            xPos,
            yPos + elSize / 2
        );
        ellipseGradient.addColorStop(0, "#ddd6f3");
        ellipseGradient.addColorStop(1, "#fff");
        p.fill(255);
        ctx.fillStyle = ellipseGradient;
        p.ellipse(xPos, yPos, elSize);
        p.pop();
    }

    function updateFormula() {
        p.push();
        p.fill(255);
        let addDegreeText = addDegree !== 0 ? `+${addDegree}` : "";
        let horizontalSpeedText = horizontalSpeed === 1 ? "" : `${horizontalSpeed}`;
        let verticalSpeedText = verticalSpeed === 1 ? "" : `${verticalSpeed}`;

        if (horizontalSpeed === 1 && verticalSpeed === 1) {
            if(isDisplayFormula){
                p.text('(x,y) = cosθ , sin(θ' + addDegreeText + ')', 0, p.height / 2 - 40);
            }           
        } else {
            if(isDisplayFormula){
                p.text('(x,y) = cos' + horizontalSpeedText + 'θ , sin(' + verticalSpeedText + 'θ' + addDegreeText + ')', 0, p.height / 2 - 40);
            }

        }
        p.pop();
    }

    function saveImage() {
        p.saveCanvas(canvas, "LissajousArt", "png");
    }
};

const myp5 = new p5(s, "sketch-lissajousArt");
