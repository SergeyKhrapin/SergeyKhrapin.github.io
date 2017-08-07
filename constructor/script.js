// растягиваю body на всю высоту экрана
$('body').css('minHeight', window.innerHeight + 'px');


const $workspace = $('.workspace');

// заполняю рабочую область html-разметкой, сохраненной в хранилище
$(document).ready(function() {
	$workspace.html(localStorage.getItem('interface'));
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
				<button class="image" title='beta version! file must be in the root!'>
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
			var input = $('.input_image'),
				path;

			path = input[0].value.slice(0, input[0].value.indexOf('fakepath')) + input[0].files[0].name;
			editableElem.css('backgroundImage', 'url(' + path + ')');

			$('.image label').text('Delete image');
			console.log(path);

			// var path = window.URL.createObjectURL($('.input_image')[0].files[0]);

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

// button SAVE (sidebar)
$('.save').on('click', function(e) {
	localStorage.setItem('interface', $workspace.html());

	$('.mask').addClass('mask_show');
	$('.popup_wrapper').css('display', 'block');
	$('.popup').css('top', window.innerHeight/2 - $('.popup')[0].offsetHeight/2);
})

// click mask
$('.mask').on('click', function(e) {
	$('.mask').removeClass('mask_show');
	$('.popup').css('top', '100%');
	setTimeout(function() {
		$('.popup_wrapper').css('display', 'none');
		$('.popup').css('top', '-100%');
	}, 400)
})

// click window
$(window).on('click', function(e) {
	$('.context_menu').remove();
	$('.confirm_delete_all').slideUp(200);
})