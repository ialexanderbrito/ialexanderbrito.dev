



$(document).ready(function() { 
	
	
	// remember skins * disabled for the theme - one page layout
	//$('.skin-part, .multi-select a').each(function(index, element) {
//		
//        var linkClass = $(this).attr('data-linkClass');
//		if($.cookie("css-"+ linkClass)) {
//			if($(this).hasClass('skin-part')) {
//				$("link." + linkClass).attr("href", $.cookie("css-"+ linkClass));	
//			} else {
//				var href = $(this).attr('href');
//				$('head').append('<link class="' + linkClass + '"rel="stylesheet" type="text/css" href="' + href + '">'); 
//				$(this).addClass('active');
//			}
//		}
//		
//    });
	
	
	// change style
	$(".skin-part a").click(function() { 
		
		var href = $(this).attr('href');
		
		// multi select
		if($(this).parents('ul').hasClass('multi-select')) {
			
			var linkClass = $(this).attr('data-linkClass');
			if($('head').find('.'+linkClass).length) {
				$('head').find('.'+linkClass).remove();
				$(this).removeClass('active');
				//$.cookie("css-"+ linkClass, null);
			} else {
				$('head').append('<link class="' + linkClass + '"rel="stylesheet" type="text/css" href="' + href + '">'); 
				//$.cookie("css-"+ linkClass , href, {expires: 365, path: '/'});
				$(this).addClass('active');
			}
			
		} else { // single select
		
			$(this).parents('.skin-part').find('a').removeClass('active')
			$(this).addClass('active');
			
			var linkClass = $(this).parents('.skin-part').attr('data-linkClass');
			$("link." + linkClass).attr("href", href);
			//$.cookie("css-"+ linkClass , href, {expires: 365, path: '/'});
		
		}
		
		return false;
		
	});
	
	
	// toggle skin select	
	$("#skin-select #toggle").click(function() { 
	
		if($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('#skin-select').animate({ left:- $(this).parent('#skin-select').width() });
		} else {
			$(this).addClass('active')
			$('#skin-select').animate({ left:0 });
		}
		return false;
	});
	
	
	// show skin select for a second
	setTimeout(function(){ $("#skin-select #toggle").addClass('active').trigger('click'); },1000)
	
	
}); // end doc.ready

