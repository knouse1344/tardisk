// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .





$(document).ready(function(){

	var exploding = false;
	var scrollPos = 0;
	var scrolldif = 0;
	var scrollCurrent = 0;
	var chassisScr = false;
	var flashScr = false;
	var plasticScr = false;
	var chassis = document.getElementById('chassis');
	var plastic = document.getElementById('plastic');
	var flash = document.getElementById('flash');

	////////////   Smooth Scrolling

	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		  var target = $(this.hash);
		  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		  if (target.length) {
		    $('html,body').animate({
		      scrollTop: target.offset().top - 50
		    }, 1000);
		    return false;
		  }
		}
	});

	var waypoint = new Waypoint({
		element: document.getElementById('seamless'),
			handler: function(direction) {
				scrollPos = getScrollTop();

				if (direction == "down") {
					chassisScr = true
					flashScr = true
					exploding = true
					plasticScr = true
				} else {
					exploding = false
				}
			},
			offset: 250
	});
	var waypoint2 = new Waypoint({
		element: document.getElementById('macbook'),
			handler: function(direction) {

				if (direction == "down") {
					chassisScr = false
					$(chassis).children(".title").css("opacity", "1")
					$(chassis).children(".info").css("opacity", "1")
				} else {
					chassisScr = true
					$(chassis).children(".title").css("opacity", "0")
					$(chassis).children(".info").css("opacity", "0")
				}
			},
			offset: -150
	});
	var waypoint2 = new Waypoint({
		element: document.getElementById('macbook'),
			handler: function(direction) {

				if (direction == "down") {
					plasticScr = false
					$(plastic).children(".title").css("opacity", "1")
					$(plastic).children(".info").css("opacity", "1")
				} else {
					plasticScr = true
					$(plastic).children(".title").css("opacity", "0")
					$(plastic).children(".info").css("opacity", "0")
				}
			},
			offset: -400
	});
	var waypoint3 = new Waypoint({
		element: document.getElementById('macbook'),
			handler: function(direction) {

				if (direction == "down") {
					flashScr = false
					$(flash).children(".title").css("opacity", "1")
					$(flash).children(".info").css("opacity", "1")
				} else {
					flashScr = true
					$(flash).children(".title").css("opacity", "0")
					$(flash).children(".info").css("opacity", "0")
				}
			},
			offset: -650
	});

	function getScrollTop() {
		if (typeof window.pageYOffset !== 'undefined' ) {
		// Most browsers
		return window.pageYOffset;
		}

		var d = document.documentElement;
		if (d.clientHeight) {
		// IE in standards mode
		return d.scrollTop;
		}

		// IE in quirks mode
		return document.body.scrollTop;
	}

	window.onscroll = function() {

		if (exploding == true) {
		    scroll = getScrollTop();
		    calculatescroll(scroll);
		} else {

		}
	}

	function calculatescroll(scroll) {
		scrolldif = scroll - scrollPos
	    console.log(scrolldif)

		if (scrolldif <= 100) {

		}
		else {
			if (chassisScr == true) {
		  		chassis.style.top = (scrolldif - 650) + "px";
		  	}
		  	if (plasticScr == true) {
		  		plastic.style.top = (scrolldif - 935) + "px";
		  	}
		  	if (flashScr == true) {
		  		flash.style.top = (scrolldif - 1200) + "px";
		  	}
		}
	};

});