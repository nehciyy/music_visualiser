function forwardSongButton() {
  //forward button coordindates
  this.x = (width / 8) * 5;
  this.y = height - 70;
  //backward button coordinates
  this.x1 = (width / 8) * 3;
  //width and height of foward and backward button
  this.width = 35;
  this.height = 35;

  this.draw = function () {
    if (sound.isPlaying()) {
      //forward button
      triangle(
        this.x,
        this.y,
        this.x + this.width,
        this.y + this.height / 2,
        this.x,
        this.y + this.height
      );
      triangle(
        this.x - 10,
        this.y,
        this.x - 10 + this.width,
        this.y + this.height / 2,
        this.x - 10,
        this.y + this.height
      );

      //backward button
      triangle(
        this.x1 - 10,
        this.y,
        this.x1 - 10 - this.width,
        this.y + this.height / 2,
        this.x1 - 10,
        this.y + this.height
      );
      triangle(
        this.x1,
        this.y,
        this.x1 - this.width,
        this.y + this.height / 2,
        this.x1,
        this.y + this.height
      );
    }
    //text showing the track number currently at
    /*soundIndex + 1 because soundIndex starts from 0 hence +1 to each soundIndex so user will know the track number from 1 to 5
    instead of starting from 0 to 4*/
    text("Track No. : Sound" + (soundIndex + 1), width / 50, height - 50);
  };

  this.hit = function () {
    //console.log("in hit button");
    //forward button when clicked
    if (
      mouseX > this.x &&
      mouseX < this.x + this.width &&
      mouseY > this.y &&
      mouseY < this.y + this.height
    ) {
      console.log("got hit");
      if (soundIndex >= 4) {
        soundIndex = 0;
      } else {
        soundIndex++;
      }
      console.log(soundIndex);
      sound.stop();
      sound = soundList[soundIndex];
      sound.loop();
      return true;
    }

    //backward button when clicked
    if (
      mouseX < this.x1 &&
      mouseX > this.x1 - this.width &&
      mouseY > this.y &&
      mouseY < this.y + this.height
    ) {
      console.log("got hit left");
      if (soundIndex <= 0) {
        soundIndex = 0;
      } else {
        soundIndex--;
      }
      console.log(soundIndex);
      sound.stop();
      sound = soundList[soundIndex];
      sound.loop();
      return true;
    }
    return false;
  };
}
