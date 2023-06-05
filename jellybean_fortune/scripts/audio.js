window.addEventListener("DOMContentLoaded", init);

// initialize audio element, sound icon, and add mute functionality when DOM loads
function init() {
  // toggle mute/unmute audio
  // let audio = document.getElementById("background-music");
  let sound = document.getElementById("sound-icon");
  let audio = new Audio("./assets/goofy.mp3");
  let volume = true;

  audio.volume = 0.2;
  // many browsers disable autoplay
  let playResult = audio.play();
  playResult.catch((e) => {
    console.log("cannot play audio");
  });
  audio.loop = true;

  sound.addEventListener("click", function (event) {
    console.log("mute");
    if (volume) {
      audio.volume = 0;
      this.src = "./assets/mute-white.svg";
    } else {
      audio.volume = 0.2;
      this.src = "./assets/sound-white.svg";
    }
    volume = !volume;
  });
}
