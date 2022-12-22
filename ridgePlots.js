function RidgePlots() {
  this.name = "Ridge Plots";

  let startX;
  let startY;
  let endY;
  let spectrumWidth;
  let speed = 1;
  let output = [];

  this.onSize = function () {
    startX = width / 4;
    endY = height / 5;
    startY = height - endY;
    spectrumWidth = width / 2;
  };
  //call onResize when we new RidgePlots() object in sketch
  this.onSize();

  this.draw = function () {
    background(0);
    //set colour mode to HSB
    colorMode(HSB, 360);
    stroke(255);
    strokeWeight(2);
    if (frameCount % 20 == 0) {
      addWave();
    }

    //draw wave from the back of the output array
    for (let i = output.length - 1; i >= 0; i--) {
      let wave = output[i];

      //fill(frameCount % 360, 360, 360);
      beginShape();
      for (let j = 0; j < wave.length; j++) {
        wave[j].y -= speed; //move the wave up
        vertex(wave[j].x, wave[j].y);
        let hue = random(0, 360);
        fill(hue, 360, 360);
      }
      endShape();
      noFill();

      //remove the "old" wave
      if (wave[0].y < endY) {
        output.splice(i, 1);
      }
    }
    //switch the colour mode back to RGB
    colorMode(RGB);
  };

  function addWave() {
    let w = fourier.waveform();
    let outputWave = [];
    let smallScale = 10;
    let bigScale = 50;

    for (let i = 0; i < w.length; i++) {
      if (i % 20 == 0) {
        let x = map(i, 0, 1024, startX, startX + spectrumWidth);

        //for the left and right 20% of the line we use a smaller scale for the wave
        if (i < 1024 * 0.25 || i > 1024 * 0.75) {
          let y = map(w[i], -1, 1, -smallScale, smallScale);
          let o = { x: x, y: startY + y };
          outputWave.push(o);
        } else {
          //else the middle will have the big waves instead
          let y = map(w[i], -1, 1, -bigScale, bigScale);
          let o = { x: x, y: startY + y };
          outputWave.push(o);
        }
      }
    }

    output.push(outputWave);
  }
}
