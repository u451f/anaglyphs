// Wrap an HTMLElement around each element in an HTMLElement array.
// Answers this Stack Overflow question: http://bit.ly/pure-js-wrap by: Kevin Jurkowski, 11/02/2012
HTMLElement.prototype.wrap = function(elms) {
	// Convert `elms` to an array, if necessary.
	if (!elms.length) elms = [elms];

	// Loops backwards to prevent having to clone the wrapper on the
	// first element (see `child` below).
	for (var i = elms.length - 1; i >= 0; i--) {
		var child = (i > 0) ? this.cloneNode(true) : this;
		var el    = elms[i];

		// Cache the current parent and sibling.
		var parent  = el.parentNode;
		var sibling = el.nextSibling;

		// Wrap the element (is automatically removed from its current
		// parent).
		child.appendChild(el);

		// If the element had a sibling, insert the wrapper before
		// the sibling to maintain the HTML structure; otherwise, just
		// append it to the parent.
		if (sibling) {
			parent.insertBefore(child, sibling);
		} else {
			parent.appendChild(child);
		}
	}
};

/*
 * 2015 u451f
 */
// add body class
document.body.setAttribute('class', 'anaglyph'); // for color anaglyphs
 //document.body.setAttribute('class', 'anaglyph grey'); // for grey anaglyphs

// select all images
var images = document.querySelectorAll("img:not(.stereo)");

// clone the other images.
for (index = 0; index < images.length; index++) {
	// set current class to Cyan
	images[index].setAttribute('class','cyan');

	// create a red clone
	var clone_red = images[index].cloneNode(true);
	clone_red.setAttribute('class','red');

	// wrap cyan image
	var anaglyphWrapper = document.createElement('div');
	anaglyphWrapper.className = 'anaglyph-image anaglyph-translate';
	anaglyphWrapper.id = 'anaglyph-image-' + index;
	anaglyphWrapper.wrap(images[index]);

	// append red clone
	anaglyphWrapper.appendChild(clone_red);
}
