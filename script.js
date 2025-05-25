const profileModal = document.getElementById('profile');
const authorizationModal = document.getElementById('modal');
const registrationModal = document.getElementById('registration');
const btn = document.getElementById('open-modal');

function isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
};

//Проверка авторизации при нажатии кнопки "Профиль"
btn.onclick = () => {
    if (isAuthenticated()) {
        profileModal.style.display = 'flex';
        document.body.classList.add('close-overflow');
        const currentUser = getCurrentUser();
        const name_user = document.getElementById('name-user');
        name_user.textContent = currentUser.name;
    } else {
        authorizationModal.style.display = 'flex';
        document.body.classList.add('close-overflow');
    }
};
//Кнопка "Назад" в профиле
const btn_profile_back = document.getElementById('btn-profile-back');
btn_profile_back.onclick = () => {
    document.getElementById('profile').style.display = 'none';
    document.body.classList.remove('close-overflow');
}

//Кнопка "Назад" в форме входа
const btn_login_back = document.getElementById('btn-login-back');
btn_login_back.onclick = () => {
    document.body.classList.remove('close-overflow');
    authorizationModal.style.display = 'none';
    const inputs = authorizationModal.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
};

//Кнопка для перехода к форме регистрации
const btn_registration_modal = document.getElementById('btn-registration-modal');
btn_registration_modal.onclick = () => {
    authorizationModal.style.display = 'none';
    registrationModal.style.display = 'flex';
};

//Кнопка "Назад" в форме регистрации
const btn_registration_back = document.getElementById('btn-registration-back');
btn_registration_back.onclick = () => {
    registrationModal.style.display = 'none';
    authorizationModal.style.display = 'flex';
    const inputs = registrationModal.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
};

//Открытие формы для добавления задачи
const btn_add_task = document.getElementById('btn-add-task');
const add_task_window = document.getElementById('add-task-window');
btn_add_task.onclick = () => {
    add_task_window.style.display = 'flex';
    document.body.classList.add('close-overflow')
};

//Кнопка "Назад" в форме добавления задачи
const btn_task_add_back = document.getElementById('btn-task-add-back');
btn_task_add_back.onclick = () => {
    document.body.classList.remove('close-overflow');
    add_task_window.style.display = 'none';
    const inputs = add_task_window.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
};

//Открытие формы добавления заметки
const btn_add_note = document.getElementById('btn-add-note');
const add_note_window = document.getElementById('add-note-window');
btn_add_note.onclick = () => {
    add_note_window.style.display = 'flex';
    document.body.classList.add('close-overflow')
};

//Кнопка "Назад" в форме добавления заметки
const btn_note_add_back = document.getElementById('btn-note-add-back');
btn_note_add_back.onclick = () => {
    document.body.classList.remove('close-overflow');
    add_note_window.style.display = 'none';
};

//Регистрация========================
const btn_registration = document.getElementById('btn-registration');
btn_registration.onclick = () => {
    const registration = document.getElementById('registration');
    const registration_name = document.getElementById('registration-name').value;
    const registration_login = document.getElementById('registration-login').value;
    const registration_password = document.getElementById('registration-password').value;
    if (storage.registerUser(registration_name, registration_login, registration_password)) {
        registration.style.display = 'none';
        document.body.classList.remove('close-overflow');
    }
}

//Вход =====================================
const btn_log_in = document.getElementById('btn-log-in');
btn_log_in.onclick = () => {
    const login_login = document.getElementById('login-login').value;
    const login_password = document.getElementById('login-password').value;
    if (storage.loginUser(login_login, login_password)) {


        document.body.classList.remove('close-overflow');
        authorizationModal.style.display = 'none';
        const inputs = authorizationModal.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
    }
};

//Выход из аккаунта================
document.getElementById('btn-log-out').onclick = () => {
    storage.logoutUser();
    document.getElementById('profile').style.display = 'none';
    document.body.classList.remove('close-overflow');
};

