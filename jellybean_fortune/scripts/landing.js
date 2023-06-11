document.addEventListener("DOMContentLoaded", init);

/**
 * Function that is executed when DOM content is loaded
 */
function init() {
  new Typewriter("#welcome", {
    strings: ["Welcome to Group-10 Team Jellybean", "We hope you have a good time"],
    autoStart: true,
    loop: true,
  });
  const credits_button = document.getElementById("credits");
  const next_button = document.getElementById("next");
  const name_input = document.getElementById("name");
  next_button.addEventListener("click", () => {
    if (name_input.value == "") {
      alert("Please enter a valid name");
      return;
    }
    localStorage.setItem("username", name_input.value);
    location.replace("./jellybean.html");
  });
  credits_button.addEventListener("click", () => {
    location.replace("./credits.html");
  });
}
