let sketch = function (p) {
  let canvas;
  let elSize = 0;
  let penSize = 1;
  let fillColor;

  const HEIGHTNUM = 0.8;

  const back = "#fbfaf5";
  const sumiiro = "#2b2b2b";
  const shuiro = "#d3381c";
  const akasumiiro = "#3f312b";

  let weightText; //HTMLのP要素
  let weightSlider; //HTMLのSlider要素
  //HTMLのdiv要素
  let sumiiroEllipse;
  let akasumiEllipse;
  let hiiroEllipse;

  p.setup = function () {
    createCanvas();

    const sumiiroButton = document.getElementById("btn-sumiiro");
    const akasumiButton = document.getElementById("btn-akasumi");
    const hiiroButton = document.getElementById("btn-hiiro");
    const saveButton = document.getElementById("btn-save");
    const newButton = document.getElementById("btn-new");
    weightText = document.getElementById("weight-text");
    weightSlider = document.getElementById("weight-slider")
    sumiiroEllipse = document.getElementById("sumiiro-ellipse");
    akasumiEllipse = document.getElementById("akasumi-ellipse");
    hiiroEllipse = document.getElementById("hiiro-ellipse");

    sumiiroButton.addEventListener("click", function () {
      changeColor(0);
    });
    akasumiButton.addEventListener("click", function () {
      changeColor(1);
    });
    hiiroButton.addEventListener("click", function () {
      changeColor(2);
    });
    saveButton.addEventListener("click", function () {
      saveImage();
    });
    newButton.addEventListener("click", function(){
      createCanvas();
    });
    weightSlider.addEventListener('change', function(){
      changeWeightText();
    });
    changeWeightText();
  }

  function createCanvas() {
    const sketchDiv = document.getElementById('sketch');
    canvas = p.createCanvas(sketchDiv.offsetWidth, sketchDiv.offsetHeight);
    p.background(back);
    p.fill(240, 160);
    p.noStroke();
    for (let i = 0; i < p.windowWidth; i += 15) {
      for (let j = 0; j < p.windowHeight; j += 15) {
        const xPos = i + p.random(15);
        const yPos = j + p.random(25);
        const size = p.random(8, 30);
        p.beginShape();
        p.vertex(xPos + p.random(5), yPos + p.random(-1, 1));
        p.vertex(xPos + size / 2 + p.random(1, 5), yPos + 2 + p.random(-0.3, 0.3));
        p.vertex(xPos + size + p.random(1, 5), yPos + p.random(-1, 1));
        p.vertex(xPos + size / 2 + p.random(1, 5), yPos - 2 + p.random(-0.3, 0.3));
        p.endShape();
      }
    }
    fillColor = p.color(sumiiro);
    
  }

  function changeWeightText(){
    penSize = weightSlider.value;
    weightText.textContent = penSize;
  }

  p.draw = function () {
    if (p.mouseIsPressed == true) {
      const d = p.dist(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      if (d < 1) {
        return;
      }
      penSize = weightSlider.value;
      elSize = p.map(d, 0, 9, 20, 5) * penSize;
      fillColor.setAlpha(p.map(d, 0, 9, 200, 150));
      p.fill(fillColor);
      const elWidth = elSize * p.random(1.02, 1.2);
      p.ellipse(p.mouseX, p.mouseY, elWidth, elSize);
      p.push();

      fillColor.setAlpha(p.map(d, 0, 9, 60, 40));
      p.fill(fillColor);
      p.ellipse(p.mouseX, p.mouseY, elWidth * 1.1, elSize * 1.1);
      p.pop();
    }
  }

  function changeColor(code) {
    if (code == 0) {
      fillColor = p.color(sumiiro);
      sumiiroEllipse.style.border = "solid 2px #0f2350";
      akasumiEllipse.style.border = "none";
      hiiroEllipse.style.border = "none";
    } else if (code == 1) {
      fillColor = p.color(akasumiiro);
      akasumiEllipse.style.border = "solid 2px #0f2350";
      sumiiroEllipse.style.border = "none";
      hiiroEllipse.style.border = "none";
    } else if (code == 2) {
      fillColor = p.color(shuiro);
      hiiroEllipse.style.border = "solid 2px #0f2350";
      sumiiroEllipse.style.border = "none";
      akasumiEllipse.style.border = "none";
    }
  }

  function saveImage() {
    p.saveCanvas(canvas, "Canvas", "png");
  }
}

let myp5 = new p5(sketch, "sketch");
