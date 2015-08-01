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
	var macOn = $("#macbook .on");
	var macOff = $("#macbook .off");
	var insertTardisk = $("#details .tardisk")
	var insertMac = $("#details .mac")
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
		      scrollTop: target.offset().top - 62
		    }, 1000);
		    return false;
		  }
		}
	});

	var insertWaypoint = new Waypoint({
		element: document.getElementById('details'),
			handler: function(direction) {

				if (direction == "down") {
					insertTardisk.css("right", "0")
					insertMac.css("right", "0em")
				} else {
					insertTardisk.css("right", "-2.5em")
					insertMac.css("right", "0")
				}
				
			},
			offset: -200
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
					macOn.css("opacity", "1")
				} else {
					exploding = false
					macOn.css("opacity", "0")
				}
			},
			offset: 275
	});
	// var waypoint2 = new Waypoint({
	// 	element: document.getElementById('macbook'),
	// 		handler: function(direction) {

	// 			if (direction == "down") {
	// 				chassisScr = false
	// 				$(chassis).addClass("locked")
	// 				$(chassis).addClass("locked")
	// 			} else {
	// 				chassisScr = true
	// 				$(chassis).removeClass("locked")
	// 				$(chassis).removeClass("locked")
	// 			}
	// 		},
	// 		offset: 150
	// });
	// var waypoint2 = new Waypoint({
	// 	element: document.getElementById('macbook'),
	// 		handler: function(direction) {

	// 			if (direction == "down") {
	// 				plasticScr = false
	// 				$(plastic).addClass("locked")
	// 				$(plastic).addClass("locked")
	// 			} else {
	// 				plasticScr = true
	// 				$(plastic).removeClass("locked")
	// 				$(plastic).removeClass("locked")
	// 			}
	// 		},
	// 		offset: -100
	// });
	// var waypoint3 = new Waypoint({
	// 	element: document.getElementById('macbook'),
	// 		handler: function(direction) {

	// 			if (direction == "down") {
	// 				flashScr = false
	// 				$(flash).addClass("locked")
	// 				$(flash).addClass("locked")
	// 			} else {
	// 				flashScr = true
	// 				$(flash).removeClass("locked")
	// 				$(flash).removeClass("locked")
	// 			}
	// 		},
	// 		offset: -300
	// });

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

	// window.onscroll = function() {

	// 	scroll = getScrollTop();
	// 	calculatescroll(scroll);
	// 	if (exploding == true) {
		    
	// 	} else {

	// 	}
	// }

	// function calculatescroll(scroll) {
	// 	scrolldif = scroll - scrollPos

	// 	if (scrolldif <= 100) {

	// 	}
	// 	else {
	// 		if (chassisScr == true) {
	// 	  		chassis.style.top = (scrolldif - 400) + "px";
	// 	  	}
	// 	  	if (plasticScr == true) {
	// 	  		plastic.style.top = (scrolldif - 685) + "px";
	// 	  	}
	// 	  	if (flashScr == true) {
	// 	  		flash.style.top = (scrolldif - 970) + "px";
	// 	  	}
	// 	}
	// };

	var $win = $(window),
        $pencil = $('.interactive-explosion'),
        $parts = null,
        $pencilForm = $('.pencil-form-section'),
        $pencilFrames = $pencilForm.find('.frame-list li'),
        pencilY = 0,
        isFirefox = navigator.userAgent.match(/Firefox/) !== null;

    // Experiment to test which Amazon link leads to a higher conversion ratio
    // Randomizing link to either point to graphite or walnut.
    //
    // NOTE: Modified to enable this experiment only if link matches US store
    // shortcut link to walnut to avoid problems with international store links.
    // Joe Bryan, sineLABS - 7/12/2014

    // TODO: This needs to be fixed to work with international, randomly
    // clobbering the link.
    // $('.also-available').each(function(i, obj) {
    //     if ($(this).attr("href") === "http://amzn.to/RWkOsB" && Math.random() > 0.5)
    //         $(this).attr("href", "http://amzn.to/1gsJrIF");
    // });

    if ($('html').hasClass('no-touch')) {
        $parts = setPartsData();

        var animationHandler = function() {
            pencilPartsHandler();

            // quick fix to disable turn animation in Firefox
            if ( isFirefox == false) {
                // pencilTurnHandler();
            }
        };

        $(document).scroll(animationHandler);
        $win.resize(animationHandler);
    }

    // fadeText()
    // - $el: the jQuery element whose class will be toggled
    //
    // Toggle the 'fade-in' class based on the scroll position of the
    // pencil section and the fade position of the pencil part.
    function fadeText($el) {
        $el.toggleClass('locked', pencilY > $el.data('fade'));
    }

    // setPartsData()
    //
    // Finds the pencil parts, sets the data for each part, and returns
    // the collection.
    function setPartsData() {
        return $pencil.find('li').each(function() {
            var $part = $(this),
                anim = $part.attr('data-anim').split('|');

            $part
                .data('name',     $part.find('.part-name'))
                .data('desc',     $part.find('.part-desc'))
                .data('isSensor', $part.hasClass('pencil-sensor'))
                .data('origin',   parseInt(anim[0], 10))
                .data('start',    parseInt(anim[1], 10))
                .data('fade',     parseInt(anim[2], 10));
        });
    }

    // movePart()
    // - $el: the jQuery element that will be moved
    //
    // Adjust the CSS top property of the element that will be animated
    // during scroll.
    function movePart($el) {
        var origin = $el.data('origin'),
            start = $el.data('start'),
            y = (pencilY > start) ? origin + (pencilY - start) : origin;

        // special case for the sensor to ease with the battery
        if (pencilY > 1548 && $el.data('isSensor')) {
            y -= (1 - (1770 - pencilY) / 225) * 140;
        }

        $el.css('top', Math.min(0, y));
    }

    // pencilPartsHandler()
    //
    // Calculate the pencil y value and move each part based on the scroll
    // position of the browser window.
    function pencilPartsHandler() {
        pencilY = -($pencil.offset().top - ($win.scrollTop() + $win.height()));

        $parts.each(function() {
            var $part = $(this);

            movePart($part);
            fadeText($part);
        });
    }


});