//===========  Добавление новой задачи   =======================================================================
const add_new_task = document.getElementById('add-new-task');
add_new_task.onclick = (event) => {
    event.preventDefault();

    // Получаем значения из формы
    const title_task = document.getElementById('title-task').value;
    const description_task = document.getElementById('description-task').value;
    const date_task = document.getElementById('date-task').value;

    if (!title_task) {
        alert('Поле "Заголовок" не может быть пустым.');
        return;
    }
    if (!date_task) {
        alert('Поле "Дата" не может быть пустым.');
        return;
    }

    // Создаём DOM-элемент задачи
    const new_task = document.createElement('div');
    new_task.classList.add('task-class');
    new_task.style.cursor = 'pointer'; // Меняем курсор

    // Заголовок задачи
    const title = document.createElement('div');
    title.classList.add('task-title');
    title.textContent = title_task;

    // Описание задачи (пока не отображаем)
    const description = document.createElement('div');
    description.textContent = description_task;

    // Дата задачи
    const date = document.createElement('div');
    date.classList.add('task-date');
    date.textContent = date_task;

    new_task.appendChild(title);
    new_task.appendChild(date);

    new_task.dataset.description = description_task;

    // Определяем, куда добавить задачу (по дате)
    const dateTask = new Date(date_task);
    dateTask.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let task_element; // Куда будем добавлять задачу
    if (dateTask < today) {
        task_element = document.getElementById('overdue-tasks');
    } else if (dateTask.getTime() === today.getTime()) {
        task_element = document.getElementById('today-tasks');
    } else {
        task_element = document.getElementById('future-tasks');
    }
    task_element.appendChild(new_task);

    //============= Обработчик клика для просмотра подробностей ================================================
    new_task.addEventListener('click', () => {
        const task_details = document.getElementById('task-details');
        task_details.style.display = 'flex';
        document.body.classList.add('close-overflow');

        // Заполняем поля модального окна
        document.getElementById('title-task-details').value = new_task.querySelector('.task-title').textContent;
        document.getElementById('description-task-details').value = new_task.dataset.description || '';
        document.getElementById('date-task-details').value = new_task.querySelector('.task-date').textContent;
        // Сохраняем ссылку на задачу в модальном окне
        task_details.currentTask = new_task;
        task_details.currentTitle = title;
        task_details.currentDescription = description;
        task_details.currentDate = date;

        const completedCheckbox = document.getElementById('task-completed-checkbox');
        completedCheckbox.checked = new_task.dataset.completed === 'true';
    });


    // Очищаем поля формы
    const inputs = add_task_window.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
};

//=============== Кнопка "Сохранить" в окне подробностей задачи ===================================
const btn_task_save_details = document.getElementById('btn-task-save-details');
btn_task_save_details.onclick = () => {
    const task_details = document.getElementById('task-details');

    const newTitle = document.getElementById('title-task-details').value;
    const newDescription = document.getElementById('description-task-details').value;
    const newDate = document.getElementById('date-task-details').value;
    const completedCheckbox = document.getElementById('task-completed-checkbox');
    const isCompleted = completedCheckbox.checked;

    if (!newTitle) {
        alert('Поле "Заголовок" не может быть пустым.');
        return;
    }
    if (!newDate) {
        alert('Поле "Дата" не может быть пустым.');
        return;
    }

    if (task_details.currentTask) {
        task_details.currentTask.querySelector('.task-title').textContent = newTitle;
        task_details.currentTask.querySelector('.task-date').textContent = newDate;
        task_details.currentTask.dataset.description = newDescription;
        task_details.currentTask.dataset.completed = isCompleted ? 'true' : 'false';

        task_details.currentTitle.textContent = newTitle;
        task_details.currentDescription.textContent = newDescription;
        task_details.currentDate.textContent = newDate;

        const dateTask = new Date(newDate);
        dateTask.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let newTaskElement;
        if (isCompleted) {
            newTaskElement = document.getElementById('complete-tasks');
        } else {
            if (dateTask < today) {
                newTaskElement = document.getElementById('overdue-tasks');
            } else if (dateTask.getTime() === today.getTime()) {
                newTaskElement = document.getElementById('today-tasks');
            } else {
                newTaskElement = document.getElementById('future-tasks');
            }
        }

        if (newTaskElement !== task_details.currentTask.parentNode) {
            task_details.currentTask.parentNode.removeChild(task_details.currentTask);
            newTaskElement.appendChild(task_details.currentTask);
        }
    }

    task_details.style.display = 'none';
    document.body.classList.remove('close-overflow');
};


