//global for the controls and input
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;

var blockMidHighLow;

var soundList;
var soundIndex;

function preload() {
  sound1 = loadSound("assets/Night.mp3");
  sound2 = loadSound("assets/Japan-by-uniq.mp3");
  sound3 = loadSound("assets/Luke-Bergs-Tropical-Soulmp3.mp3");
  sound4 = loadSound("assets/Urban-Hip-Hop.mp3");
  sound5 = loadSound("assets/cosimo-fogg-201-jazzaddicts-intro.mp3");
  soundList = [sound1, sound2, sound3, sound4, sound5];
  soundIndex = 0;
  sound = soundList[soundIndex];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  controls = new ControlsAndInput();

  //instantiate the fft object
  fourier = new p5.FFT();

  //create a new visualisation container and add visualisations
  vis = new Visualisations();
  vis.add(new RadicalGraph());
  blockMidHighLow = new BlockMidHighLow();
  vis.add(blockMidHighLow);
  vis.add(new RidgePlots());
  vis.add(new Spectrum());
  vis.add(new WavePattern());
  vis.add(new Needles());
}

function draw() {
  background(0);
  //draw the selected visualisation
  vis.selectedVisual.draw();
  //draw the controls on top.
  controls.draw();
}

function mouseClicked() {
  controls.mousePressed();
}

function keyPressed() {
  controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit
//if the visualisation needs to be resized call its onResize method
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (vis.selectedVisual.hasOwnProperty("onResize")) {
    vis.selectedVisual.onResize();
  }
}
