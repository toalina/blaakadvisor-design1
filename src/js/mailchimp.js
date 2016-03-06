// If the user has NOT submitted their email let's focus on the input field to
// make it just a little easier for them to submit it. But if they have
// submitted it don't focus so that the browser remembers their scroll position.
if (!localStorage.submittedEmail) {
  $('.input-email').focus();
}

$('.email-form').on('submit', function () {
  $.ajax({
    url: '/mailchimp',
    type: 'post',
    data: {
      email: $('.input-email').val()
    },
    dataType: 'json',
    complete: function (xhr, response) {
      if (xhr.responseJSON == undefined) {
        $('.mailchimp-error-response').html('<p>Uh oh something went wrong. Try again?</p>').show();
      }
      else if (xhr.responseJSON.error) {
        $('.mailchimp-error-response').html('<p>Uh oh something went wrong. Try again?</p>').show();
      }
      else {
        localStorage.submittedEmail = true;
        $('.mailchimp-error-response').hide();
        $('.email-form').fadeOut(function () {
          $('.mailchimp-response').fadeIn();
        });
      }
    }
  })
  return false;
});
