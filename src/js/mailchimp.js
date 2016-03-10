// If the user has NOT submitted their email let's focus on the input field to
// make it just a little easier for them to submit it. But if they have
// submitted it don't focus so that the browser remembers their scroll position.
if (!localStorage.submittedEmail) {
  $('.input-email').first().focus();
}

var emailRequest = function (formId) {
  $.ajax({
    url: '/mailchimp',
    type: 'post',
    data: {
      email: $('.input-email-'+formId).val()
    },
    dataType: 'json',
    complete: function (xhr, response) {
      var json = JSON.parse(xhr.responseText);
      var $responseDisplay = $('.mailchimp-response');
      if (json == undefined) {
        $responseDisplay.text('Uh oh something went wrong. Try again?').removeClass('hide').addClass('error');
      }
      else if (json.status == "error") {
        $responseDisplay.text('Uh oh something went wrong. Try again?').removeClass('hide').addClass('error');
      }
      else {
        localStorage.submittedEmail = true;
        $responseDisplay.text(json.message).removeClass('error hide');
      }
      setTimeout(function () {
        $responseDisplay.addClass('hide');
      }, 5000);
    }
  })
};

$('.email-form').on('submit', function (e) {
  var formId = $(this).data('form-id');
  emailRequest(formId);
  return false;
});
