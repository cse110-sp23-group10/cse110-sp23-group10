function GoBack() {
  window.location.href = './jellybean.html';
}


function toggleText(color) {
  var textElement = document.querySelector('.text');
  let state = textElement.state;
  if (state === color) {
    textElement.style.display = 'none';
    textElement.state = 'none';
  } else {
    textElement.innerHTML = `You chose the ${color} jellybean`;
    textElement.style.display = 'block';
    textElement.state = color;
  }
}