// --- Кнопка "Удалить" в окне подробностей задачи ---
const btn_task_delete_details = document.getElementById('btn-task-delete-details');
btn_task_delete_details.onclick = () => {
    const task_details = document.getElementById('task-details');

    if (task_details.currentTask) {
        // Удаляем задачу
        task_details.currentTask.remove();

        // Закрываем окно
        task_details.style.display = 'none';
        document.body.classList.remove('close-overflow');

        // Очищаем ссылку
        task_details.currentTask = null;
    }
};

// --- Кнопка "Назад" в окне подробностей задачи ---
const btn_task_back_details = document.getElementById('btn-task-back-details');
btn_task_back_details.onclick = () => {
    const task_details = document.getElementById('task-details');
    task_details.style.display = 'none';
    document.body.classList.remove('close-overflow');
};

//========== Добавление заметки =====================
const btn_add_new_note = document.getElementById('btn-add-new-note');
btn_add_new_note.onclick = (event) => {
    event.preventDefault();

    const title_note = document.getElementById('title-note').value;
    const description_note = document.getElementById('description-note').value;


    const new_note = document.createElement('div');
    new_note.classList.add('task-class');
    new_note.style.cursor = 'pointer';

    const note_title_block = document.createElement('div');
    note_title_block.classList.add('task-title');
    note_title_block.textContent = title_note;

    if (!title_note) {
        note_title_block.textContent = 'Без заголовка';
    }

    const note_date_block = document.createElement('div');
    note_date_block.classList.add('task-date');
    const a = new Date();
    a.setHours(0, 0, 0, 0);
    const Month = String(a.getMonth() + 1).padStart(2, '0');
    const Day = String(a.getDate()).padStart(2, '0');
    note_date_block.textContent = `Создано: ${a.getFullYear()}-${Month}-${Day}`;

    new_note.appendChild(note_title_block);
    new_note.appendChild(note_date_block);
    new_note.dataset.description = description_note;

    document.getElementById('block-with-notes').appendChild(new_note);

    //=============== Обработка клика на заметку ==================
    new_note.addEventListener('click', () => {
        const note_details = document.getElementById('note-details');
        note_details.style.display = 'flex';
        document.body.classList.add('close-overflow');

        document.getElementById('title-note-details').value = new_note.querySelector('.task-title').textContent;
        document.getElementById('description-note-details').value = new_note.dataset.description;

        note_details.currentNote = new_note;
        note_details.currentTitleNote = note_title_block;
    });

    const inputs = add_note_window.querySelectorAll('input');
    inputs.forEach(input => input.value = '');

    add_note_window.style.display = 'none';
    document.body.classList.remove('close-overflow');
};

// ================ Кнопка "Назад" в окне подробностей заметки =====================
const btn_note_back_details = document.getElementById('btn-note-back-details');
btn_note_back_details.onclick = () => {
    const note_details = document.getElementById('note-details');
    note_details.style.display = 'none';
    document.body.classList.remove('close-overflow');
};

//=============== Кнопка "Удалить" в окне подробностей заметки ===============================
const btn_note_delete_details = document.getElementById('btn-note-delete-details');
btn_note_delete_details.onclick = () => {
    const note_details = document.getElementById('note-details');

    if (note_details.currentNote) {
        note_details.currentNote.remove();

        note_details.style.display = 'none';
        document.body.classList.remove('close-overflow');

        note_details.currentNote = null;
    }
};

