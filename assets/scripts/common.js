$(window).on('load',function(){
	$('.preloader').fadeOut(600);
});

jQuery( function() {

	// smooth scrolling
	$('.navbar-nav li a, .nav-footer li a, .smooth-scroll').on('click', function (e) {
		e.preventDefault();

		var spaceOffset = 20; // you may change this value as needed
		$('html,body').animate({scrollTop: $(this.hash).offset().top - spaceOffset}, 800);
	});

	$(window).bind('load resize', function() {
		if( $(window).width() < 769 ) {
			/* hide collapsible menu once menu item clicked on mobile */
			$('.navbar-nav li a').on( 'click', function() {
				if($(this).parents('.navbar-collapse.collapse').hasClass('in')) {
					$('#main-navbar').collapse('hide');
				}
			});
		}
	});

	// navigation bar
	$(window).scroll(function() {
		if($(document).scrollTop() > 100) {
			$('.navbar-fixed-top').addClass('navbar-scroll-mode');
			$('.navbar-brand .logo').attr('src', 'assets/img/logo-dark.png');
			$('.nav-icon span').css('background-color', '#5f5f5f');
		}else {
			$('.navbar-fixed-top').removeClass('navbar-scroll-mode');
			$('.navbar-brand .logo').attr('src', 'assets/img/logo.png');
			$('.nav-icon span').css('background-color', '');
		}
	});


	// mobile navigation icon
	$('#main-navbar').on('show.bs.collapse', function() {
		$('.nav-icon').addClass('open');
	});

	$('#main-navbar').on('hide.bs.collapse', function() {
		$('.nav-icon').removeClass('open');
	});

	// hero unit
	var theSwiper = new Swiper('.swiper-container', {
		speed: 1500,
		autoplay: 3000,
		loop: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		effect: 'fade',
		keyboardControl: true,
		fade: {
			crossFade: true
		}
	});

	// team carousel
	$('#carousel-team').owlCarousel({
		items: 2,
		itemsTablet: [1024, 2],
		navigation: false,
		pagination: true,
		slideSpeed: 800,
		autoPlay: 3000
	});

	// counting animation on scroll
	var repeatNum = 1,
		countNum = 0;
	$('.fact').bind('appear', function() {
		if(countNum < repeatNum) {
			$('.counter').each( function() {
				var $this = $(this)

				$({ Counter: 0}).animate({ Counter: $this.text() }, {
					duration: 1000,
					easing: 'swing',
					step: function() {
						$this.text(Math.ceil(this.Counter));
					}
				});
			});
		}

		countNum++;
	});

	// portfolio
	var $container = $('.portfolio-isotope');

	$container.imagesLoaded(function() {
		var $isoObj = $container.isotope({
			itemSelector: '.portfolio-list-item',
			layoutMode: 'fitRows',
			transitionDuration: '0.7s'
		});

		$('.portfolio-item-filters a').click( function(e) {
			e.preventDefault();

			var selector = $(this).attr('data-filter');
			$container.isotope({
				filter: selector
			});

			$container.parent().height($container.height());

			$('.portfolio-item-filters a').removeClass('active');
			$(this).addClass('active');
		});
	});


	$('.ajax-popup-link').magnificPopup({
		type: 'ajax',
		closeMarkup: '<button title="%title%" type="button" class="mfp-close">&nbsp;</button>',
		callbacks: {
			ajaxContentAdded: function() {
				var imageSlider = $(this.content).find('#portfolio-image-slider');

				if(imageSlider.length) {
					imageSlider.owlCarousel({
						singleItem: true,
						navigation: true,
						pagination: true,
						slideSpeed: 800,
						autoPlay: 3000,
					});
				}
			},
		}
	});

	// testimonial
	$('#testimonial-carousel').owlCarousel({
		singleItem: true,
		autoPlay: 3000,
		transitionStyle: 'fade'
	});

	// clients
	$('#logo-carousel').owlCarousel({
		items: 4,
		autoPlay: 3000,
	});

	if($('[data-toggle="tooltip"]').length > 0) {
		$('[data-toggle="tooltip"]').tooltip();
	}

	// map
	// var firstToggle = false,
	// 	toHeight = '450px'
	// 	mapLat = 37.4219998
	// 	mapLong = -122.0840572;

	// createMap(mapLat, mapLong); // create map first will fix marker position

	// $('.map-toggle').clickToggle( 
	// 	function(e) {
	// 		e.preventDefault();

	// 		$('#map').animate({
	// 			height: '450px'
	// 		}, 300, function() {
	// 			if(!firstToggle) createMap(mapLat, mapLong);
	// 		});
	// 	},
	// 	function(e) {
	// 		e.preventDefault();

	// 		$('#map').animate({
	// 			height: '0'
	// 		}, 300);
	// 	}
	// );

	// function createMap(mLat, mLong) {
	// 	var map = new GMaps({
	// 		div: '#map',
	// 		lat: mLat, 
	// 		lng: mLong,
	// 		scrollwheel: false,
	// 		zoom: 18
	// 	});

	// 	map.drawOverlay({
	// 		lat: map.getCenter().lat(),
	// 		lng: map.getCenter().lng(),
	// 		content: '<div class="map-overlay"><img src="assets/img/logo.png"><div class="overlay_arrow above"></div></div>',
	// 	});
	// }

	// WOW JS
	if( $(window).width() > 768 ) {
		new WOW().init();
	}

	// video background
	if( $('.video-background').length ) {
		$('#hero-video').vide({
			mp4: 'assets/video/coding.mp4',
			webm: 'assets/video/coding.webm',
			ogv: 'assets/video/coding.ogv',
			poster: 'assets/video/coding.jpg',
		}, {
			posterType: 'jpg'
		});
	}

	// parallax image background
	if( $('#hero-parallax').length ) {
		$('#hero-parallax').parallax({
			imageSrc: "assets/img/parallax-image.jpg",
			zIndex: 0
		});
	}

	if( $('#service-facts-parallax').length ) {
		$('#service-facts-parallax').parallax({
			imageSrc: "assets/img/parallax-image2.jpg",
			zIndex: 0,
			speed: 0.5
		});
	}

	// AJAX contact form
	// $('#contact-form').parsley();

	// $('#contact-form').submit( function(e) {
	// 	e.preventDefault();

	// 	if( !$(this).parsley('isValid') )
	// 		return;

	// 	$theForm = $(this);
	// 	$btn = $(this).find('#submit-button');
	// 	$btnText = $btn.text();
	// 	$(this).parent().append('<div class="alert"></div>');
	// 	$alert = $(this).parent().find('.alert');

	// 	$btn.prop('disabled', true).text("Sending...");

	// 	$url = "php/contact.php";

	// 	$attr = $(this).attr('action');
	// 	if (typeof $attr !== typeof undefined && $attr !== false) {
	// 		if($(this).attr('action') != '') $url = $(this).attr('action');
	// 	}

	// 	$.post($url, $(this).serialize(), function(data){
			
	// 		$message = data.message;
			
	// 		if( data.result == true ){
	// 			$theForm.slideUp('medium', function() {
	// 				$alert.removeClass('alert-danger');
	// 				$alert.addClass('alert-success').html($message).slideDown('medium');
	// 			});
	// 		}else {
	// 			$alert.addClass('alert-danger').html($message).slideDown('medium');
	// 		}

	// 		$btn.prop('disabled', false).find('span').text($btnText);

	// 	})
	// 	.fail(function() { console.log('AJAX Error'); });
	// });
});


// toggle function
$.fn.clickToggle = function( f1, f2 ) {
	return this.each( function() {
		var clicked = false;
		$(this).bind('click', function() {
			if(clicked) {
				clicked = false;
				return f2.apply(this, arguments);
			}

			clicked = true;
			return f1.apply(this, arguments);
		});
	});

};


