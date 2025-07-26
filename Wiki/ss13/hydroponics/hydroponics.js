function initializeHydroponicsPage() {
    console.log("Hydroponics.js: Инициализация Hydroponics-страницы...");

    // Получаем все кнопки сворачивания и соответствующее содержимое
    const collapsibleButtons = [
        { button: '.collapsible-button-roll', content: '.collapsible-content-roll', textCollapsed: 'Ваша область🔽', textExpanded: 'Ваша область🔼' },
        { button: '.collapsible-button-plant-growing', content: '.collapsible-content-plant-growing', textCollapsed: '<span class="icon-sextractor"></span>Растениеводство 101🔽', textExpanded: '<span class="icon-sextractor"></span>Растениеводство 101🔼' },
    ];

    collapsibleButtons.forEach(item => {
        const button = document.querySelector(item.button);
        const content = document.querySelector(item.content);

        if (button && content) {
            // При инициализации страницы, убеждаемся, что контент свернут
            content.classList.add('collapsed'); 
            button.innerHTML = item.textCollapsed; // Устанавливаем текст кнопки для закрытого состояния

            button.addEventListener('click', () => {
                content.classList.toggle('collapsed');
                if (content.classList.contains('collapsed')) {
                    button.innerHTML = item.textCollapsed; 
                } else {
                    button.innerHTML = item.textExpanded;
                }
            });
        }
    });
}