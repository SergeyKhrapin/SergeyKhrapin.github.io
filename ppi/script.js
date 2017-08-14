var resL = document.querySelector('.res_l'),
	dpr = document.querySelector('.dpr'),
	resP = document.querySelector('.res_p')
	diagonal = document.querySelector('.diagonal'),
	input = document.querySelector('.input'),
	ppi = document.querySelector('.ppi'),
	measure = document.querySelector('.measure'),
	ruler = document.querySelector('.ruler');

var width = window.screen.width,
	height = window.screen.height,
	dprValue = Math.round(window.devicePixelRatio*100)/100;

resL.textContent = width + 'x' + height;
dpr.textContent = dprValue;
resP.textContent = Math.round(width*dprValue) + 'x' + Math.round(height*dprValue);

/* пересчитываю width и height при resize */
window.addEventListener('resize', function() {
	width = window.screen.width,
	height = window.screen.height,
	dprValue = Math.round(window.devicePixelRatio*100)/100;

resL.textContent = width + 'x' + height;
dpr.textContent = dprValue;
resP.textContent = Math.round(width*dprValue) + 'x' + Math.round(height*dprValue);
})
/* пересчитываю width и height при resize */

diagonal.addEventListener('change', function() {
	if (diagonal.value.trim() && !isNaN(diagonal.value)) {
		diagonal.classList.remove('diagonal_error');
		diagonal.setAttribute('placeholder', diagonal.value);
		ppi.textContent = Math.round(Math.sqrt(Math.pow(width*dprValue, 2) + Math.pow(height*dprValue, 2)) / diagonal.value);
		diagonal.value='';
	}
	else {
		diagonal.value='';
		diagonal.classList.add('diagonal_error');
		diagonal.setAttribute('placeholder', 'only number');
	}
})

// measure.addEventListener('click', function() {
	// ruler.scrollIntoView();
	// window.scrollTo(0, ruler.offsetTop + (window.height - window.outerHeight));
	// window.scrollBy(0, ruler.offsetTop);
// })

measure.addEventListener('click', function() {
	var target = ruler.offsetTop + (window.height - window.outerHeight);
	(function scroll() {
		var diff = target - window.scrollY,
			stop;
		if (diff >= 50) {
			window.scrollBy(0, 50);
			stop = setTimeout(scroll, 20);
		}
		else if (diff < 50 && diff > 0) {
			window.scrollBy(0, diff);
			clearTimeout(stop);
		}
	})();
})