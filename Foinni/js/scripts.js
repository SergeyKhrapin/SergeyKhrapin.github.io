// переходы по странице
$(document).ready(function(){  // жду пока загрузится документ
	$('.nav_links a, .footer_menu a').click(function(event){ //кликаю по ссылке, которая внутри nav
		var block=$(this).data('menu'); // получаю значение из data-menu
		event.preventDefault(); // отменяю стандартное действие ссылки
		if($("body").width()>1024) {
			$('html,body').animate({scrollTop:$('*[data-block='+block+']').offset().top-119},1000);
// плавно опускаю весь сайт к координатам блока, у которого data-block такой же, как я получил data-menu у кликнутой ссылки, но минус 119px (с учетом высоты фиксированного меню)
		}
		if($("body").width()<=1024 && $("body").width()>570) {
			$('html,body').animate({scrollTop:$('*[data-block='+block+']').offset().top-70},1000);
		}
		if($("body").width()<=570 && $("body").width()>400) {
			$('html,body').animate({scrollTop:$('*[data-block='+block+']').offset().top-127},1000);
		}
		if($("body").width()<=400) {
			$('html,body').animate({scrollTop:$('*[data-block='+block+']').offset().top-312},1000);
		}
	});
});


// выпадающее меню
$(function(){
	$("#menu_button").click(function(e){ 
		e.preventDefault();
		$(".nav_links").slideToggle();
	}) 
})