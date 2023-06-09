/** JS for the jellybean Account page */

document.addEventListener("DOMContentLoaded", init);

/**
 * Return to home
 */
function GoHome() {
  window.location.replace("./jellybean.html");
}

/**
 * Expand past fortunes
 */
function toggleExpand(element) {
  element.classList.toggle("expanded");
}

/**
 * Function that is executed when DOM content is loaded
 * Redirects user to landing page if they have no account
 */
function init() {
  const name = localStorage.getItem("username");
  if (name == null) {
    window.location.replace("./landing.html");
  }
  const nameEl = document.getElementById("username");
  nameEl.innerHTML = `Hi ${name}, Welcome to your account page! Here you will find all your past fortunes`;
  const fortunes = JSON.parse(localStorage.getItem("fortunes"));
  if (fortunes == null) {
    const no_fortune = document.getElementById("no-fortune");
    no_fortune.innerHTML = `There are no fortunes to display, go back to the home page to see your fortune`;
    return;
  }
  const fortune_table = document.getElementById("fortunes");
  fortune_table.style.display = "block";
  for (let index = 0; index < fortunes.length; index++) {
    const element = fortunes[index];
    var row = fortune_table.insertRow(index + 1);
    var indx = row.insertCell(0);
    var jellybean = row.insertCell(1);
    var fortune = row.insertCell(2);
    indx.innerHTML = index + 1;
    jellybean.innerHTML = element[0];
    fortune.innerHTML = element[1];
  }

  const local_storage_fortunes = JSON.parse(localStorage.getItem("fortunes")) || [];
  const local_storage_jarShakes = localStorage.getItem("jar_shakes") || 0;
  const local_storage_jellybeansPicked = localStorage.getItem("num_clicked") || 0;

  //   Update the HTML with the retrieved data
  document.getElementById("account-jar-shakes").textContent = local_storage_jarShakes;
  document.getElementById("account-jellybeans-picked").textContent = local_storage_jellybeansPicked;

  const pastFortunesList = document.getElementById("account-past-fortunes");
  local_storage_fortunes.forEach((fortune) => {
    const listItem = document.createElement("li");
    listItem.textContent = fortune[1]; // Display fortune text, assuming it's at index 1 of the tuple
    pastFortunesList.appendChild(listItem);
  });
}
