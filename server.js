var express = require('express'),
    bodyParser = require('body-parser'),
    signup = require('./signup'),
    app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

app.post('/mailchimp', function (req, res) {
  signup.save(req.body.email, function (err, json) {
    if (err) return console.log(err);
    res.send(json);
  });
});

module.exports = app.listen(port, function() {
  console.log('server up on port: ' +  port);
});


