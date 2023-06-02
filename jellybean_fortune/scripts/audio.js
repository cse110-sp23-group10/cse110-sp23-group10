window.addEventListener("DOMContentLoaded", init);

function init() {
  // toggle mute/unmute audio
  let audio = document.getElementById("background-music");
  let sound = document.getElementById("sound-icon");
  audio.volume = 0.4;
  let volume = true;
  console.log("init");
  sound.addEventListener("click", function (event) {
    console.log("mute");
    if (volume) {
      audio.volume = 0;
      this.src = "./assets/mute-white.svg";
    } else {
      audio.volume = 0.4;
      this.src = "./assets/sound-white.svg";
    }
    volume = !volume;
  });
}
