/*
	Name: cvCard
	Description: Responsive HTML5 vCard Template
	Version: 1.2.2
	Author: pixelwars
*/



/* global variables */
var classicLayout = false;
var portfolioKeyword;
var $container, $blog_container;


(function ($) {
	
	
	/* DOCUMENT LOAD */
	$(function() {
		
		
		// ------------------------------
		// start loader
		NProgress.start();
		// ------------------------------
		
		
		setMasonry();
		
		// ------------------------------
		// Rotating Words
		var rotate_words = $('.rotate-words');
		if(rotate_words.length) {
			
			if(Modernizr.csstransforms) {
			
				rotate_words.each(function(index, element) {
					$(element).find('span').eq(0).addClass('active');
					setInterval(function(){
						next_word_index = $(element).find('.active').next().length ? $(element).find('.active').next().index() : 0;
						$(element).find('.active').addClass('rotate-out').removeClass('rotate-in active');
						$(element).find('span').eq(next_word_index).addClass('rotate-in active').removeClass('rotate-out');
					},3000);
				});
	
			}
			else {
				
				rotate_words.each(function(index, element) {
					$(element).find('span').eq(0).addClass('active').show();
					setInterval(function(){
						next_word_index = $(element).find('.active').next().length ? $(element).find('.active').next().index() : 0;
						$(element).find('.active').removeClass('active').slideUp(500);
						$(element).find('span').eq(next_word_index).addClass('active').slideDown(500);
					},3000);
				});
			}
		}
		// ------------------------------
		
		
		// ------------------------------
		/* LATEST TWEETS WIDGET */
		var latest_tweets = $('#latest-tweets');
		if(latest_tweets.length) {
			var config = {
			  "profile": {"screenName": latest_tweets.data("twitter-name")},
			  "domId": '',
			  "maxTweets": latest_tweets.data("tweet-count"),
			  "enableLinks": true,
			  "showUser": false,
			  "showTime": true,
			  "dateFunction": '',
			  "showRetweet": latest_tweets.data("include-retweets"),
			  "customCallback": handleTweets,
			  "showInteraction": false
			};
			function handleTweets(tweets){
			  var x = tweets.length;
			  var n = 0;
			  var html = '<ul>';
			  while(n < x) {
				html += '<li>' + tweets[n] + '</li>';
				n++;
			  }
			  html += '</ul>';
			  latest_tweets.html(html);
			}
			twitterFetcher.fetch(config);
		}	 
		// ------------------------------
		
		
		
		
		// ------------------------------
		// SEARCH
		$('.search-link').click(function() {
			$(this).toggleClass('active');
			$('.header-search').slideToggle();
		});
		// ------------------------------
		
		
			
		// ------------------------------
		// ONE PAGE LAYOUT FUNCTIONS
		if($('html').hasClass('one-page-layout')) {
			
			// ------------------------------
			// PORTFOLIO DETAILS
			// if url contains a portfolio detail url
			portfolioKeyword = $('section.portfolio').attr('id');
			initialize();
			var detailUrl = giveDetailUrl();
			// ------------------------------
			
			
			// ------------------------------
			// LAYOUT DETECT
			var pagesCount = $('.wrapper > section').length;
			var isIE11 = !!navigator.userAgent.match(/Trident\/7\./); 
			classicLayout = $('html').attr('data-classic-layout') === 'true';
			classicLayout = classicLayout || ($('html').attr('data-mobile-only-classic-layout') === 'true' && $(window).width() < 768);
			classicLayout = classicLayout || !Modernizr.csstransforms3d ||  pagesCount < 3 || isIE11 ;
			if(classicLayout) {
				$('html').addClass('classic-layout');	
				setActivePage();
				setTimeout(function() { setMasonry(); }, 600);	
				$.address.change(function() {
					setActivePage();
					initializeMap();
					setTimeout(function() { setMasonry(); }, 100);	
					});
			}
			// initialize triple layout
			$.initTripleLayout(); 
			setTimeout(function() { refreshMasonry(); },300);
			// ------------------------------
			
			
			// FULL BROWSER BACK BUTTON SUPPORT 
			var prevUrl = -1;
			$.address.change(function() {
					var detailUrl = giveDetailUrl();
					if(detailUrl != -1 ) {
						showProjectDetails(detailUrl);
					} else {
						if ($.address.path().indexOf("/"+ portfolioKeyword)!=-1) {
							if(prevUrl != -1) {
								hideProjectDetails(true,false);
							} else {
								hideProjectDetails(true,true);	
							}
						}
					}
					prevUrl = giveDetailUrl();
				}); 
		}
		// ------------------------------	
		
		
		
		// ------------------------------
		// SETUP PLUGINS
		setup();
		// ------------------------------
		
		
		
		// ------------------------------
		// PORTFOLIO DETAILS
		// Show details
		$(".one-page-layout a.ajax").live('click',function() {
			
			var returnVal;
			var url = $(this).attr('href');
			var baseUrl = $.address.baseURL();
			
			if(url.indexOf(baseUrl) != -1) { // full url
				var total = url.length;
				detailUrl = url.slice(baseUrl.length+1, total);	
			} else { // relative url
				detailUrl = url;
			}
			
			$.address.path(portfolioKeyword + '/' + detailUrl );
			
			return false;
			
		});
		// ------------------------------
		
		
		
		// ------------------------------
		// FORM VALIDATION
		// comment form validation fix
		$('#commentform').addClass('validate-form');
		$('#commentform').find('input,textarea').each(function(index, element) {
            if($(this).attr('aria-required') == "true") {
				$(this).addClass('required');
			}
			if($(this).attr('name') == "email") {
				$(this).addClass('email');
			}
		});
		
		// validate form
		if($('.validate-form').length) {
			$('.validate-form').each(function() {
					$(this).validate();
				});
		}
		// ------------------------------
		
		
		// ------------------------------
		// FILL SKILL BARS
		fillBars();
		// ------------------------------
		
		
		
		// ------------------------------
		/* TOOLTIPS */
		$('.tooltip').each(function(index, element) {
        	$(this).tooltipster({
			position: $(this).attr('data-tooltip-pos'),
			fixedWidth : 300,
			offsetX : 0,
			animation : "grow",
			delay : 50
			});
	 
        });	
		// ------------------------------
		
		
		
		// ------------------------------
		// GOOGLE MAP
		/*
			custom map with google api
			check out the link below for more information about api usage
			https://developers.google.com/maps/documentation/javascript/examples/marker-simple
		*/
		function initializeMap() {
			if($('.map').length) {
				var mapCanvas = $('#map-canvas');
				var myLatlng = new google.maps.LatLng(mapCanvas.data("latitude"),mapCanvas.data("longitude"));
				var mapOptions = {
					zoom: mapCanvas.data("zoom"),
					center: myLatlng
				}
				var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
				
				var marker = new google.maps.Marker({
				  position: myLatlng,
				  map: map
		  	});
			}
		  
		}
		google.maps.event.addDomListener(window, 'load', initializeMap);
		// ------------------------------
		
		
	});
	// DOCUMENT READY
	

	
	// WINDOW ONLOAD
	window.onload = function() {
		
		NProgress.done();
		
	};
	// WINDOW ONLOAD	
	
	
	
	// ------------------------------
	// ------------------------------
		// FUNCTIONS
	// ------------------------------
	// ------------------------------
	
	
	// ------------------------------
	// INITIALIZE
	var inAnimation, outAnimation;
	function initialize() {
		inAnimation = $('html').attr('data-inAnimation');
		outAnimation = $('html').attr('data-outAnimation');
	}
	// ------------------------------
	
	
	// ------------------------------
	// SETUP : plugins
	function setup() {
		// ------------------------------
		// LIGHTBOX
		setupLigtbox();
		// ------------------------------
		
		
		
		// ------------------------------
		// CODE PRETTIFY
		if($('.prettyprint').length) {
			window.prettyPrint && prettyPrint();
		}
		// ------------------------------
		
		
		
		// ------------------------------
		// TABS
		$('.tabs').each(function() {
			if(!$(this).find('.tab-titles li a.active').length) {
				$(this).find('.tab-titles li:first-child a').addClass('active');
				$(this).find('.tab-content > div:first-child').show();
			} else {
				$(this).find('.tab-content > div').eq($(this).find('.tab-titles li a.active').parent().index()).show();	
			}
		});
		
		$('.tabs .tab-titles li a').click(function() {
			if($(this).hasClass('active')) { return; }
			$(this).parent().siblings().find('a').removeClass('active');
			$(this).addClass('active');
			$(this).parents('.tabs').find('.tab-content > div').hide().eq($(this).parent().index()).show();
			return false;
		});
		// ------------------------------
		
		
		// ------------------------------
		// TOGGLES
		var toggleSpeed = 300;
		$('.toggle h4.active + .toggle-content').show();
	
		$('.toggle h4').click(function() {
			if($(this).hasClass('active')) { 
				$(this).removeClass('active');
				$(this).next('.toggle-content').stop(true,true).slideUp(toggleSpeed);
			} else {
				
				$(this).addClass('active');
				$(this).next('.toggle-content').stop(true,true).slideDown(toggleSpeed);
				
				//accordion
				if($(this).parents('.toggle-group').hasClass('accordion')) {
					$(this).parent().siblings().find('h4').removeClass('active');
					$(this).parent().siblings().find('.toggle-content').stop(true,true).slideUp(toggleSpeed);
				}
				
			}
			return false;
		});
		// ------------------------------
		
		
		
		// ------------------------------
		// RESPONSIVE VIDEOS
		if($('.media-wrap, .portfolio-single').length) {
			$(".media-wrap, .portfolio-single").fitVids();
		}
		// ------------------------------
		
		
		
		// ------------------------------
		// UNIFORM
		$("select:not([multiple]), input:checkbox, input:radio, input:file").uniform();
		var ua = navigator.userAgent.toLowerCase();
		var isAndroid = ua.indexOf("android") > -1;
		var isWindowsPhone = ua.indexOf("windows phone") > -1;
		if(isAndroid) {
			$('html').addClass('android');
		}
		if(!isWindowsPhone) {
			
			// ------------------------------
			// remove click delay on touch devices
			FastClick.attach(document.body);
			// ------------------------------
		}
		// ------------------------------
		 
		 
		 
		// ------------------------------
		/* FLEX SLIDER */
		// cache container
		var $flexslider = $('.flexslider');
		if($flexslider.length) {
			
			$flexslider.each(function() {
			
				//wait for images
				$(this).imagesLoaded(function() {
					
					//remove loading
					$(this).find('.loading').remove();
					
					//setup slider
					$(this).flexslider({ 
						smoothHeight: true,
						slideshow: $(this).attr('data-autoplay') != "false",
						slideshowSpeed: $(this).attr('data-interval'), 
						animationSpeed : $(this).attr('data-animationSpeed'),
						animation: $(this).attr('data-animation'), 
						direction : $(this).attr('data-direction'),
						directionNav : $(this).attr('data-directionNav') != "false",
						controlNav : $(this).attr('data-controlNav') != "false",
						randomize : $(this).attr('data-randomize') == "true",
						startAt : $(this).attr('data-startAt') != null ? parseInt($(this).attr('data-startAt')) : 0,
						animationLoop : $(this).attr('data-animationLoop') != "false",
						pauseOnHover : $(this).attr('data-pauseOnHover') != "false",
						reverse : $(this).attr('data-reverse') == "true",
						prevText: "",
						nextText: "",
						start: function(slider) {
								slider.find('li img').click(function(event){	
									event.preventDefault();
									slider.flexAnimate(slider.getTarget("next"));
								});
							}
						});
					
				});
			
			});
		}
		// ------------------------------
		
		
		// ------------------------------
		/* MEDIAELEMENT.JS - self hosted html5 video and audio player */
		if($('video,audio').length) {
			$('video,audio').mediaelementplayer({ audioHeight: 50 });	
		}
		// ------------------------------
	}
	// ------------------------------
	
	
	
	// ------------------------------
	// CHANGE PAGE
	function setActivePage() {
		
			$('.page').removeClass('active').hide();
			var path = $.address.path();
			path = path.slice(1, path.length);
			path = giveDetailUrl() != -1 ? portfolioKeyword : path;
			if(path == "") {  // if hash tag doesnt exists - go to first page
				var firstPage = $('.vs-nav li').first().find('a').attr('href');
				path = firstPage.slice(2,firstPage.length);
				$.address.path(path);
				return false;
				}
			
			// show page
			$('#'+ path).fadeIn();
			$('.page.active').hide();
			$('#'+ path).addClass('active');
			setCurrentMenuItem();
			
			if(path.indexOf(portfolioKeyword) != -1) {
				setTimeout(function() { setMasonry(); }, 100);
			} 
			
			$("body").scrollTop(0);

	}	
	// ------------------------------
	
	
	// ------------------------------
	// MASONRY - ISOTOPE
	function setMasonry() {
		
		var masonry = $('.portfolio-items, .latest-posts');
		if (masonry.length) {
			masonry.each(function(index, el) {
				
				// call isotope
				refreshMasonry();
				$(el).imagesLoaded(function() {
					$(el).isotope({
					  layoutMode : $(el).data('layout') ? $(el).data('layout') : 'masonry'
					});
					// set columns
					refreshMasonry();
				});
				
				if (!$(el).data('isotope')) {
					// filters
					var filters = $(el).siblings('.filters');
					if(filters.length) {
						filters.find('a').on("click", function() {
							var selector = $(this).attr('data-filter');
							  $(el).isotope({ filter: selector });
							  $(this).parent().addClass('current').siblings().removeClass('current');
							  return false;
							});
						}
				}
				
			}); //each
		}
	}			
	$(window).on('resize debouncedresize', function() {
    	refreshMasonry();
		setTimeout(function() { refreshMasonry(); },1000)
	});
	// ------------------------------
		
	// ------------------------------
	// REFRSH MASONRY - ISOTOPE
	function refreshMasonry() {
		
		var masonry = $('.portfolio-items, .latest-posts');
		if (masonry.length) {
			masonry.each(function(index, el) {
				
				// check if isotope initialized
				if ($(el).data('isotope')) {
					
					var itemW = 360;
					var containerW = $(el).width();
					var items = $(el).children('.hentry');
					var columns = Math.round(containerW/itemW);
				
					// set the widths (%) for each of item
					items.each(function(index, element) {
						var multiplier = $(this).hasClass('x2') && columns > 1 ? 2 : 1;
						var itemRealWidth = (Math.floor( containerW / columns ) * 100 / containerW) * multiplier ;
						$(this).css( 'width', itemRealWidth + '%' );
					});
				
					var columnWidth = Math.floor( containerW / columns );
					
					$(el).isotope( 'option', { masonry: { columnWidth: columnWidth } } );
					$(el).isotope('layout');
					}
				
			}); //each
		}
	}	
	// ------------------------------
	
	
	
	// ------------------------------
	// FILL PROGRESS BARS
	function fillBars() {
		$('.bar').each(function() {
			 var bar = $(this);
			 bar.find('.progress').css('width', bar.attr('data-percent') + '%' );
			});
	}	
	// ------------------------------	
	
	
	
	// ------------------------------
	// LIGHTBOX
	function setupLigtbox() {
		
		//html5 validate fix
		$('.lightbox').each(function(index, element) {
			$(this).attr('rel', $(this).attr('data-lightbox-gallery'));
		});
		
		if($("a[rel^='fancybox']").length) {
			$("a[rel^='fancybox']").fancybox({
				centerOnScroll : true,
				padding : 10,
				margin : 44,
				width : 640,
				height : 360,
				transitionOut : 'none',
				overlayColor : '#BEBD97',
				overlayOpacity : '.6',
				onStart : function() {
					NProgress.start();
					$( 'body' ).addClass( 'lightbox-active' );
				},
				onClosed : function() {
					$( 'body' ).removeClass( 'lightbox-active' );
				},
				onComplete : function() {
					NProgress.done();
					if ($(this).attr('href').indexOf("soundcloud.com") >= 0) {
						$('#fancybox-content').height(166);
					}
				}
			});
		}	
	}
	// ------------------------------	
	
	
	
	
	
	// ------------------------------
	// SET CURRENT MENU ITEM
	function setCurrentMenuItem() {
		var activePageId = $('.page.active').attr('id');
		// set default nav menu
		$('.vs-nav a[href$=' + activePageId +']').parent().addClass('current_page_item').siblings().removeClass('current_page_item');
	}	
	// ------------------------------
	
	
	// ------------------------------
	// AJAX PORTFOLIO DETAILS
	var pActive;
	
	function showProjectDetails(url) {
		
		showLoader();
		
		var p = $('.p-overlay:not(.active)').first();
		pActive = $('.p-overlay.active');
		
		if(pActive.length) {
			hideProjectDetails();	  
		}
		
		// ajax : fill data
		p.empty().load(url + ' .portfolio-single', function() {	
			NProgress.set(0.5);
			
			// wait for images to be loaded
			p.imagesLoaded(function() {
				
				hideLoader();
				
				$('html').addClass('p-overlay-on');
				
				$("body").scrollTop(0);
								
				// setup plugins
				setup();
				
				if(Modernizr.csstransforms && Modernizr.csstransforms3d) { // modern browser
				p.removeClass('animated '+ outAnimation + " " + inAnimation ).addClass('animated '+ inAnimation).show();
				} else { //old browser
					p.fadeIn();	
				}
				p.addClass('active');
				
			});
		});
	}
	
	function hideProjectDetails(forever, safeClose) {
		// param forever : close the detail window forever. no navigating through the windows.
		// param safeClose : true if it is triggered by menu change = not a real close.
		$('html').removeClass('p-overlay-on');
		
		// close completely by back link.
		if(forever) {
			pActive = $('.p-overlay.active');
			if(!safeClose) {
				// remove detail url
				$.address.path(portfolioKeyword);
				$("body").scrollTop(0);
			}
		}
		
		pActive.removeClass('active');
		
		if(Modernizr.csstransforms && Modernizr.csstransforms3d) { // modern browser
			pActive.removeClass('animated '+ inAnimation).addClass('animated '+ outAnimation);
			setTimeout(function() { pActive.hide().removeClass(outAnimation).empty(); } ,1010)
		} else { //old browser
			pActive.fadeOut().empty();	
		}
	}
	
	function giveDetailUrl() {
	
		var address = $.address.value();
		var detailUrl;
		
		if (address.indexOf("/"+ portfolioKeyword + "/")!=-1 && address.length > portfolioKeyword.length + 2 ) {
			var total = address.length;
			detailUrl = address.slice(portfolioKeyword.length+2,total);
		} else {
			detailUrl = -1;	
		}
		return detailUrl;
	}
	// ------------------------------
	
	
	
	// ------------------------------
	// AJAX LOADER
	function showLoader() {
		NProgress.start();
	}
	function hideLoader() {
		NProgress.done();
	}
	// ------------------------------
	
	
	
	


})(jQuery);