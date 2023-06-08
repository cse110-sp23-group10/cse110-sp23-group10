function shakeJar() {
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

function GoAccount() {
  window.location.href = "./account.html";
}

// Increments number of times jar clicked
function incrementJarShake() {
  // Retrieve the current value of num_clicked from local storage
  var numClicked = localStorage.getItem("jar_shakes");

  // Convert the value to a number and increment by 1
  numClicked = parseInt(numClicked) || 0;
  numClicked++;

  // Store the updated value back to local storage
  localStorage.setItem("jar_shakes", numClicked);
}
