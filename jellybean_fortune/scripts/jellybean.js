const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Hello");
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

function shakeJar() {
  var jar = document.getElementById("jar-beans");
  console.log("shake");
  jar.classList.add("shake");
  setTimeout(function () {
    jar.classList.remove("shake");
  }, 500);

  setTimeout(function () {
    window.location.href = "./fortune.html";
  }, 1000);
}

registerServiceWorker();
