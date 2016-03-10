var $output = $('.knob-output');
var $fee = $output.find('.fee');
var $balance = $output.find('.balance');

var addCommasToNumber = function (number) {
  var parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

var calculateBalance = function (position) {
  var minpos = 0;
  var maxpos = 100000;
  var minlval = Math.log(100);
  var maxlval = Math.log(1000000);
  var scale = (maxlval - minlval) / (maxpos - minpos);

  var money = Math.exp((position - minpos) * scale + minlval);

  return money.toFixed(2);
}

var calculateFee = function (balance) {
  var fee = (balance * 0.0025) / 12;
  return fee.toFixed(2);
};

/* =====
Code for using jquery.knob library
==== */
$(".knob").knob({
  change : function (value) {
    var balance = calculateBalance(value);
    $balance.empty().text('$' + addCommasToNumber(balance));
    var fee = balance < 5000 ? 1.00 : calculateFee(balance);
    $fee.empty().text('$' + fee);
  }
});
