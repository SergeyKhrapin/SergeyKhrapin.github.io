var formCreateTask = document.querySelector('.form_create_task'),
	completeAllBtn = document.querySelector('.complete_all_btn'),
	createTask = document.querySelector('.create_task'),
	tasksBlock = document.querySelector('.tasks_block'),
	itemsLeft = document.querySelector('.items_left'),
	itemsLeftCount = document.querySelector('.items_left span'),
	toolBar = document.querySelector('.toolbar'),
	clearCompleted = document.querySelector('.clear_completed');

// ФОРМА создания задач
formCreateTask.addEventListener('submit', function() {
	var newTask = document.createElement('form'),
		completeBtn = document.createElement('span'),
		taskText = document.createElement('input'),
		deleteBtn = document.createElement('span');

	// добавление новой задачи
	newTask.classList.add('form_new_task');
	taskText.classList.add('task_text');
	taskText.value = createTask.value;
	newTask.append(taskText);
	tasksBlock.append(newTask);

	// если включена сортировка Completed - новые задачи при добавлении не показываю на экране
	var isCompleteClick = sort_complete.classList.contains('sort_btns_click');
	if (isCompleteClick) {
		newTask.style.display = 'none';
	}

	// увеличение счетчика при добавлении новых задач
	getTasksNumber();

	// добавление кнопок о выполнении и удаления
	completeBtn.classList.add('complete_btn');
	newTask.prepend(completeBtn);
	deleteBtn.classList.add('delete_btn');
	newTask.append(deleteBtn);

	// выполнение задачи
	completeBtn.addEventListener('click', completeTask);

	// выполнение всех задач
	completeAllBtn.addEventListener('click', completeAllTasks);

	// удаление задачи
	deleteBtn.addEventListener('click', deleteTask);

	// очищаю поле ввода
	createTask.value = '';

	// показываю toolBar при отправке формы (добавлении задачи)
	toolBar.style.display = 'flex';
})

// ФУНКЦИЯ подсчета общего количества задач
// функция вызывается при добавлении новых задач, при удалении задач (при клике по deleteBtn) и при удалении выполненных задач (при клике по clearCompleted)
function getTasksNumber() {
	itemsLeftCount.textContent = tasksBlock.childElementCount;
}

// ФУНКЦИЯ проверки на наличие задач
// данная функция вызывается при клике по кнопкам deleteBtn и clearCompleted
function isAnyTasks() {
	if (tasksBlock.childElementCount == 0) {

		// скрываю toolBar
		toolBar.style.display = 'none';

		// удаляем кнопку Clear completed (чтобы она удалилась наверняка)
		clearCompleted.style.visibility = 'hidden';

		// меняем цвет кнопки (стрелочки) completeAllBtn на серый
		completeAllBtn.classList.remove('complete_all_btn_checked');
	}
}

// ФУНКЦИЯ удаления задачи
function deleteTask(element) {
	element.target.parentElement.remove();

	// проверяем показывать ли toolBar
	isAnyTasks();

	// проверяем показывать ли кнопку Clear completed
	isCompleteTask();

	// изменение счетчика при добавлении новых задач
	getTasksNumber();
}

// ФУНКЦИЯ выполнения задачи
function completeTask(element) {
	element.target.nextElementSibling.classList.toggle('completed');
	element.target.classList.toggle('complete_btn_checked');

	// проверяем показывать ли кнопку Clear completed
	isCompleteTask();

	// проверяем менять ли цвет кнопки (стрелочки) completeAllBtn, если все задачи чекнуты
	isUncompleteTask();

	// сортировка
	chooseSortFunction();
}

// ФУНКЦИЯ выполнения всех задач
function completeAllTasks(element) {
	var allTasks = document.querySelectorAll('.form_new_task'),
		isEvery = true,
		circle,
		text,
		i;

	// имитирую работу метода every() (т.к. он почему-то не работает)
	// при первом клике проверяю были ли нечекнутые таски и сразу же их чекаю (если был хотя бы один нечекнутый таск, то isEvery = false)
	for (i = 0; i < allTasks.length; i++) {
		circle = allTasks[i].firstElementChild;
		text = circle.nextElementSibling;
		if (!circle.classList.contains('complete_btn_checked') || !text.classList.contains('completed')) {
			circle.classList.add('complete_btn_checked');
			text.classList.add('completed');
			isEvery = false;
		}
	}

	// если при первом клике isEvery = false, то ничего не делаю (все таски уже чекнуты в коде выше), а при последующих кликах - меняю класс (чекнуто/нечекнуто)
	if (isEvery) {
		for (i = 0; i < allTasks.length; i++) {
			circle = allTasks[i].firstElementChild;
			text = circle.nextElementSibling;
			circle.classList.toggle('complete_btn_checked');
			text.classList.toggle('completed');
		}
	}

	// проверяем показывать ли кнопку Clear completed
	isCompleteTask();

	// проверяем менять ли цвет кнопки (стрелочки) completeAllBtn, если все задачи чекнуты
	isUncompleteTask();

	// сортировка
	chooseSortFunction();
}

