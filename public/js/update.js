$("#update-name-button").on("click", function(event) {
  event.preventDefault();
  //update name
})

$("#update-email-button").on("click", function(event) {
  event.preventDefault();
  //update email
})

$("#update-password-button").on("click", function(event) {
  event.preventDefault();
  if (//password entered matched password on file) {
    if ($('#newPassword') === $('#newPasswordReenter')) {
      //update password
    } else {
      $('#passwordUpdateMessage').text('Passwords must match')
    }
  } else {
    $('#passwordUpdateMessage').text('Wrong Password')
  }
})

