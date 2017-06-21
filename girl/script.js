var photo = document.querySelector('.photo'),
	cap = document.querySelector('.cap'),
	mask = document.querySelector('.mask');
photo.addEventListener('click', function(e) {
	var x = e.clientX - 36,
		y = e.clientY - 80;

		console.log(x, y);

	cap.style.left = `${x}px`;
	cap.style.top = `${y}px`;

	if ( (x > 90 && x < 120) && (y > -8 && y < 14) ) {
		mask.classList.add('mask_hide');
		photo.classList.add('photo_color');
	}
})