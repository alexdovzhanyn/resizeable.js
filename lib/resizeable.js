// Set up our options variable, make it available to the window for other functions to use
function initializeGrid(){
	try {
		window.resizeableGridOptions = JSON.parse( $('.resizeable-container').attr('data-resizeable') );
		window.resizeableContainerWidth = $('.resizeable-container').width();
	} catch(err) {
		throw (
			"Resizeable container is not defined. Try adding '.resizeable-container' to a container element."
		)
	}

	// Insert gutters between items
	insertGutters();
}

// Return an object of element info that we need to do the sizing
function getElementInfo(element) {
	var gutterWidth = getGutterWidth(resizeableContainerWidth) / 2;
	return {
		usedWidth: gutterWidth
	}
}

function getGutterWidth() {
	return resizeableContainerWidth * (resizeableGridOptions.gutter / 100);
}

function insertGutters() {
	var gutterWidth = getGutterWidth();

	// We shouldn't add gutters after the last post
	$('.resizeable-row .resizeable-item:not(:last-child)').each(function(){
		$(this).after('<div style="width: ' + gutterWidth + 'px;" class="resizeableGutter">&nbsp;</div>')
	});
}

function resizeGridItems() {
	$('.resizeable-item.col-1').each(function(){
		var currentElement = getElementInfo($(this), resizeableContainerWidth);

		$( this ).css({'width': resizeableContainerWidth / resizeableGridOptions.columns  - currentElement.usedWidth + "px"});
	});

	$('.resizeable-item.col-2').each(function(){
		var currentElement = getElementInfo( $(this) );
		
		$( this ).css({'width': 2 * (resizeableContainerWidth / resizeableGridOptions.columns - currentElement.usedWidth)  + "px", 'padding': '0px'});
	});
}

$(document).ready(function(){
	initializeGrid();
	resizeGridItems();
});

$(window).resize(function(){
	resizeGridItems();
});

