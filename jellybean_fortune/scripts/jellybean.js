/**
 * Method to initialize and activate the service workers
 */
function initializeServiceWorker() {
  if ('serviceWorker' in navigator){
    window.addEventListener('load', async () => {
      navigator.serviceWorker.register('./sw.js')
      .then((res) => {
        console.log(`Service worker loaded`);
      })
      .catch(e => {
        console.log(`Service Worker failed with error ${e}`)
      })
    })
  }else{
    console.log("The browser does not support Service Workers");
  }
}


initializeServiceWorker()

function shakeJar() {
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
