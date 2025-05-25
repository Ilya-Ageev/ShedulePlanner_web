// ---- Работа с пользователями ----

function getUsers() {
    const usersJSON = localStorage.getItem('users');
    return usersJSON ? JSON.parse(usersJSON) : [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function registerUser(name, username, password) {
    const users = getUsers();

    if (!username || !password) {
        alert('Введите логин и пароль');
        return false;
    }

    // Проверка на существующего пользователя
    if (users.some(u => u.username === username)) {
        alert('Пользователь с таким логином уже существует');
        return false;
    }

    // Добавление нового пользователя
    users.push({ name, username, password });
    saveUsers(users);

    // Создаем хранилища для задач и заметок нового пользователя
    localStorage.setItem(`tasks_${username}`, JSON.stringify([]));
    localStorage.setItem(`notes_${username}`, JSON.stringify([]));

    return true;
}

function loginUser(username, password) {
    if (!username || !password) {
        alert('Введите логин и пароль');
        return false;
    }
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        alert('Неверный логин или пароль');
        return false;
    }

    // Сохраняем текущего пользователя
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
    return true;
}

function logoutUser() {
    localStorage.removeItem('currentUser');
    localStorage.setItem('isAuthenticated', 'false');
}

function getCurrentUser() {
    const userJSON = localStorage.getItem('currentUser');
    return userJSON ? JSON.parse(userJSON) : null;
}

// ---- Работа с задачами ----

function getTasks(username) {
    const tasksJSON = localStorage.getItem(`tasks_${username}`);
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

function saveTasks(username, tasks) {
    localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
}

function addTask(username, task) {
    const tasks = getTasks(username);
    task.id = Date.now().toString(); // Уникальный ID
    task.createdAt = new Date().toISOString();
    task.completed = false; // По умолчанию задача не выполнена
    tasks.push(task);
    saveTasks(username, tasks);
    return task;
}

function updateTask(username, taskId, updates) {
    const tasks = getTasks(username);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) return false;

    // Обновляем только переданные поля
    tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
    saveTasks(username, tasks);
    return true;
}

function deleteTask(username, taskId) {
    const tasks = getTasks(username);
    const filteredTasks = tasks.filter(t => t.id !== taskId);
    saveTasks(username, filteredTasks);
}

function toggleTaskComplete(username, taskId) {
    const tasks = getTasks(username);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) return false;

    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasks(username, tasks);
    return true;
}

// ---- Работа с заметками ----

function getNotes(username) {
    const notesJSON = localStorage.getItem(`notes_${username}`);
    return notesJSON ? JSON.parse(notesJSON) : [];
}

function saveNotes(username, notes) {
    localStorage.setItem(`notes_${username}`, JSON.stringify(notes));
}

function addNote(username, note) {
    const notes = getNotes(username);
    note.id = Date.now().toString(); // Уникальный ID
    note.createdAt = new Date().toISOString();
    notes.push(note);
    saveNotes(username, notes);
    return note;
}

function updateNote(username, noteId, updates) {
    const notes = getNotes(username);
    const noteIndex = notes.findIndex(n => n.id === noteId);

    if (noteIndex === -1) return false;

    // Обновляем только переданные поля
    notes[noteIndex] = { ...notes[noteIndex], ...updates };
    saveNotes(username, notes);
    return true;
}

function deleteNote(username, noteId) {
    const notes = getNotes(username);
    const filteredNotes = notes.filter(n => n.id !== noteId);
    saveNotes(username, filteredNotes);
}

// ---- Инициализация приложения ----

function initializeApp() {
    // Проверяем, авторизован ли пользователь
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const currentUser = getCurrentUser();

    if (isAuthenticated && currentUser) {
        // Загружаем задачи и заметки для текущего пользователя
        const tasks = getTasks(currentUser.username);
        const notes = getNotes(currentUser.username);

        // Можно добавить логику для отображения данных в интерфейсе
        console.log(`Добро пожаловать, ${currentUser.name}!`);
        console.log('Ваши задачи:', tasks);
        console.log('Ваши заметки:', notes);
    } else {
        console.log('Пожалуйста, войдите или зарегистрируйтесь');
    }
}

// Инициализируем приложение при загрузке
initializeApp();

// Экспортируем функции для использования в других файлах
window.storage = {
    getUsers,
    saveUsers,
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,

    getTasks,
    saveTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,

    getNotes,
    saveNotes,
    addNote,
    updateNote,
    deleteNote,

    initializeApp
};