document.addEventListener('DOMContentLoaded', function() {

  //add listeners to buttons
  document.getElementById('submit_button').addEventListener('click', handleSubmitButton)
  document.getElementById("transpose_up").addEventListener("click", transposeUp);
  document.getElementById("transpose_down").addEventListener("click", transposeDown);

  //add key handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
})
