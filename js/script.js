/*====================================
	header (start)
======================================*/
// переходы по странице
$(document).ready(function(){
	$('.nav a, .header_inside a, .history_text a').click(function(event){
		var block=$(this).data('menu');
		event.preventDefault();
		$('html,body').animate({scrollTop:$('*[data-block='+block+']').offset().top},1000);
	})
})

// выпадение меню при клике по 'гамбургеру''
$(function(){
	$('.fa-bars').click(function(e){ 
		// e.preventDefault();
		$('#menu').slideToggle();
	}) 
})
/*====================================
	header (end)
======================================*/


/*====================================
	about/services (start)
======================================*/

// задаю стили активному блоку web_design при загрузке страницы
$(document).ready(function(){
	$('.web_design').addClass('services_text_link_active');
	$('.web_design_img').addClass('services_img_active');
	$('.fa-desktop').addClass('services_text_i_active');
	$('#services_text_mark1').addClass('services_text_marks_active');
})

// задаю стили блоку web_design при клике на него
$(function(){
	$('.web_design').click(function(e){ 
		// e.preventDefault();
		$('.web_design').addClass('services_text_link_active');
		$('.web_design_img').addClass('services_img_active');
		$('.fa-desktop').addClass('services_text_i_active');
		$('#services_text_mark1').addClass('services_text_marks_active');

		// устанавливаю изначальные стили неактивных блоков
		$('.print_design, .photography').removeClass('services_text_link_active');
		$('.print_design_img, .photography_img').removeClass('services_img_active');
		$('.fa-file-text, .fa-camera-retro').removeClass('services_text_i_active');
		$('#services_text_mark2, #services_text_mark3').removeClass('services_text_marks_active');
	}) 
})

// задаю стили блоку print_design при клике на него
$(function(){
	$('.print_design').click(function(e){ 
		// e.preventDefault();
		$('.print_design').addClass('services_text_link_active');
		$('.print_design_img').addClass('services_img_active');
		$('.fa-file-text').addClass('services_text_i_active');
		$('#services_text_mark2').addClass('services_text_marks_active');

		// устанавливаю изначальные стили неактивных блоков
		$('.web_design, .photography').removeClass('services_text_link_active');
		$('.web_design_img, .photography_img').removeClass('services_img_active');
		$('.fa-desktop, .fa-camera-retro').removeClass('services_text_i_active');
		$('#services_text_mark1, #services_text_mark3').removeClass('services_text_marks_active');
	}) 
})

// задаю стили блоку photography при клике на него
$(function(){
	$('.photography').click(function(e){ 
		// e.preventDefault();
		$('.photography').addClass('services_text_link_active');
		$('.photography_img').addClass('services_img_active');
		$('.fa-camera-retro').addClass('services_text_i_active');
		$('#services_text_mark3').addClass('services_text_marks_active');

		// устанавливаю изначальные стили неактивных блоков
		$('.web_design, .print_design').removeClass('services_text_link_active');
		$('.web_design_img, .print_design_img').removeClass('services_img_active');
		$('.fa-desktop, .fa-file-text').removeClass('services_text_i_active');
		$('#services_text_mark1, #services_text_mark2').removeClass('services_text_marks_active');
	}) 
})
/*====================================
	about/services (end)
======================================*/


/*====================================
	study (start)
======================================*/
// задаю стили блоку study_flip при нажатии на кнопку read_more (при переворачивании)
$(function(){
	$('#read_more').click(function(e){ 
		$('.study_flip').addClass('study_flip_rotate');
	}) 
})

// отменяю стили блока study_flip при нажатии на кнопку back (переворачиваю обратно)
$(function(){
	$('#back').click(function(e){ 
		$('.study_flip').removeClass('study_flip_rotate');
	}) 
})
/*====================================
	study (end)
======================================*/


/*====================================
	blog (start)
======================================*/
/*
блоки blog_text расположены в шахматном порядке, поэтому имеют разные стили
поэтому при клике по ссылкам read_more/back эти блоки также получают разные классы:
 - блоки blog_text в 1-ом и 2-ом blog_item - получают класс blog_text_move_1_2
 - блоки blog_text в 3-ом и 4-ом blog_item - получают класс blog_text_move_3_4
*/

// клик по ссылкам read_more/back в первом blog_item
$(function(){
	$('#read_more_1').click(function(e){
		e.preventDefault();
		$('.blog_text_1').addClass('blog_text_move_1_2');
		$('#read_more_1').css('display','none');
		$('#back_1').css('display','inline-block');
	}) 
})

$(function(){
	$('#back_1').click(function(e){
		e.preventDefault();
		$('.blog_text_1').removeClass('blog_text_move_1_2');
		$('#back_1').css('display','none');
		$('#read_more_1').css('display','inline-block');
	}) 
})
// end

// клик по ссылкам read_more/back во втором blog_item
$(function(){
	$('#read_more_2').click(function(e){
		e.preventDefault();
		$('.blog_text_2').addClass('blog_text_move_1_2');
		$('#read_more_2').css('display','none');
		$('#back_2').css('display','inline-block');
	}) 
})

$(function(){
	$('#back_2').click(function(e){
		e.preventDefault();
		$('.blog_text_2').removeClass('blog_text_move_1_2');
		$('#back_2').css('display','none');
		$('#read_more_2').css('display','inline-block');
	}) 
})
// end

// клик по ссылкам read_more/back в третьем blog_item
$(function(){
	$('#read_more_3').click(function(e){
		e.preventDefault();
		$('.blog_text_3').addClass('blog_text_move_3_4');
		$('#read_more_3').css('display','none');
		$('#back_3').css('display','inline-block');
	}) 
})

$(function(){
	$('#back_3').click(function(e){
		e.preventDefault();
		$('.blog_text_3').removeClass('blog_text_move_3_4');
		$('#back_3').css('display','none');
		$('#read_more_3').css('display','inline-block');
	}) 
})
// end

// клик по ссылкам read_more/back в четвертом blog_item
$(function(){
	$('#read_more_4').click(function(e){
		e.preventDefault();
		$('.blog_text_4').addClass('blog_text_move_3_4');
		$('#read_more_4').css('display','none');
		$('#back_4').css('display','inline-block');
	}) 
})

$(function(){
	$('#back_4').click(function(e){
		e.preventDefault();
		$('.blog_text_4').removeClass('blog_text_move_3_4');
		$('#back_4').css('display','none');
		$('#read_more_4').css('display','inline-block');
	}) 
})
// end
/*====================================
	blog (end)
======================================*/