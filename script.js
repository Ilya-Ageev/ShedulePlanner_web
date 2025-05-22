const profileModal = document.getElementById('profile');
const authorizationModal = document.getElementById('modal');
const registrationModal = document.getElementById('registration');
const btn = document.getElementById('open-modal');

function isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
};

//Проверка авторизации при нажатии кнопки "Профиль"
btn.onclick = () => {
    document.body.classList.add('close-overflow');

    if (isAuthenticated()) {
        profileModal.style.display = 'flex';
    } else {
        authorizationModal.style.display = 'flex';
    }
};

//Кнопка "Назад" в форме входа
const btn_login_back = document.getElementById('btn-login-back');
btn_login_back.onclick = () => {
    document.body.classList.remove('close-overflow');
    authorizationModal.style.display = 'none';
    const inputs = authorizationModal.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
};

//Кнопка для перехода к форме регистрации
const btn_registration = document.getElementById('btn-registration');
btn_registration.onclick = () => {
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
    };

    const note_date_block = document.createElement('div');
    note_date_block.classList.add('task-date');
    const a = new Date();
    a.setHours(0, 0, 0, 0);
    note_date_block.textContent = 'Создано: ' + a.toISOString().split('T')[0];

    new_note.appendChild(note_title_block);
    new_note.appendChild(note_date_block);
    new_note.dataset.descriptionNote = description_note;

    document.getElementById('block-with-notes').appendChild(new_note);

    //=============== Обработка клика на заметку ==================
    new_note.addEventListener('click', () => {
        const note_details = document.getElementById('note-details');
        note_details.style.display = 'flex';
        document.body.classList.add('close-overflow');

        document.getElementById('title-note-details').value = new_note.querySelector('.task-title').textContent;
        document.getElementById('description-note-details').value = new_note.dataset.descriptionNote;

        note_details.currentNote = new_note;
        note_details.currentTitleNote = note_title_block;
    });

    const inputs = add_note_window.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
};

// ================ Кнопка "Назад" в окне подробностей заметки =====================
const btn_note_back_details = document.getElementById('btn-note-back-details');
btn_note_back_details.onclick = () => {
    const note_details = document.getElementById('note-details');
    note_details.style.display = 'none';
    document.body.classList.remove('close-overflow');
};