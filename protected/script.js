// отменяю нажатия на клавиши F12, Ctrl-Shift-I, Ctrl-U
window.addEventListener('keydown', function(e) {
	if ( (e.keyCode == 123) || (e.ctrlKey && e.shiftKey && e.keyCode == 73) || (e.ctrlKey && e.keyCode == 85) ) {
		e.preventDefault();
	}
})


// вместо стандартного контекстного меню показываю свое
var contextMenu = document.querySelector('.context_menu')

window.addEventListener('contextmenu', function(e) {
	e.preventDefault();
	contextMenu.style.display = 'flex';
	contextMenu.style.top = `${event.pageY}px`;
	contextMenu.style.left = `${event.pageX}px`;
})

window.addEventListener('click', function(e) {
	contextMenu.style.display = 'none';
})


// растягиваю сайт на всю высоту экрана
document.body.style.minHeight = `${window.innerHeight}px`;
$(window).resize(function() {
	document.body.style.minHeight = `${window.innerHeight}px`;
});