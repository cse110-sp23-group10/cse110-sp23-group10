/**  JS for the jellybean Home page */

/**
 * Function to shake the jellybean jar
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
 * Function to go to the account page
 */
function GoAccount() {
  window.location.href = "./account.html";
}

/**
 * Function to increment the number of times the jar has been shaken and store it in local storage
 */
function incrementJarShake() {
  // Retrieve the current value of jar_shakes from local storage
  var jarShakes = localStorage.getItem("jar_shakes");

  // Convert the value to a number and increment by 1
  jarShakes = parseInt(jarShakes) || 0;
  jarShakes++;

  // Store the updated value back to local storage
  localStorage.setItem("jar_shakes", jarShakes);
}

/**
 * Function to toggle show/hide the instructions modal and blur the background
 */
function toggleInstructions() {
  var modal = document.getElementById("instructions-modal");
  var blurOverlay = document.getElementById("blur-overlay");

  if (modal.style.display === "block") {
    modal.style.display = "none";
    blurOverlay.style.display = "none";
  } else {
    modal.style.display = "block";
    blurOverlay.style.display = "block";
  }
}

/**
 * Function to show the credits modal and blur the background
 */
window.onload = function () {
  var blurOverlay = document.getElementById("blur-overlay");
  blurOverlay.style.display = "none";
};
