/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// // jquery knob
	// require('./jquery.knob.min.js');
	// require('./knob-scripts.js');

	// // grow money data calculator
	// require('./blaak-trendline.js');
	// require('./blaak-calculator.js');


	// input error
	__webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);