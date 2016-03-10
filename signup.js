var request = require('request');

// Returns boolean if email is valid or not
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

function errorMessage(message) {
  return {
    status: "error",
    message: message
  };
};

function save (email, cb) {
  if (!validateEmail(email)) return cb.call(this, null, errorMessage('Invalid email'));

  var formData = {
    apikey: 'dc748e316d859b92c68e89ef2356a375-us12',
    id: '5e98ccce28',
    email: {
      email: email
    },
    double_optin: false
  }

  request({method: 'POST', uri:'https://us12.api.mailchimp.com/2.0/lists/subscribe', body: JSON.stringify(formData)}, function optionalCallback(err, httpResponse, body) {
    var response = {};

    // This body may be blank if we ever lose connection to the mailchimp API
    try {
      response = JSON.parse(body);
    } catch (e) {
      // Just keep on keeping on...
    };

    var message = 'Something went wrong, try again?';
    if (err || response.status == 'error') {
      if (response.name == 'List_AlreadySubscribed') {
        message = 'Email already exists';
      }
      return cb.call(this, null, errorMessage(message));
    }
    cb.call(this, null, { status: "success", message: "Nice! We'll send you an invite once we're ready." });
  });

};

exports.save = save;
