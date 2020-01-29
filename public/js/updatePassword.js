$("#update-password").on("click", function(event) {
  event.preventDefault();
  if (checkAuthenticated) {
    if ($('#newPassword') === $('#newPasswordReenter')) {
      //update password
    } else {
      $('#passwordUpdateMessage').text('Passwords must match')
    }
  } else {
    $('#passwordUpdateMessage').text('Wrong Password')
  }
})