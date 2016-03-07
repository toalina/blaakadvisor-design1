function Slider(options) {
  options = options || {};
  this.minpos = options.minpos || 0;
  this.maxpos = options.maxpos || 100;
  this.minlval = Math.log(options.minval || 1);
  this.maxlval = Math.log(options.maxval || 100000);
  this.scale = (this.maxlval - this.minlval) / (this.maxpos - this.minpos);

  this.cacheElements(options.els);

  // reset because FF is special and caches the range input value through page refresh
  this.reset();

  this.initInputListener();
  this.initMousedownListener();
  this.initResizeListener();
}

Slider.prototype = {
  // Calculate logarithmic value from a slider position
  value: function(position) {
    return Math.exp((position - this.minpos) * this.scale + this.minlval);
  },
  // Calculate standard slider position from a value
  position: function(value) {
    return this.minpos + (Math.log(value) - this.minlval) / (this.scale / 2) ;
  },
  getEventNames: function () {
    if ('ontouchstart' in window) {
      return {
        'down': 'touchstart.blaak-slider',
        'move': 'touchmove.blaak-slider',
        'up': 'touchend.blaak-slider'
      }
    }
    else {
      return {
        'down': 'mousedown.blaak-slider',
        'move': 'mousemove.blaak-slider',
        'up': 'mouseup.blaak-slider'
      }
    }
  },
  findOffset: function (event) {
    if ('ontouchstart' in window && event.originalEvent) {
      return (event.originalEvent.touches[0].pageX - event.originalEvent.touches[0].target.offsetLeft) - 16;
    }
    else {
      return event.offsetX;
    }
  },
  addCommasToNumber: function (number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  },
  cacheElements: function (els) {
    this.els = {
      $body: $('body'),
      $parent: $(els.parent),
      $slider: $(els.slider),
      $bubble: $(els.bubble)
    }
  },
  updateBubble: function (context) {
    var els = this.els;
    var balance = this.value($(context).val()).toFixed(0);
    var calculatedFee = ((balance * 0.0025) / 12).toFixed(2);
    var fee = balance <= 5000 ? '$1/mo' : '$' + calculatedFee + '/mo';
    els.$bubble.find('.output').empty().text('$' + this.addCommasToNumber(balance));
    els.$bubble.find('.fee').empty().text(fee);
  },
  reset: function () {
    var els = this.els;
    var sliderWidth = els.$slider.innerWidth();
    var newLeft = (sliderWidth / 2) - (sliderWidth * 0.075);
    this.moveBubble({offsetX: newLeft, type: 'resize'})
    // 42474 value is the $5000 mark
    els.$slider.val(42474).trigger('change');
  },
  moveBubble: function (e) {
    var els = this.els;

    var offsetX = this.findOffset(e);

    var newLeft = offsetX - 11;

    var leftToRightBubblePointOffset = window.innerWidth <= 500 ? 82 : 162; // difference from point to point when the bubble is flipped

    var leftBound = 2; // distance to keep bubble point over track button

    var rightBound = (els.$parent.outerWidth() - els.$bubble.outerWidth());

    if (newLeft < leftBound) {
      newLeft = leftBound;
    }
    else if (newLeft > rightBound) {
      newLeft = newLeft - leftToRightBubblePointOffset;
      if (newLeft >= rightBound) {
        newLeft = rightBound;
      }
      els.$bubble.addClass('right-bound');
    }
    else {
      els.$bubble.removeClass('right-bound');
    }
    els.$bubble.css('left', newLeft + 'px');
  },
  initInputListener: function () {
    var self = this;
    this.els.$slider.on('input change', function () {
      self.updateBubble(this);
    });
  },
  initResizeListener: function () {
    var self = this;
    $(window).resize(function () {
      self.reset();
    });
  },
  initMousedownListener: function () {
    var self = this;
    var els = this.els;
    var events = this.getEventNames();
    els.$slider.on(events.down, function (e) {
      self.moveBubble(e);
      els.$body.on(events.move, function (e) {
        self.moveBubble(e);
      });
    }).on(events.up, function () {
      els.$body.off(events.move);
    });
  }
};

var feeSlider = new Slider({
  els: {
    parent: '.slider-wrapper',
    slider: '.slider',
    bubble: '.slider-bubble'
  },
  maxpos: 100000,
  minval: 100,
  maxval: 1000000
});
