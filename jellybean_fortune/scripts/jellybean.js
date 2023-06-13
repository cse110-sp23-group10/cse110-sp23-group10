// JS for the home page

/**
 * Initialize and activate the service workers
 */
function initializeServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      navigator.serviceWorker
        .register("./sw.js")
        .then((res) => {
          console.log(`Service worker loaded`);
        })
        .catch((e) => {
          console.log(`Service Worker failed with error ${e}`);
        });
    });
  } else {
    console.log("The browser does not support Service Workers");
  }
}

initializeServiceWorker();

/**
 * Function that is linked to the shake button and shake jar animation
 */
function shakeJar() {
  // call the function to increment the number of times the jar has been clicked
  incrementJarShake();
  var jar = document.getElementById("jar");
  console.log("shake");
  jar.classList.add("shake");
  setTimeout(function () {
    jar.classList.remove("shake");
  }, 500);

  setTimeout(function () {
    window.location.href = "./fortune.html";
  }, 1000);
}

/**
 * Go to account page
 */
function GoAccount() {
  window.location.href = "./account.html";
}

/**
 * Increments number of times jar clicked
 */
function incrementJarShake() {
  // Retrieve the current value of num_clicked from local storage
  var numClicked = localStorage.getItem("jar_shakes");

  // Convert the value to a number and increment by 1
  numClicked = parseInt(numClicked) || 0;
  numClicked++;

  // Store the updated value back to local storage
  localStorage.setItem("jar_shakes", numClicked);
}

/**
 * Opens the instructions modal and blurs the background
 */
function showInstructions() {
  var modal = document.getElementById("instructions-modal");
  var blurOverlay = document.getElementById("blur-overlay");
  modal.style.display = "block";
  blurOverlay.style.display = "block";
}

/**
 * Closes the instructions modal and unblurs the background
 */
function closeInstructions() {
  var modal = document.getElementById("instructions-modal");
  var blurOverlay = document.getElementById("blur-overlay");
  modal.style.display = "none";
  blurOverlay.style.display = "none";
}

window.onload = function () {
  var blurOverlay = document.getElementById("blur-overlay");
  blurOverlay.style.display = "none";
};