//======================= Кнопка "Сохранить" в окне подробностей заметки =================
const btn_note_save_details = document.getElementById('btn-note-save-details');
btn_note_save_details.onclick = () => {
    const note_details = document.getElementById('note-details');

    const newTitle = document.getElementById('title-note-details').value;
    const newDescription = document.getElementById('description-note-details').value;

    const currentTitleNote = note_details.currentNote.querySelector('.task-title').textContent.trim();
    const currentDescription = note_details.currentNote.dataset.description ? note_details.currentNote.dataset.description.trim() : '';

    if (newTitle === currentTitleNote && newDescription === currentDescription) {
        alert('Изменений нет.');
        return;
    }

    if (note_details.currentNote) {
        note_details.currentNote.querySelector('.task-title').textContent = newTitle;
        note_details.currentNote.dataset.description = newDescription;

        const now = new Date();

        const full_new_date = `Изменено: ${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        note_details.currentNote.querySelector('.task-date').textContent = full_new_date;

        note_details.style.display = 'none';
        document.body.classList.remove('close-overflow');
    }
};

//=======================КАЛЕНДАРЬ========================

document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.getElementById('simple-calendar');
    const calendarTasksBlock = document.getElementById('calendar-tasks-block');

    const calendarModal = document.getElementById('calendar-task-modal');
    const calendarModalTitle = document.getElementById('calendar-modal-title');
    const calendarModalDate = document.getElementById('calendar-modal-date');
    const calendarModalDescription = document.getElementById('calendar-modal-description');
    const calendarBtnClose = document.getElementById('calendar-btn-modal-close');

    let selectedCell = null;
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    // Рисуем календарь
    function renderCalendar(month, year) {
        calendarContainer.innerHTML = '';

        const header = document.createElement('div');
        header.className = 'simple-calendar-header';
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '<';
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '>';
        const monthNames = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
        const title = document.createElement('span');
        title.textContent = monthNames[month] + ' ' + year;
        header.appendChild(prevBtn);
        header.appendChild(title);
        header.appendChild(nextBtn);
        calendarContainer.appendChild(header);

        prevBtn.onclick = () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentMonth, currentYear);
        };
        nextBtn.onclick = () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar(currentMonth, currentYear);
        };

        const table = document.createElement('table');
        table.className = 'simple-calendar-table';
        const daysRow = document.createElement('tr');
        ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].forEach(d => {
            const th = document.createElement('th');
            th.textContent = d;
            daysRow.appendChild(th);
        });
        table.appendChild(daysRow);

        const firstDay = new Date(year, month, 1);
        let startDay = firstDay.getDay() - 1;
        if (startDay < 0) startDay = 6;
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let tr = document.createElement('tr');
        for (let i = 0; i < startDay; i++) {
            tr.appendChild(document.createElement('td'));
        }
        for (let day = 1; day <= daysInMonth; day++) {
            if (tr.children.length === 7) {
                table.appendChild(tr);
                tr = document.createElement('tr');
            }
            const td = document.createElement('td');
            td.textContent = day;
            td.tabIndex = 0;

            if (
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {
                td.style.border = '2px solid #F2CDAC';
            }

            td.onclick = () => {
                if (selectedCell) selectedCell.classList.remove('simple-calendar-selected');
                td.classList.add('simple-calendar-selected');
                selectedCell = td;
                const selDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                showTasksForDate(selDate);
            };
            tr.appendChild(td);
        }
        while (tr.children.length < 7) {
            tr.appendChild(document.createElement('td'));
        }
        table.appendChild(tr);
        calendarContainer.appendChild(table);
    }

    // Отобразить задачи выбранной даты
    function showTasksForDate(selectedDate) {
        calendarTasksBlock.innerHTML = '';

        const taskBlocks = ['future-tasks', 'today-tasks', 'overdue-tasks', 'complete-tasks'];
        let found = false;

        taskBlocks.forEach(blockId => {
            const block = document.getElementById(blockId);
            if (!block) return;
            const tasks = block.querySelectorAll('.task-class');

            tasks.forEach(task => {
                const dateElem = task.querySelector('.task-date');
                if (!dateElem) return;
                const taskDate = dateElem.textContent.trim().slice(0, 10);

                if (taskDate === selectedDate) {
                    found = true;

                    const clonedTask = task.cloneNode(true);

                    clonedTask.style.cursor = 'pointer';

                    clonedTask.addEventListener('click', () => {
                        calendarModalTitle.textContent = clonedTask.querySelector('.task-title').textContent;
                        calendarModalDate.textContent = taskDate;
                        calendarModalDescription.textContent = clonedTask.dataset.description || '';
                        calendarModal.style.display = 'flex';
                        document.body.classList.add('close-overflow');
                    });

                    calendarTasksBlock.appendChild(clonedTask);
                }
            });
        });

        if (!found) {
            calendarTasksBlock.innerHTML = '<div style="color:white;">Задачи на эту дату отсутствуют.</div>';
        }
    }

    calendarBtnClose.addEventListener('click', () => {
        calendarModal.style.display = 'none';
        document.body.classList.remove('close-overflow');
    });

    renderCalendar(currentMonth, currentYear);
});

//============== Работа с Backend ==========================
