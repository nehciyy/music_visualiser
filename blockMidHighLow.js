var rotateThresh;
var progThresh;
var seedThresh;
var drawFill = true;
var drawStroke = true;

var boxColour = "#0000FF";
var boxStrokeColour = "#5F5FB9";
var lineColour = "#00FF00";

function BlockMidHighLow() {
  this.name = "Block Mid High Low";
  var rot = 0;
  var noiseStep = 0.01;
  var prog = 0;

  // GUI for rotateThresh,progThresh and seedThresh
  var gui;

  this.setups = function () {
    rotateThresh = 67;
    progThresh = 180;
    seedThresh = 100;

    gui = createGui("Block Mid High Low");
    gui.setPosition(width - 200, 0);

    sliderRange(0.001, 0, 0.001);
    gui.addGlobals("noiseStep");

    sliderRange(0, 255, 1);
    gui.addGlobals(
      "rotateThresh",
      "progThresh",
      "seedThresh",
      "drawFill",
      "boxColour",
      "drawStroke",
      "boxStrokeColour",
      "lineColour"
    );

    gui.hide();
  };

  this.setups();

  this.onResize = function () {
    gui.setPosition(width - 200, 0);
  };
  this.onResize();

  this.draw = function () {
    fourier.analyze();
    var b = fourier.getEnergy("bass");
    var t = fourier.getEnergy("treble");
    rotatingBlocks(b);
    noiseLine(b, t);
  };

  this.unSelectVisual = function () {
    gui.hide();
  };

  this.selectVisual = function () {
    gui.show();
  };

  function rotatingBlocks(energy) {
    if (energy < rotateThresh) {
      rot += 0.01;
    }
    //r is the length of the block
    //map the energy level (0 to 255) to 20 to 100
    var r = map(energy, 0, 255, 20, 100);

    push();
    if (drawStroke) {
      stroke(boxStrokeColour);
    } else {
      noStroke();
    }
    rectMode(CENTER);
    translate(width / 2, height / 2);
    rotate(rot);
    if (drawFill) {
      fill(boxColour);
    } else {
      noFill();
    }

    var incr = width / (10 - 1);
    //draw the rows of squares
    for (var i = 0; i < 10; i++) {
      rect(i * incr - width / 2, 0, r, r);
    }
    pop();
  }

  function noiseLine(energy1, energy2) {
    push();
    translate(width / 2, height / 2);
    //start drawing of the noise line using begin and end shape
    beginShape();
    noFill();
    stroke(lineColour);
    strokeWeight(3);

    //get the noise value
    for (var i = 0; i < 100; i++) {
      var x = noise(i * noiseStep + prog);
      var y = noise(i * noiseStep + prog + 1000);
      x = map(x, 0, 1, -250, 250);
      y = map(y, 0, 1, -250, 250);
      vertex(x, y);
    }
    endShape();
    if (energy1 > progThresh) {
      prog += 0.05;
    }
    //add in one more condition
    if (energy2 > seedThresh) {
      noiseSeed(); //randomise the noise value - make it more "random"
    }
    pop();
  }

  this.isMouseInGUI = function () {
    var inGUI = false;
    var gui_x = gui.prototype._panel.style.left;
    var gui_y = gui.prototype._panel.style.top;
    var gui_height = gui.prototype._panel.clientHeight;
    var gui_width = gui.prototype._panel.clientWidth;

    gui_x = parseInt(gui_x, 10);
    gui_y = parseInt(gui_y, 10);
    gui_height = parseInt(gui_height, 10);
    gui_width = parseInt(gui_width, 10);

    if (mouseX > gui_x && mouseX < gui_x + gui_width) {
      if (mouseY > gui_y && mouseY < gui_y + gui_height) {
        inGUI = true;
      }
    }
    return inGUI;
  };
}