// ФУНКЦИЯ проверки на наличие выполненных задач
// если имеется хотя бы одна такая задача, то появляется кнопка Clear completed
// данную функцию вызываем при клике по кнопке clearCompleted, а также completeBtn, completeAllBtn, deleteBtn
// т.е. данная функция отвечает только за ПОЯВЛЕНИЕ	кнопки Clear completed )), а сама работа этой кнопки описана ниже
function isCompleteTask() {
	var arrCompleteBtn = document.querySelectorAll('.complete_btn');
	for (var i = 0; i < arrCompleteBtn.length; i++) {
		if (arrCompleteBtn[i].classList.contains('complete_btn_checked')) {
			clearCompleted.style.visibility = 'visible';
			break;
		}
		else {
			clearCompleted.style.visibility = 'hidden';
		}	
	}
}

// КЛИК - удаление всех выполненных тасков при клике по кнопке Clear completed
clearCompleted.addEventListener('click', function(element) {
	var arrCompleteBtn = document.querySelectorAll('.complete_btn');
	for (var i = 0; i < arrCompleteBtn.length; i++) {
		if (arrCompleteBtn[i].classList.contains('complete_btn_checked')) {
			arrCompleteBtn[i].parentElement.remove();
		}
	}

	// проверяем показывать ли toolBar
	isAnyTasks();

	// проверяем показывать ли кнопку Clear completed
	isCompleteTask();

	// изменение счетчика при добавлении новых задач
	getTasksNumber();
})

// ФУНКЦИЯ проверки на наличие НЕвыполненных задач
// функция вызывается при клике по completeBtn, completeAllBtn, deleteBtn
// если все задачи выполнены (чекнуты) - меняем цвет кнопки completeAllBtn
function isUncompleteTask() {
	var arrCompleteBtn = document.querySelectorAll('.complete_btn'),
		isEveryComplete;
	for (var i = 0; i < arrCompleteBtn.length; i++) {
		if (!arrCompleteBtn[i].classList.contains('complete_btn_checked')) {
			isEveryComplete = false;
			completeAllBtn.classList.remove('complete_all_btn_checked');
			break;
		}
		else {
			isEveryComplete = true;
		}	
	}
	if (isEveryComplete) {
		completeAllBtn.classList.add('complete_all_btn_checked');
	}
}

// ФУНКЦИЯ СОРТИРОВКИ - показывать все задачи
function sortAll() {
	var arrForms = document.querySelectorAll('.form_new_task');
	for (var i = 0; i < arrForms.length; i++) {
		arrForms[i].style.display = 'flex';
	}
}

// КЛИК - сортирую при клике по sort_all
sort_all.addEventListener('click', sortAll);

// КЛИК - задаю стиль активной кнопке sort_all
sort_all.addEventListener('click', function() {
	sort_all.classList.add('sort_btns_click');
	sort_active.classList.remove('sort_btns_click');
	sort_complete.classList.remove('sort_btns_click');
});

// ФУНКЦИЯ СОРТИРОВКИ - показывать только активные задачи
function sortActive() {
	var arrCompleteBtn = document.querySelectorAll('.complete_btn');
	for (var i = 0; i < arrCompleteBtn.length; i++) {
		if (!arrCompleteBtn[i].classList.contains('complete_btn_checked')) {
			arrCompleteBtn[i].parentElement.style.display = 'flex';
		}
		else {
			arrCompleteBtn[i].parentElement.style.display = 'none';
		}
	}
}

// КЛИК - сортирую при клике по sort_active
sort_active.addEventListener('click', sortActive);

// КЛИК - задаю стиль активной кнопке sort_active
sort_active.addEventListener('click', function() {
	sort_active.classList.add('sort_btns_click');
	sort_all.classList.remove('sort_btns_click');
	sort_complete.classList.remove('sort_btns_click');
});

// ФУНКЦИЯ СОРТИРОВКИ - показывать только выполненные задачи
function sortComplete() {
	var arrCompleteBtn = document.querySelectorAll('.complete_btn');
	for (var i = 0; i < arrCompleteBtn.length; i++) {
		if (arrCompleteBtn[i].classList.contains('complete_btn_checked')) {
			arrCompleteBtn[i].parentElement.style.display = 'flex';
		}
		else {
			arrCompleteBtn[i].parentElement.style.display = 'none';
		}
	}
}

// КЛИК - сортирую при клике по sort_complete
sort_complete.addEventListener('click', sortComplete);

// КЛИК - задаю стиль активной кнопке sort_complete
sort_complete.addEventListener('click', function() {
	sort_complete.classList.add('sort_btns_click');
	sort_all.classList.remove('sort_btns_click');
	sort_active.classList.remove('sort_btns_click');
});

// ФУНКЦИЯ СОРТИРОВКИ при клике по другим кнопкам (completeBtn и completeAllBtn)
// выбираю какую делать сортировку в засисимости от того, какая кнопка сортировки кликнута
// данная функция вызывается только при чекании задачи (клик по completeBtn) и при чекании всех задач (клик по completeAllBtn)
function chooseSortFunction() {
	if (sort_complete.classList.contains('sort_btns_click')) {
		sortComplete();
	}
	else if (sort_active.classList.contains('sort_btns_click')) {
		sortActive();
	}
}