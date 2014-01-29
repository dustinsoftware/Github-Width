// ==UserScript==
// @name       Github width
// @namespace  http://git/DustinMasters/Scripts/raw/master/github-width.user.js
// @version    0.4
// @description  Makes the page width wider.
// @match      (http://git/*|https://github.com/*)
// @copyright  Dustin Masters, Chris Culy
// ==/UserScript==

function getWidth(className) {
	var width = -1;
	elements = document.getElementsByClassName(className);
	//console.log("Elements with class '" + className + "': ")
	//console.log(elements);
	//console.log("Elements.length:" + elements.length);
	//console.log("typeof(elements[0].offsetWidth): " + typeof(elements[0].offsetWidth));
	if (elements.length == 1 && typeof(elements[0].offsetWidth) != 'undefined')
		width = elements[0].offsetWidth;
		
	return width;
}

function setNiceWidths() {
	shouldAdjustPage = new RegExp('(http://git|https://github.com)/.*/').test(document.URL) && 
		(!new RegExp('(http://git|https://github.com)/(settings|organizations|.*/(network|pull|graphs|settings|issues|wiki|pulse))').test(document.URL) || 
		new RegExp('(http://git|https://github.com)/.*/pull/[0-9]+/files').test(document.URL));

	elements = document.getElementsByClassName('container');
	for (var index in elements) 
	{
		if (typeof elements[index].style != 'undefined')
			elements[index].style.width = shouldAdjustPage ? '90%' : '';
	}
	
	elements = document.getElementsByClassName('frames');
	for (var index in elements)
	{
		if (typeof elements[index].style != 'undefined')
			elements[index].style.width = shouldAdjustPage ? '100%' : '';
	}
	
	elements = document.getElementsByClassName('frame');
	for (var index in elements)
	{
		if (typeof elements[index].style != 'undefined')
			elements[index].style.width = shouldAdjustPage ? '100%' : '';
	}

	elements = document.getElementsByClassName('css-truncate');
	for (var index in elements)
	{
		if (typeof elements[index].style != 'undefined')
			elements[index].style.maxWidth = shouldAdjustPage ? '100%' : ''; 
	}
	
	var mainWidth = getWidth('repo-container');
	var sidebarWidth = getWidth('repository-sidebar');
	var padding = 24;
	var contentWidth = mainWidth - sidebarWidth - padding;
	
	console.log("Main width: " + mainWidth);
	console.log("Sidebar width: " + sidebarWidth);
	console.log("Repository content width: " + contentWidth);
	
	if (contentWidth > 0)
	{
		elements = document.getElementsByClassName('repository-content');
		for (var index in elements) 
		{
			if (typeof elements[index].style != 'undefined')
				elements[index].style.width = shouldAdjustPage ? contentWidth + 'px'  : '';
		}
	}
}
setNiceWidths();

// add a listener for when the page get modified on the fly so we can set the width again
var timeout = null;
document.addEventListener('DOMSubtreeModified', function() {
	clearTimeout(timeout);
	timeout = setTimeout(setNiceWidths, 100);
}, false);
