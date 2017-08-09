// растягиваю body на всю высоту экрана
$('body').css('minHeight', window.innerHeight + 'px');


const $workspace = $('.workspace');

// рабочую область и инструкцию заполняю данными, сохраненными в хранилище
$(document).ready(function() {
	if (localStorage.getItem('interface')) {
		$workspace.html(localStorage.getItem('interface'));
	}
	if(localStorage.getItem('instruction')) {
		$('.instructions').html(localStorage.getItem('instruction'));

		if ( $('div').is('.ukrainian') ) {
			$('.ukr').css('fontWeight', 'bold');
			$('.rus').css('fontWeight', 'normal');
			$('.eng').css('fontWeight', 'normal');
		}
		else if ( $('div').is('.russian') ) {
			$('.rus').css('fontWeight', 'bold');
			$('.ukr').css('fontWeight', 'normal');
			$('.eng').css('fontWeight', 'normal');
		}

		else if ( $('div').is('.english') ) {
			$('.eng').css('fontWeight', 'bold');
			$('.rus').css('fontWeight', 'normal');
			$('.ukr').css('fontWeight', 'normal');
		}
	}
})

$(document).ready(manipulation);
$('.add_element').on('click', createElement);
$('.add_element').on('click', manipulation);

var z = 1;
function createElement() {
	// создаю новые элементы и сразу прописываю им стили в js, а не в css, для того, чтобы эти значения присвоились в value инпутов в контекстном меню
	$('<div class="new_el"></div>').prependTo($workspace).css({
		backgroundColor: '#808080',
		color: '#fff',
		fontSize: '16px',
		borderRadius: '4px',
		zIndex: z++
	});

	// (без setTimeout не работает плавное появление)
	setTimeout(function() {
		$('.new_el').css('transform', 'scale(1)');
	}, 100)
}

