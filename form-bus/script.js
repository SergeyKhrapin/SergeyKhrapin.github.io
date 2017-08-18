// растягиваю body на всю высоту экрана
$('body').css('minHeight', window.innerHeight + 'px');

// расширение/сужение (при фокусе/расфокусе) поля для ввода имени водителя
$('#driver, #email').on({
    focus: function() {
        $(this).css('width', '230px');
    },
    blur: function() {
        $(this).css('width', '130px');
    }
})

// функция удаления элемента
function deleteItem(selector) {
    $('.delete').on('click', function (e) {
        $(this).parent().fadeOut(400, function() {
            $(this).remove();
            e.stopImmediatePropagation();

            // смена нумерации станций/пассажиров
            $(`${selector} label span`).each(function(index) {
                $(this).text(++index);
            })

            if (selector == '.station') {
                // смена нумерации атрибутов name
                $(`${selector} input`).each(function(index) {
                    $(this).attr('name', `bus[route][${++index}]`);
                })

                stationNumber = $('.station').length;
                rerenderOptions();  // перерисовываю option при удалении только станций (при удалении пассажиров в этом нет необходимости)
            }
            else if (selector == '.passenger') {
                // смена нумерации атрибутов name
                $(`${selector}`).each(function(index) {
                    $(this).find('input').attr('name', `bus[passengers][${index + 1}][name]`);
                    $(this).find('.from').attr('name', `bus[passengers][${index + 1}][station-from]`);
                    $(this).find('.to').attr('name', `bus[passengers][${index + 1}][station-to]`);
                })
                passengerNumber = $('.passenger').length;
            }
        });
    })
}

var stationNumber = 0;
$('#station').on('click', function() {
    // добавление станции
    $('.stations').append(`
        <div class="station">
            <label>Station <span>${++stationNumber}</span></label>
            <input class="input_station" name='bus[route][${stationNumber}]'>
            <i class="delete fa fa-trash-o" aria-hidden="true"></i>
        </div>
    `)


    $('.input_station').on('change', function(e) {
        e.stopImmediatePropagation();

        // проверяю вводимое название станции на уникальность - start
        var inputsNotThis = $('.input_station').not($(this)),
            isUnique = true;
        for (var i = 0; i < inputsNotThis.length; i++) {
            if ($.trim($(this)[0].value.toUpperCase()) === $.trim(inputsNotThis[i].value.toUpperCase()) && $.trim($(this)[0].value) != '') {
                isUnique = false;
                break;
            }
        }
        if (isUnique) {
            $(this).attr('placeholder', '');
        }
        else {
            $(this).attr('placeholder', '"' + $(this)[0].value + '" already exists');
            $(this)[0].value = '';
        }
        // проверяю вводимое название станции на уникальность - end

        rerenderOptions();
    })

    // удаление станции
    deleteItem('.station');
})

// собираю значения станций со всех инпутов
var stations = '';
function getStations() {
    $('.input_station').each(function(i, element) {
        // исключаю пустые инпути и инпуты с одними пробелами
        if ($.trim(element.value)) {
            stations += `<option value="${element.value}">${element.value}</option>`;
        }
    })
}

// перерисовка option'ов в блоке Passengers
function rerenderOptions() {
    getStations();
    $('.passenger .from').html(`
        <option value="">From station</option>
        ${stations}
    `);
    $('.passenger .to').html(`
        <option value="">To station</option>
        ${stations}
    `)
    stations = '';
}

var passengerNumber = 0;
$('#passenger').on('click', function() {
    getStations();
    // добавление пассажира
    $('.passengers').append(`
        <div class="passenger">
            <label>Passenger <span>${++passengerNumber}</span></label>
            <input name='bus[passengers][${passengerNumber}][name]' placeholder="name">
            <select name="bus[passengers][${passengerNumber}][station-from]" id="" class="from">
                <option value="">From station</option>
                ${stations}
            </select>
            <select name="bus[passengers][${passengerNumber}][station-to]" id="" class="to">
                <option value="">To station</option>
                ${stations}
            </select>
            <i class="delete fa fa-trash-o" aria-hidden="true"></i>
        </div>
    `)
    stations = '';

    // удаление пассажира
    deleteItem('.passenger');
})



// ВАЛИДАЦИЯ ФОРМЫ - start
$('.form').on('submit', function(e) {
    e.preventDefault();
    var isValid = true;
    $('.form input, .form select').each(function(i, el) {
        $(this).removeClass('error');
        if (!$.trim(el.value)) {
            isValid = false;
            $(this).addClass('error');
        }
    })

    // вывожу сообщение об ошибке, если в форме менее пяти инпутов (включая submit) или какой-то из них не заполнен (в т.ч. select)
    if (!isValid || $('.form input').length < 5) {
        $('.error_wrapper').css('display', 'block');
        setTimeout(function () {
            $('.error_wrapper').fadeTo(300, 1, function() {
                $('.error_message').css('transform', 'scale(1)');
            })
        }, 50)
        setErrorPosition();
        $(window).on('resize scroll', setErrorPosition);
    }
    else {
        $('.form').off();
        $('.form').trigger('submit');
    }
})

function setErrorPosition() {
    $('.error_message').css({
        top: window.innerHeight/2 - $('.error_message')[0].clientHeight/2 + window.scrollY + 'px',
        left: window.innerWidth/2 - $('.error_message')[0].clientWidth/2 + 'px',
    });
}

$('.error_wrapper').on('click', function() {
    $('.error_message').css('transform', 'scale(0)');
    setTimeout(function () {
        $('.error_wrapper').fadeTo(300, 0, function() {
            $('.error_wrapper').css('display', 'none');
        })
    }, 300)
})

$('.error_message').on('click', function(e) {
    e.stopPropagation();
})
// ВАЛИДАЦИЯ ФОРМЫ - end