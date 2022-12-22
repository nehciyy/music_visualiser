var strokeLength;
var strokeColour = "#3D4FA9";
var leftDrumColour = "#556D5E";
var rightDrumColour = "#DFA19A";

var musicOptionsLeft = ["bass", "lowMid", "mid", "highMid", "treble"];
var musicOptionsRight = ["treble", "bass", "lowMid", "mid", "highMid"];
var shapeLeft = ["circle", "square", "triangle"];
var shapeRight = ["circle", "square", "triangle"];

let amplitude = new p5.Amplitude();

function RadicalGraph() {
  this.name = "Radical Graph";

  let volArray = new Array();

  //GUI for the change in length of stroke and the stroke colour for users
  var gui;

  this.setup1 = function () {
    //set strokeLength at default
    strokeLength = 13.5;

    //positioning the gui user interface
    gui = createGui("Radical Graph");
    gui.setPosition(width - 200, 0);

    //allowing users to change the strokeLength by having a slider to change the value
    sliderRange(10, 30, 0.5);
    gui.addGlobals("strokeLength");

    //allowing users to change the colour of the stroke, left and right drum to their own preferences
    sliderRange(0, 255, 1);
    gui.addGlobals("strokeColour", "leftDrumColour", "rightDrumColour");

    //allowing users to change the music mode of the different fft and able to explore the music as accordingly
    gui.addGlobals("musicOptionsLeft", "musicOptionsRight");

    //positioning the gui user interface
    //gui = createGui("Change shape");
    //gui.setPosition(width - 200, height - 150);
    //options for users to change the shape of the drum to their liking
    gui.addGlobals("shapeLeft", "shapeRight");

    gui.hide();
  };

  this.setup1();

  this.draw = function () {
    background(0);
    let volume = amplitude.getLevel();

    //random the length of the wave
    volArray.push(volume * strokeLength * 0.2);

    //translate the radical graph to rotate in the middle of the sketch using push() and pop() so that the rest of the codes will not be affected.
    push();
    angleMode(DEGREES); // Change the mode to DEGREES
    translate(width / 2, height / 2);
    noFill();

    //amplitude circle which is able to change colour
    beginShape();
    for (let i = 0; i < 360; i++) {
      //drawing of the strokes in circular motion using some basic mathematical calulations with sine and cosine
      //making 2 circles to add more visual imapct
      //use map() to overlap the circle to make it more visually impactful
      strokeWeight(2);
      let r1 = map(volArray[i], 0, 1, 140, 150); //radius of the circle which maps on the inner layer
      let x1 = r1 * cos(i); // x-coordinate of circle
      let y1 = r1 * sin(i); // y-coordinate of circle
      vertex(x1, y1);

      stroke(strokeColour);
      strokeWeight(volume * 10);
      let r = map(volArray[i], 0, 1, 120, 250); //radius of the circle which maps on the outer layer
      let x = r * cos(i); // x-coordinate of circle
      let y = r * sin(i); // y-coordinate of circle
      vertex(x, y);
    }
    endShape();

    // //waveform circle outside (red)
    beginShape();
    let wave = fourier.waveform();
    stroke(255, 0, 0);
    for (let j = 00; j < 360; j++) {
      let rWave = map(wave[j], 2, 3, 100, 300); //radius of the circle
      let xWave = cos(j) * rWave; // x-coordinate of circle
      let yWave = sin(j) * rWave; // y-coordinate of circle
      vertex(xWave, yWave);
    }
    endShape();

    //remove the "old" wave
    if (volArray.length > 360) {
      volArray.splice(0, 1);
    }
    pop();

    noFill();
    //left drum coordinates
    let leftDrumx = width / 8;
    let leftDrumy = (height / 4) * 3;
    //right drum coordinates
    let rightDrumx = (width / 8) * 7;
    let rightDrumy = (height / 4) * 3;

    //leftDrum
    strokeWeight(3);
    stroke(leftDrumColour);
    //user able to change the drum shape through the GUI
    switch (shapeLeft) {
      //when select circle will break out from the "switch" loop
      case "circle":
        ellipse(leftDrumx, leftDrumy, this.selectedOptionLeft());
        break;

      //when select square will break out from the "switch" loop
      case "square":
        rectMode(CENTER);
        rect(
          leftDrumx,
          leftDrumy,
          this.selectedOptionLeft(),
          this.selectedOptionLeft()
        );
        break;

      //when select triangle will break out from the "switch" loop
      case "triangle":
        triangle(
          leftDrumx,
          leftDrumy - this.selectedOptionLeft() / 2,
          leftDrumx + this.selectedOptionLeft(),
          leftDrumy + this.selectedOptionLeft(),
          leftDrumx - this.selectedOptionLeft(),
          leftDrumy + this.selectedOptionLeft()
        );
        break;
    }

    //rightDrum
    stroke(rightDrumColour);
    //user able to change the drum shape through the GUI
    switch (shapeRight) {
      //when select circle will break out from the "switch" loop
      case "circle":
        ellipse(rightDrumx, rightDrumy, this.selectedOptionRight());
        break;

      //when select square will break out from the "switch" loop
      case "square":
        rectMode(CENTER); //make the coordinate of circle in the center
        rect(
          rightDrumx,
          rightDrumy,
          this.selectedOptionRight(),
          this.selectedOptionRight()
        );
        break;

      //when select triangle will break out from the "switch" loop
      case "triangle":
        triangle(
          rightDrumx,
          rightDrumy - this.selectedOptionRight() / 2,
          rightDrumx + this.selectedOptionRight(),
          rightDrumy + this.selectedOptionRight(),
          rightDrumx - this.selectedOptionRight(),
          rightDrumy + this.selectedOptionRight()
        );
        break;
    }

    //switch angleMode back to radian so it does not overlap with other visuals which require angleMode to be in radians instead of degree
    angleMode(RADIANS);
  };

  this.unSelectVisual = function () {
    gui.hide();
  };

  this.selectVisual = function () {
    gui.show();
  };

  //to change the left drum fft
  this.selectedOptionLeft = function () {
    fourier.analyze();

    var energy = fourier.getEnergy(musicOptionsLeft);
    return energy;
  };

  //to change the right drum fft
  this.selectedOptionRight = function () {
    fourier.analyze();

    var energy = fourier.getEnergy(musicOptionsRight);
    return energy;
  };
}
