function shakeJar() {
    var jar = document.getElementById("jar-beans");
    console.log("shake");
    jar.classList.add("shake");
    setTimeout(function() {
      jar.classList.remove("shake");
    }, 500);
  }