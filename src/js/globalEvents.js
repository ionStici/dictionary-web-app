// Keyboard Shortcut Feature Request
// Ctrl + Alt + H keybind: Select the search input box && clear the text && scroll to the top

document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.altKey && event.keyCode === 72) {
    var inputBox = document.querySelector('input[name="search"]');
    if (inputBox) {
      inputBox.select();
      inputBox.value = '';
      window.scrollTo(0, 0);
    }
  }
});
