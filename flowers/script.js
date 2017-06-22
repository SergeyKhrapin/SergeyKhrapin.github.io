var camomile = document.querySelector('.camomile'),
	red_flower = document.querySelector('.red_flower'),
	purple_flower = document.querySelector('.purple_flower');

camomile.addEventListener('click', function() {
	createElement('camomile.png');
	event.stopPropagation();
})

red_flower.addEventListener('click', function() {
	createElement('red_flower.png');
	event.stopPropagation();
})

purple_flower.addEventListener('click', function() {
	createElement('purple_flower.png');
	event.stopPropagation();
})

function createElement(path) {
	document.onclick = function() { // addEventListener здесь будет работать некорректно!
		var div = document.createElement('div');
		div.style.backgroundImage = `url(images/${path})`;
		x = event.clientX - 55;
		y = event.clientY - 55;
		div.style.left = `${x}px`;
		div.style.top = `${y}px`;
		document.body.append(div);
	}
}