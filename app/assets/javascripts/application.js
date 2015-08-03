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

				if (direction == "down") {
					macOn.css("opacity", "1")
				} else {
					macOn.css("opacity", "0")
				}
			},
			offset: 275
	});

	var $win = $(window),
        $explosion = $('.interactive-explosion'),
        $parts = null,
        explosionY = 0,
        isFirefox = navigator.userAgent.match(/Firefox/) !== null;


    if ($('#seamless').hasClass('seamless')) {
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

    function fadeText($el) {
        $el.toggleClass('locked', explosionY > $el.data('fade'));
    }

    function setPartsData() {
        return $explosion.find('li').each(function() {
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

    function movePart($el) {
        var origin = $el.data('origin'),
            start = $el.data('start'),
            y = (explosionY > start) ? origin + (explosionY - start) : origin;

        // special case for the sensor to ease with the battery
        if (explosionY > 1548 && $el.data('isSensor')) {
            y -= (1 - (1770 - pencilY) / 225) * 140;
        }

        $el.css('top', Math.min(0, y));
    }

    function pencilPartsHandler() {
        explosionY = -($explosion.offset().top - ($win.scrollTop() + $win.height()));

        $parts.each(function() {
            var $part = $(this);

            movePart($part);
            fadeText($part);
        });
    }


});