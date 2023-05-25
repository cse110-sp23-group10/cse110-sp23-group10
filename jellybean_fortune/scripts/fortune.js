function GoBack() {
    window.location.href = './jellybean.html';
  }


function toggleText() {
  var textElement = document.querySelector('.text');
  textElement.style.display = (textElement.style.display === 'none') ? 'block' : 'none';
}