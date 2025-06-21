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
        { button: '.collapsible-button-6', content: '.collapsible-content-6', textCollapsed: '<span class="burning"></span> Горение🔽', textExpanded: '<span class="burning"></span> Горение🔼' },
        { button: '.collapsible-button-7', content: '.collapsible-content-7', textCollapsed: '<span class="regenerative"></span> Регенеративный🔽', textExpanded: '<span class="regenerative"></span> Регенеративный🔼' },
        { button: '.collapsible-button-8', content: '.collapsible-content-8', textCollapsed: '<span class="stabilized"></span>Стабилизированный🔽', textExpanded: '<span class="stabilized"></span>Стабилизированный🔼' },
        { button: '.collapsible-button-9', content: '.collapsible-content-9', textCollapsed: '<span class="industrial"></span>Промышленный🔽', textExpanded: '<span class="industrial"></span>Промышленный🔼' },
        { button: '.collapsible-button-10', content: '.collapsible-content-10', textCollapsed: '<span class="charged"></span>Заряженный🔽', textExpanded: '<span class="charged"></span>Заряженный🔼' },
        { button: '.collapsible-button-11', content: '.collapsible-content-11', textCollapsed: '<span class="selfsustaining"></span>Самоподдерживающий🔽', textExpanded: '<span class="selfsustaining"></span>Самоподдерживающий🔼' },
        { button: '.collapsible-button-12', content: '.collapsible-content-12', textCollapsed: '<span class="сhilling"></span>Отдыхающий🔽', textExpanded: '<span class="сhilling"></span>Отдыхающий🔼' },
        { button: '.collapsible-button-13', content: '.collapsible-content-13', textCollapsed: '<span class="consuming"></span>Потребляющий🔽', textExpanded: '<span class="consuming"></span>Потребляющий🔼' },
        { button: '.collapsible-button-14', content: '.collapsible-content-14', textCollapsed: '<span class="recurring"></span>Повторяющий🔽', textExpanded: '<span class="recurring"></span>Повторяющий🔼' },
        { button: '.collapsible-button-15', content: '.collapsible-content-15', textCollapsed: '<span class="prismatic"></span>Призматический🔽', textExpanded: '<span class="prismatic"></span>Призматический🔼' }
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
