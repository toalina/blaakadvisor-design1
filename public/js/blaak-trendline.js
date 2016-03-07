var BlaakTrendLine = function (opts) {
  this.standardDeviation = opts.standardDeviation / 100;
  this.expectedReturn = opts.expectedReturn / 100;
}

BlaakTrendLine.prototype.annualizeStandardDeviation = function (goalYear) {
  return this.standardDeviation / Math.pow(goalYear, 0.5);
};

BlaakTrendLine.prototype.computeConfidenceInterval = function (level, goalYear) {
  var confidenceLevel = {
    high: 1.282,
    average: 0,
    low: -1.282
  };

  var standardDeviation = this.annualizeStandardDeviation(goalYear);

  return standardDeviation  * confidenceLevel[level] + this.expectedReturn;
};

BlaakTrendLine.prototype.compoundReturns = function (level, goalYears, monthlyAmount, startingAmount) {
  var self = this;
  var month = 1;
  var goalMonths = goalYears * 12;
  var monthlyAmount = parseFloat(monthlyAmount) || 0;
  var finalAmounts = [parseFloat(startingAmount)];

  var compound = function (level, goalYears, amount) {
    var confInterval = self.computeConfidenceInterval(level, goalYears);
    var monthlyConfInterval = Math.pow(confInterval + 1, 1/12) - 1;

    var newAmount = (amount * (1 + monthlyConfInterval)) + monthlyAmount;

    finalAmounts.push(newAmount);

    if (month < goalMonths) {
      month++;
      compound(level, goalYears, newAmount);
    }
  }

  compound(level, goalYears, startingAmount);
  return finalAmounts;
}

BlaakTrendLine.prototype.estimateReturns = function (opts) {
  return {
    'high': this.compoundReturns('high', opts.goalYears, opts.monthlyContributions, opts.startingAmount),
    'average': this.compoundReturns('average', opts.goalYears, opts.monthlyContributions, opts.startingAmount),
    'low': this.compoundReturns('low', opts.goalYears, opts.monthlyContributions, opts.startingAmount),
  }
}
