const sketch = (s) => {
  let canvas;
  let cr;
  let crMouse;
  let count;
  let maxCount;
  let col;
  let score;
  const widthNum = 0.8;
  const heightNum = 0.8;
  
    s.setup = () => {
      canvas = s.createCanvas(s.windowWidth * widthNum, s.windowHeight * heightNum);
      canvas.mouseClicked(s.click);
      cr = s.createGraphics(s.windowWidth * widthNum, s.windowHeight * heightNum);
      crMouse = s.createGraphics(s.windowWidth * widthNum, s.windowHeight * heightNum);
      const saveButton = document.getElementById("button-save");
      saveButton.addEventListener("click", saveImage);
      const resetButton = document.getElementById("button-reset");
      resetButton.addEventListener("click", resetImage);
      s.textAlign(s.CENTER, s.CENTER);
      s.textFont('Jost');
      score = 0;
      cr.noStroke();
      s.colorMode(s.HSB);
      newShape();
    };
  
    function newShape() {
      col = s.color(s.random(360), 80, 100);
      s.background(col);
      crMouse = s.createGraphics(s.windowWidth * widthNum, s.windowHeight * heightNum);
      cr.fill(col);
      cr.beginShape();
      count = 0;
      maxCount = parseInt(s.random(3, 6));
      //displayText();
      s.push();
      s.textSize(60);
      s.fill(255);
      s.text(String(maxCount), s.width / 2, 50);
      s.pop();
      s.image(cr, 0, 0);
    }
  
    function displayText(){
      s.push();
      s.textSize(30);
      score += parseInt(s.random(10, 50));
      s.text(String(score), s.width - 30, s.height - 30);
      s.pop();
    }
  
    s.draw = () => {
  
    };

    s.windowResized = () => {

  }
  
    s.click = () => {
      cr.vertex(s.mouseX, s.mouseY);
      cr.push();
      crMouse.stroke(0);
      crMouse.strokeWeight(5);
      crMouse.point(s.mouseX, s.mouseY);
      cr.pop();
      count++;
      s.image(crMouse, 0, 0);
      if (count >= maxCount) {
        cr.endShape();
        newShape();
      }
    };

    function saveImage() {
      s.background(col);
      s.image(cr, 0, 0);
      s.saveCanvas(canvas, "cutart", "png");
    }

    function resetImage() {
      cr = s.createGraphics(s.windowWidth * widthNum, s.windowHeight * heightNum);
      cr.noStroke();
      newShape();
    }
  };
  
  let myp5 = new p5(sketch, "cutart");
  