// Set up our options variable, make it available to the window for other functions to use
function initializeGrid(){
	try {
		window.resizeableGridOptions = JSON.parse( $('.resizeable-container').attr('data-resizeable') );
	} catch(err) {
		throw (
			"Resizeable container is not defined. Try adding '.resizeable-container' to a container element."
		)
	}
}

// Return an object of element info that we need to do the sizing
function getElementInfo(element, containerWidth) {
	var gutterWidth = getGutterWidth(containerWidth) / 2;
	return {
		usedWidth: gutterWidth
	}
}

function getGutterWidth(containerWidth) {
	return containerWidth * (resizeableGridOptions.gutter / 100);
}

function insertGutters(containerWidth) {
	var gutterWidth = getGutterWidth(containerWidth);

	// We shouldn't add gutters after the last post
	$('.resizeable-row .resizeable-item:not(:last-child)').each(function(){
		$(this).after('<div style="width: ' + gutterWidth + 'px;" class="resizeableGutter">&nbsp;</div>')
	});
}

function resizeGridItems() {
	var resizeableContainerWidth = $('.resizeable-container').width();
	// Insert gutters between items
	insertGutters(resizeableContainerWidth);

	$('.resizeable-item.col-1').each(function(){
		var currentElement = getElementInfo($(this), resizeableContainerWidth);

		$( this ).css({'width': resizeableContainerWidth / resizeableGridOptions.columns  - currentElement.usedWidth + "px"});
	});

	$('.resizeable-item.col-2').each(function(){
		var currentElement = getElementInfo( $(this), resizeableContainerWidth );
		
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