function manipulation() {
	// делаю элемент перемещаемым
	$('.new_el').draggable({
		containment: $workspace, // запрещаю перетаскивать элементы за пределы рабочей области
		snap: true, // примагничивание элементов друг к другу
		snapTolerance: 10, // расстояние, находясь на котором начинает действовать примагничивание
		start: function() {
			$('.context_menu').remove(); // при начале перетаскивания элементов убираю контекстное меню
			$('.confirm_delete_all').slideUp(200); // при начале перетаскивания элементов прячу блок Удалить в сайдбаре
		},
	});

	// функция для редактирования содержимого элемента
	function editText(element) {
		element.attr('contenteditable', 'true').trigger('focus');
		element.on('focusout', function() {
			element.removeAttr('contenteditable');
		})
	}

	// редактирование содержимого элемента при двойном клике - способ 1
	$('.new_el').on('dblclick', function() {
		editText($(this));
	})

	// действия при клике правой кнопкой мыши
	$('.new_el').on('contextmenu', function(e) {
		e.preventDefault();
		var editableElem = $(this);
		
		// перед появлением контекстного меню удаляю предыдущее, т.е. на экране возможно только ОДНО контекстное меню
		$('.context_menu').remove();

		// прячу блок Удалить в сайдбаре (если он был открыт)
		$('.confirm_delete_all').slideUp(200);

		// контекстное меню
		$(`
			<div class="context_menu" style="z-index: 9999">
				<button class="image">
					<label for="image">
						Add image
						<span><i class="fa fa-lock" aria-hidden="true"></i>PRO</span>
					</label>
				</button>
				<input id='image' class="input_image" type="file" />
				<button class="edit">Edit content</button>
				<button class="resize">Resize</button>
				<button class="bg_color">Background color</button>
				<button class="text_color">Text color</button>
				<button class="font_size">Font size</button>
				<button class="border_radius">Border radius</button>
				<button class="z_index">Z-index</button>
				<button class="delete">Delete element</button>
				<div class='confirm_delete' style="display: none">
					<button class='del'>delete</button>
					<button class='cancel'>cancel</button>
				</div>
			</div>
		`).appendTo('body').css({
			top: e.pageY + 'px',
			left: e.pageX + 'px',
		});

		const $contextMenu = $('.context_menu');

		$contextMenu.on('click mousedown', function(e) {
			e.stopPropagation();
		})

		// добавление изображения при смене значения инпута input_image
		$('.input_image').on('change', function() {
			// var input = $('.input_image'),
			// 	path;
			// path = input[0].value.slice(0, input[0].value.indexOf('fakepath')) + input[0].files[0].name;
			// console.log(path);

			var path = window.URL.createObjectURL($('.input_image')[0].files[0]);
			editableElem.css('backgroundImage', 'url(' + path + ')');

			// path получается вида blob:http://geek.zzz.com.ua/b71d5338-d075-42ac-8a42-44b5e7b0f5a9
			// !!! каждый раз после перезагрузки path изменяется, поэтому изображение не отображается
			// Но! После перезагрузки изображение все-таки отображается, т.к. кешируется браузером))

			$contextMenu.remove();
		})

		// редактирование содержимого элемента при клике по Edit content - способ 2
		$('.edit').on('click', function() {
			$contextMenu.remove();
			editText(editableElem);
		})

		// button Resize
		$('.resize').on('click', function() {
			$contextMenu.remove();

			editableElem.resizable({
				containment: $workspace, // запрещаю растягивать элементы за пределы рабочей области
				stop: function() {
					editableElem.resizable("destroy");
				}
			});
		})

		// !!!  функции для перевода цвета из rgb в hex - start
		function componentToHex(c) {
		    var hex = c.toString(16);
		    return hex.length == 1 ? "0" + hex : hex;
		}
		function rgbToHex(rgb) {
			var arr = rgb.slice(4, -1).split(', '), // из строки типа rgb(10, 20, 30) делаю массив
				r = +arr[0],
				g = +arr[1],
				b = +arr[2];
		    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
		}
		// функции для перевода цвета из rgb в hex - end

		// button Background color
		$('.bg_color').on('click', function(e) {
			$('.bg_color').replaceWith('<input class="input_bg_color" type="color">');

			// !!!
			// в качестве значения цвета инпута (value) устанавливаю значение цвета фона элемента
			// использую функцию rgbToHex(), т.к. цвет инпута (value) задается в формате HEX, а фон элемента - в формате RGB
			$('.input_bg_color')[0].value = rgbToHex(editableElem[0].style.backgroundColor);

			$('.input_bg_color').on('change', function() {
				editableElem.css('backgroundColor', $('.input_bg_color')[0].value);
				editableElem.css('backgroundImage', '');
				$contextMenu.remove();
			})
		})

		// button Text color
		$('.text_color').on('click', function(e) {
			$('.text_color').replaceWith('<input class="input_text_color" type="color">');

			// !!! то же (см. выше)
			$('.input_text_color')[0].value = rgbToHex(editableElem[0].style.color);

			$('.input_text_color').on('change', function() {
				editableElem.css('color', $('.input_text_color')[0].value);
				$contextMenu.remove();
			})
		})

		// button Font size
		$('.font_size').on('click', function(e) {
			$('.font_size').replaceWith('<input class="input_font_size" type="number" min="8" max="40">');

			// в качестве значения инпута (value) устанавливаю значение font-size элемента
			// при этом обрезаю "px"
			var value = editableElem[0].style.fontSize;
			$('.input_font_size')[0].value = value.slice(0, value.indexOf('p'));

			$('.input_font_size').on('change', function() {
				editableElem.css('fontSize', $('.input_font_size')[0].value + 'px');
			})
		})

		// button Border radius
		$('.border_radius').on('click', function(e) {
			$('.border_radius').replaceWith('<input class="input_border_radius" type="number" min="0" max="100">');

			// в качестве значения инпута (value) устанавливаю значение border-radius элемента
			// при этом обрезаю "px"
			var value = editableElem[0].style.borderRadius;
			$('.input_border_radius')[0].value = value.slice(0, value.indexOf('p'));

			$('.input_border_radius').on('change', function() {
				editableElem.css('borderRadius', $('.input_border_radius')[0].value + 'px');
			})
		})

		// button Z-index
		$('.z_index').on('click', function() {
			$('.z_index').replaceWith('<input class="input_zindex" type="number" min="-1" max="100">');

			// в качестве значения инпута (value) устанавливаю значение z-index элемента
			$('.input_zindex')[0].value = editableElem[0].style.zIndex;

			$('.input_zindex').on('change', function() {
				editableElem.css('zIndex', $('.input_zindex')[0].value);
			})
		})

		// button Delete element
		$('.delete').on('click', function(e) {
			$('.confirm_delete').slideDown(200);

			// button delete
			$('.del').on('click', function(e) {
				$contextMenu.remove();
				editableElem.remove();
			})

			// button cancel
			$('.cancel').on('click', function(e) {
				$('.confirm_delete').slideUp(200);
			})
		})
	})
}

// button Delete all (sidebar)
$('.delete_all').on('click', function(e) {
	e.stopPropagation();
	$('.confirm_delete_all').slideDown(200);

	// button delete
	$('.del_all').on('click', function(e) {
		$workspace.empty();
	})

	// button cancel
	$('.cancel_all').on('click', function(e) {
		$('.confirm_delete_all').slideUp(200);
	})
})

// button How to use (sidebar)
$('.how').on('click', function(e) {
	$('.mask').addClass('mask_show');
	$('.popup_wrapper').css('display', 'block');
	$('.popup_how').addClass('shown').css({
		top: window.innerHeight/2 - $('.popup_how')[0].offsetHeight/2,
		left: '10%',
		right: '10%',
		opacity: 1
	});
})


