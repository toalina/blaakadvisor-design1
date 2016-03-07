(function () {
  var $elements = {
    startingAmount: $('[name="startingAmount"]'),
    goalYears: $('[name="goalYears"]'),
    monthlyContributions: $('[name="monthlyContributions"]'),
    projectedValue: $('.projection-output')
  };

  // Setup our BlaakTrendLine that all our returns will be based on
  var trendLine = new BlaakTrendLine({
    standardDeviation: 16.34,
    expectedReturn: 6.61
  });

  /**
   * Calls our BlaakTrendLine instance and gets the estimated returns
   * @return {array} An array containing the [[high], [average], [low]] returns
   */
  var getReturns = function () {
    var estimatedReturns = trendLine.estimateReturns({
      startingAmount: $elements.startingAmount.val(),
      goalYears: $elements.goalYears.val(),
      monthlyContributions: $elements.monthlyContributions.val()
    });

    return [
      estimatedReturns.high,
      estimatedReturns.average,
      estimatedReturns.low
    ];
  };

  /**
   * Adds commas to numbers
   * @param  {number} N The number to add a comma to
   * @return {string}   A string of the number with the comma in it
   */
  var formatNumber = function (N) {
    // First round the number (i.e. 1234.567 => 1234)
    N = Math.round(N);
    // Now add commas (i.e. 1234 => 1,234)
    N = N.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Finally add the number symbol
    return '$' + N;
  };

  /**
   * Generates an array of incrementing numbers. If you pass 5 you'll get back
   * [1,2,3,4,5] for example.
   *
   * @param  {number} N How many items in your array you want
   * @return {array}    Returns an array of numbers
   */
  var generateLabelArray = function (N) {
    return Array.apply(null, new Array(parseInt(N))).map(function (empty, index) {
        return index + 1;
    });
  };

  /**
   * Validates that startingAmount and goalYears is 1 or greater and that no
   * fields are totally empty
   *
   * @return {Boolean} True if everything is valid, false if not
   */
  var isCalculatorValid = function () {
    var startingAmount = $elements.startingAmount.val();
    var goalYears = $elements.goalYears.val();
    var monthlyContributions = $elements.monthlyContributions.val();

    if (startingAmount < 1 || !startingAmount) return false;
    if (goalYears < 1 || !goalYears) return false;
    if (!monthlyContributions) return false;

    return true;
  };

  /**
   * Generates a chart with Chartist.js. Uses the number of years for the label
   * and the lowest value on the Y axis is set to the starting amount. It also
   * sets the projected value.
   *
   * @return {undefined}
   */
  var updateCalculatorResult = function () {
    var returns = getReturns();
    var startingAmount = $elements.startingAmount.val();
    var yearIncrement = 0;
    var yearSeries = [[startingAmount],[startingAmount],[startingAmount]];

    // Only need each year amount, not every month
    returns[0].forEach(function (yearAmount, i) {
      yearIncrement++;
      if (yearIncrement == 12) {
        yearSeries[0].push(returns[0][i]);
        yearSeries[1].push(returns[1][i]);
        yearSeries[2].push(returns[2][i]);
        yearIncrement = 0;
      }
    });

    if (!isCalculatorValid()) return;

    // Gets the last number in the average return array
    var projectedValue = returns[1][returns[1].length - 1];
    $elements.projectedValue.text(formatNumber(projectedValue))
  };

  $('.calc-input input')
    .on('focus', function () {
      $(this).select();
    })
    // On blur if a field is empty force it to 1 then trigger a chart update
    .blur('blur', function () {
      if (!$(this).val()) {
        $(this).val('1');
        updateCalculatorResult();
      }
    })
    // Use keyup + change so you can click the number arrows to update the chart
    .on('keyup change', function () {
      updateCalculatorResult();
    });

  updateCalculatorResult();
})();
