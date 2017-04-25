// переходы по странице

$(document).ready(function(){  // жду пока загрузится документ
	$('nav a').click(function(event){ //кликаю по ссылке, которая внутри nav
		var block=$(this).data('menu'); // получаю значение из data-menu
		event.preventDefault(); // отменяю стандартное действие ссылки
			$('html,body').animate({scrollTop:$('*[data-block='+block+']').offset().top},1000);
// плавно опускаю весь сайт к координатам блока, у которого data-block такой же, как я получил data-menu у кликнутой ссылки
	});
});