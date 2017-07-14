/* click burger */
$(function(){ 
	$(".burger_button").click(function(e){ 
		e.preventDefault();
		$(".nav").slideToggle();
	}) 
})

/* change language */
var lang = document.querySelector('.lang');

lang.addEventListener('click', function(e) {
	for (var i = 0; i < lang.children.length; i++) {
		lang.children[i].classList.remove('lang_active');
	}

	var target = e.target;
	while (target.tagName !== "A") {
		target = target.parentElement;
	}
	target.classList.add('lang_active');
})

/* select forms */
var eventBtn = document.querySelector('.event_btn'),
	tabnameBtn = document.querySelector('.tabname_btn'),
	selectForm1 = document.querySelector('.select_form1'),
	selectForm2 = document.querySelector('.select_form2');

eventBtn.addEventListener('click', function() {
	eventBtn.style.height = '42px';
	tabnameBtn.style.height = '38px';
	selectForm1.style.opacity = '1';
	selectForm1.style.visibility = 'visible';
	selectForm2.style.display = 'none';
})

tabnameBtn.addEventListener('click', function() {
	tabnameBtn.style.height = '42px';
	eventBtn.style.height = '38px';
	selectForm2.style.display = 'block';
	selectForm1.style.opacity = '0';
	selectForm1.style.visibility = 'hidden';
})


// RERENDER MENU start
// Delete slider effect in the nav menu (on mobile)
var nav = document.querySelector('.nav'),
	sliderNav = document.querySelector('.slider_nav'),
	menu = document.querySelector('.slides');

showMenu();

$( window ).resize(function() {
	showMenu();
});

function showMenu() {
	if (window.innerWidth <= 800) {
		if (!nav.classList.contains('new')) {
			var menuNew = `<ul class='ul_new'>${menu.innerHTML}</ul>`;
			sliderNav.style.display = 'none';
			nav.insertAdjacentHTML('afterbegin', menuNew);
			nav.classList.add('new');
		}
	}
	else {
		var ulNew = document.querySelector('.ul_new');
		if (ulNew) ulNew.remove();
		sliderNav.style.display = 'block';
		nav.classList.remove('new');
	}
}
// RERENDER MENU end