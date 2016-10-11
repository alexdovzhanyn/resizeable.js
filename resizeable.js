function resizeGridItems() {
	var resizeableContainerWidth = $('.resizeable-container').width();

	$('.resizeable-item').each(function(index, element){
		if( $( window ).width() > 480 ){
			if ( parseInt( $( element ).attr("data-postnum") ) > 1) {
				$( element ).find('.post-thumbnail').css({'height': (resizeableContainerWidth / 3) * 0.6 + "px"});
			} else {
				$( element ).find('.post-thumbnail').css({'height': (resizeableContainerWidth / 3 - 0.1) * 0.85 + "px"});
			}
		} else {
			$( element ).find('.post-thumbnail').css({'height': resizeableContainerWidth * 0.6 + "px"});
		}
	});

	$('.resizeable-item.col-1').each(function(){
		if( $( window ).width() > 480 ){
			$( this ).css({'width': resizeableContainerWidth / 3 - 0.1 + "px"});
		} else {
			$( this ).css({'width': resizeableContainerWidth + "px"});
		}
	});

	$('.resizeable-item.col-2').each(function(){
		if( $( window ).width() > 480 ){
			$( this ).css({'width': 2 * (resizeableContainerWidth / 3) - 0.2 + "px", 'padding': '0px'});
			$( this ).removeClass('row');
		} else {
			$( this ).css({'width': resizeableContainerWidth + "px", 'padding': '30px'});
			// $( this ).find('.post-thumbnail').css({'height': $( this ).width() * 0.85 + "px"});
		}
	});

	if( $( window ).width() > 480 ){
		$('.post.grid-item').each(function(){
			$( this ).css({'borderLeft': resizeableContainerWidth * 0.015 + "px solid transparent", 'borderRight': resizeableContainerWidth * 0.015 + "px solid transparent"});
		});
	}
}

$(document).ready(function(){
	resizeGridItems();
});

$(window).resize(function(){
	resizeGridItems();
});