// Change language - start
$('.rus').on('click', function(e) {
	$(this).css('fontWeight', 'bold');
	$('.eng').css('fontWeight', 'normal');
	$('.ukr').css('fontWeight', 'normal');

	$('.instructions').html(`
		<div class="russian" hidden></div>
		<p>Для того, чтобы начать пользоваться приложением, нажмите кнопку <b>Add element</b> в правом сайдбаре.</p>
		<p>Появившийся в рабочей области элемент можно перетягивать, а также модифицировать с помощью контекстного меню (клик правой кнопкой мыши на элементе).</p>
		<p>Доступные опции редактирования:</p>
		<ul>
			<li><b>Add image</b> - установка изображения с локального компьютера в качестве фона элемента. Доступно только в платной версии))</li>
			<li><b>Edit content</b> - редактирование текстового содержимого элемента (также возможно при двойном клике по элементу)</li>
			<li><b>Resize</b> - изменение размеров элемента путем его растягивания</li>
			<li><b>Background color</b> - установка цвета фона элемента</li>
			<li><b>Text color</b> - цвет текста</li>
			<li><b>Font size</b> - размер шрифта</li>
			<li><b>Border radius</b> - радиус скругления углов элемента</li>
			<li><b>Z-index</b> - элемент, у которого это значение больше, будет находиться поверх другого элемента</li>
			<li><b>Delete element</b> - удаление элемента</li>
		</ul>
		<p><b>Delete all</b> - очистка рабочей области</p>
		<p><b>SAVE</b> - сохранение всех изменений в локальное хранилище</p>
	`);
})

$('.eng').on('click', function(e) {
	$(this).css('fontWeight', 'bold');
	$('.rus').css('fontWeight', 'normal');
	$('.ukr').css('fontWeight', 'normal');

	$('.instructions').html(`
		<div class="english" hidden></div>
		<p>To start using the application, click the <b>Add element</b> button in the right sidebar.</p>
		<p>The element appeared in the work area can be dragged and modified using the context menu (right-clicking on the element).</p>
		<p>The available editing options are:</p>
		<ul>
			<li><b>Add image</b> - set the image from the local computer as the background of the item. Available only in paid version))</li>
			<li><b>Edit content</b> - editing the text content of the element (also possible when double clicking on an element)</li>
			<li><b>Resize</b> - resizing an element by stretching it</li>
			<li><b>Background color</b> - setting the background color of an element</li>
			<li><b>Text color</b> - setting text color</li>
			<li><b>Font size</b> - setting font size</li>
			<li><b>Border radius</b> - setting border radius</li>
			<li><b>Z-index</b> - the element whose value is greater will be on top of another element</li>
			<li><b>Delete element</b> - delete element</li>
		</ul>
		<p><b>Delete all</b> - cleaning the workspace</p>
		<p><b>SAVE</b> - saving all changes to local storage</p>
	`);
})

$('.ukr').on('click', function(e) {
	$(this).css('fontWeight', 'bold');
	$('.rus').css('fontWeight', 'normal');
	$('.eng').css('fontWeight', 'normal');

	$('.instructions').html(`
		<div class="ukrainian" hidden></div>
		<p>Для того, щоб почати користуватися додатком, натисніть кнопку <b>Add element</b> у сайдбарі праворуч.</p>
		<p>Елемент, що з'явився у робочому просторі, можна модифікувати за допомогою контекстного меню (клік правою кнопкою миші на элементі).</p>
		<p>Доступні опції редагування:</p>
		<ul>
			<li><b>Add image</b> - встановлення зображення з локального комп'ютера у якості фона елемента. Доступно тільки в платній версії))</li>
			<li><b>Edit content</b> - редагування текстового вмісту елемента (також можливе при подвійному кліку по елементу)</li>
			<li><b>Resize</b> - зміна розмірів елемента шляхом його розтягування</li>
			<li><b>Background color</b> - встановлення коліру фону елемента</li>
			<li><b>Text color</b> - колір тексту</li>
			<li><b>Font size</b> - розмір шрифту</li>
			<li><b>Border radius</b> - радіус заокруглення кутів елемента</li>
			<li><b>Z-index</b> - елемент, у якого це значення більше, буде знаходитися поверх іншого елемента</li>
			<li><b>Delete element</b> - видалення елемента</li>
		</ul>
		<p><b>Delete all</b> - очистка робочого простору</p>
		<p><b>SAVE</b> - збереження усіх змін в локальне сховище</p>
	`);
})
// Change language - end

// button SAVE (sidebar)
$('.save').on('click', function(e) {
	localStorage.setItem('interface', $workspace.html());
	localStorage.setItem('instruction', $('.instructions').html());

	$('.mask').addClass('mask_show');
	$('.popup_wrapper').css('display', 'block');

	$('.popup_save').addClass('shown').css({
		top: window.innerHeight/2 - $('.popup_save')[0].offsetHeight/2,
		left: window.innerWidth/2 - $('.popup_save')[0].offsetWidth/2,
		opacity: 1
	});
})

// click mask
$('.mask').on('click', function(e) {
	setTimeout(function() {
		$('.mask').removeClass('mask_show');
	}, 200)
	$('.shown').css('top', '100%');
	setTimeout(function() {
		$('.popup_wrapper').css('display', 'none');
		$('.shown').css({
			top: '-100%',
			opacity: 0
		});
		$('.popup').removeClass('shown');
	}, 600)
})

// click window
$(window).on('click', function(e) {
	$('.context_menu').remove();
	$('.confirm_delete_all').slideUp(200);
})