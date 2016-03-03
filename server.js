var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000;

module.exports = app.listen(port, function() {
  console.log('server up on port: ' +  port);
});


