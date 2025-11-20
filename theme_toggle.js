document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Проверяем, что кнопка найдена
    if (!themeToggle) {
        console.error('Кнопка переключения темы не найдена!');
        return;
    }

    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'cyan') {
        body.classList.add('theme-cyan');
        themeToggle.textContent = 'Сделать фиолетовой';
    }

    // Обработчик клика по кнопке
    themeToggle.addEventListener('click', function() {
        const isCyan = body.classList.toggle('theme-cyan');

        // Сохраняем выбор пользователя
        localStorage.setItem('theme', isCyan ? 'cyan' : 'purple');

        // Меняем текст кнопки
        this.textContent = isCyan ? 'Сделать фиолетовой' : 'Сделать DarkCyan';

        // Добавляем плавную анимацию
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);

        // Логирование для отладки
        console.log('Тема переключена на:', isCyan ? 'DarkCyan' : 'Purple');
        console.log('Классы body:', body.className);
    });
});

// Функция для применения темы на всех страницах
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'cyan') {
        document.body.classList.add('theme-cyan');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.textContent = 'Сделать фиолетовой';
        }
    }
}

// Применяем тему сразу при загрузке (до DOMContentLoaded)
initTheme();