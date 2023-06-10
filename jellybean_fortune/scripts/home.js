document.addEventListener('DOMContentLoaded', init)

/**
 * Function that is executed when DOM content is loaded
 */
function init() {
    const next_button = document.getElementById('next');
    const name_input = document.getElementById('name');
    next_button.addEventListener('click', () => {
        localStorage.setItem('username', name_input.value);
        location.replace('./jellybean.html')
    })
}