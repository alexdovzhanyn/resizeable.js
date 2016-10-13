// Set up our options variable, make it available to the window for other functions to use
function initializeGrid(){
	try {
		window.resizeableGridOptions = JSON.parse( $('.resizeable-container').attr('data-resizeable') );
		window.resizeableContainerWidth = $('.resizeable-container').width();
	} catch(err) {
		throw (
			"Resizeable container is not defined. Try adding '.resizeable-container' to a container element."
		);
	}

	// Insert gutters between items
	insertGutters();
}

// Return an object of element info that we need to do the sizing
function getElementInfo(element) {
	var gutterWidth = getGutterWidth();
	return {
		usedWidth: gutterWidth
	};
}

// Get space left in row after gutters
function getRemainingSpace(element) {
	var numberOfGutters = resizeableGridOptions.columns - 1;
	var gutterWidth = getGutterWidth();

	return resizeableContainerWidth - (numberOfGutters * gutterWidth);
}

function getGutterWidth() {
	return resizeableContainerWidth * (resizeableGridOptions.gutter / 100);
}

function insertGutters() {
	var gutterWidth = getGutterWidth();

	// We shouldn't add gutters after the last post
	$('.resizeable-row .resizeable-item:not(:last-child)').each(function(){
		$(this).after('<div style="width: ' + gutterWidth + 'px;" class="resizeableGutter">&nbsp;</div>');
	});
}

function resizeGutters(width) {
	$('.resizeableGutter').each(function(){
		$( this ).css({'width': width + 'px'});
	});
}

function updateGridItems() {
	window.resizeableContainerWidth = $('.resizeable-container').width();
	var gutterWidth = getGutterWidth();

	resizeGutters(gutterWidth);

	$('.resizeable-row').each(function(){
		var remainingSpace = getRemainingSpace(this);
		$(this).css({'marginBottom': gutterWidth});

		$(this).find('.resizeable-item.resizeable-col-' + screenSize + '-1').each(function(){
			var currentElement = getElementInfo( $(this) );
			$( this ).css({'width': remainingSpace / resizeableGridOptions.columns + "px"});
		});

		$(this).find('.resizeable-item.resizeable-col-' + screenSize + '-2').each(function(){
			var currentElement = getElementInfo( $(this) );
			$( this ).css({'width': 2 * (remainingSpace / resizeableGridOptions.columns) + gutterWidth  + "px", 'padding': '0px'});
		});
	});
}

function screenHasResized() {
	var currentWidth = $(window).width();

	if (currentWidth < 544) {
		window.screenSize = "xs";
	} 
	else if (currentWidth >= 544 && currentWidth < 768) {
		window.screenSize = "sm";
	}
	else if (currentWidth >= 768 && currentWidth < 992) {
		window.screenSize = "md";
	}
	else if (currentWidth >= 992 && currentWidth < 1200) {
		window.screenSize = "lg";
	}
	else {
		window.screenSize = "xl";
	}

	updateGridItems();
}

$(document).ready(function(){
	initializeGrid();
	screenHasResized();
});

$(window).resize(function(){
	screenHasResized();
});

