$(document).ready(function() {
	/* выпадение меню при клике по "гамбургеру" */
	$('.fa-bars').click(function() {
		$(this).toggleClass('fa-times').toggleClass('fa-bars');
		$('.nav ul').toggleClass('shown');
	});

	/* скролл по странице к блоку с формой резервирования */
	$('#booking, .fa-arrow-circle-o-down').click(function(e){
		var block = $(this).data('menu');
		e.preventDefault();
		$('html, body').animate({scrollTop:$('*[data-block='+block+']').offset().top},1000);
	});

	/* модальное окно с формой резервирования */
	$('#booking-link').click(function(e) {
		e.preventDefault();
		$('.mask').css('display', 'block');
		$('.modal').css('top', '100px');
		$('.mask').click(function(e) {
			$('.modal').css('top', '-100%');
			$(this).css('display', 'none');
		});
	})

	/* растягиваю страницу Контакты на всю высоту body */
	if ($('.contacts')[0]) {
		$('.contacts').css('min-height', window.innerHeight - $('.header')[0].clientHeight - $('.footer')[0].clientHeight - 2);
	}

	/* настройка поля для ввода даты (календарь) - http://api.jqueryui.com/datepicker */
	$( "#datepicker" ).datepicker({
		dateFormat: "dd-mm-yy",
		firstDay: 1,
		dayNames: ["Недiля", "Понедiлок", "Вiвторок", "Середа", "Четвер", "Пятниця", "Субота"],
		dayNamesMin: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
		monthNames: ["Сiчень", "Лютий", "Березень", "Квiтень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
		nextText: 'Далi',
		prevText: 'Назад',
	});

	/* настройка поля для ввода времени - http://timepicker.co */
	$('input.timepicker').timepicker({
		timeFormat: 'HH:mm'
	});

	/* настройка слайдеров */
	$(".header-main .owl-carousel").owlCarousel({
		items: 1,
		loop: true,
		navText: [
			'<i class="fa fa-chevron-left" aria-hidden="true"></i>',
			'<i class="fa fa-chevron-right" aria-hidden="true"></i>'
		],
		responsive : {
			0 : {
			    autoplay: true
			},
		    768 : {
		        nav: true,
		        autoplay: false
		    }
		}
	});

	$(".photos .owl-carousel").owlCarousel({
		margin: 30,
		loop: true,
		navText: [
			'<i class="fa fa-chevron-left" aria-hidden="true"></i>',
			'<i class="fa fa-chevron-right" aria-hidden="true"></i>'
		],
		responsive : {
		    0 : {
		        items: 1
		    },
		    560 : {
		        items: 2
		    },
		    768 : {
		        items: 3,
		        nav: true
		    }
		}
	});
});

// настройка маски на поля для ввода телефона и времени
jQuery(function($){
    $.mask.definitions['9']='[0-9]'; // (по умолчанию)
    $("#tel").mask("+380 (99) 999-99-99", {placeholder: "+380 (__) ___-__-__"});
});