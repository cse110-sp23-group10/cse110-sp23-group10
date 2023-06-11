// JS for the crdits page

document.addEventListener("DOMContentLoaded", init);

/**
 * Function that is executed when DOM content is loaded
 */
function init() {
  const back_button = document.getElementById("back");
  back_button.addEventListener("click", () => {
    location.replace("./landing.html");
  });
}
