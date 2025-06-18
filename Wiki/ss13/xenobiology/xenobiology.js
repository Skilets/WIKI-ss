function initializeXenobiologyPage() {
    console.log("Xenobiology.js: Инициализация Xenobiology-страницы...");

    // Получаем все кнопки сворачивания и соответствующее содержимое
    const collapsibleButtons = [
        { button: '.collapsible-button', content: '.collapsible-content', textCollapsed: '0-1 уровень🔽', textExpanded: '0-1 уровень🔼' },
        { button: '.collapsible-button-1', content: '.collapsible-content-1', textCollapsed: '2 уровень🔽', textExpanded: '2 уровень🔼' },
        { button: '.collapsible-button-2', content: '.collapsible-content-2', textCollapsed: '3 уровень🔽', textExpanded: '3 уровень🔼' },
        { button: '.collapsible-button-3', content: '.collapsible-content-3', textCollapsed: '5 уровень🔽', textExpanded: '5 уровень🔼' },
        { button: '.collapsible-button-4', content: '.collapsible-content-4', textCollapsed: 'спец. уровень🔽', textExpanded: 'спец. уровень🔼' },
        { button: '.collapsible-button-5', content: '.collapsible-content-5', textCollapsed: '<span class="reproductive"></span> Репродуктивный🔽', textExpanded: '<span class="reproductive"></span> Репродуктивный🔼' },
        { button: '.collapsible-button-6', content: '.collapsible-content-6', textCollapsed: '<span class="burning"></span> Горение🔽', textExpanded: '<span class="burning"></span> Горение🔼' }
    ];

    collapsibleButtons.forEach(item => {
        const button = document.querySelector(item.button);
        const content = document.querySelector(item.content);

        if (button && content) {
            // Убеждаемся, что начальное состояние соответствует тексту кнопки
            if (content.classList.contains('collapsed')) {
                button.innerHTML = item.textCollapsed; 
            } else {
                button.innerHTML = item.textExpanded; 
            }

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
