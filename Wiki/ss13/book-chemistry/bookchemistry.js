function initializeBookChemistryPage() {
    console.log("Bookchemistry.js: Инициализация Book Chemistry-страницы...");

    const collapsibleButtons = [
        { button: '.collapsible-button', content: '.collapsible-content', textCollapsed: '<span class="icon-dispenser-working"></span>Раздатчик химикатов🔽', textExpanded: '<span class="icon-dispenser-working"></span>Раздатчик химикатов🔼' },
        { button: '.collapsible-button-1', content: '.collapsible-content-1', textCollapsed: '<span class="icon-mixer"></span>Реакционная камера🔽', textExpanded: '<span class="icon-mixer"></span>Реакционная камера🔼' },
        { button: '.collapsible-button-2', content: '.collapsible-content-2', textCollapsed: '<span class="icon-chemmaster"></span>ХимМастер 3000🔽', textExpanded: '<span class="icon-chemmaster"></span>ХимМастер 3000🔼' },
        { button: '.collapsible-button-3', content: '.collapsible-content-3', textCollapsed: '<span class="icon-portable-chemical-mixer-2"></span>Переноснный химический миксер🔽', textExpanded: '<span class="icon-portable-chemical-mixer-2"></span>Переноснный химический миксер🔼' },
        { button: '.collapsible-button-4', content: '.collapsible-content-4', textCollapsed: '<span class="icon-hplc"></span>Аппарат для высокоэффективной жидкостной хроматографии (ВЭЖХ)🔽', textExpanded: '<span class="icon-hplc"></span>Аппарат для высокоэффективной жидкостной хроматографии (ВЭЖХ)🔼' },
        { button: '.collapsible-button-5', content: '.collapsible-content-5', textCollapsed: '<span class="icon-juicer"></span>Измельчитель реагентов🔽', textExpanded: '<span class="icon-juicer"></span>Измельчитель реагентов🔼' },
        { button: '.collapsible-button-6', content: '.collapsible-content-6', textCollapsed: '<span class="icon-smoke-machines"></span>Дымовая машина🔽', textExpanded: '<span class="icon-smoke-machines"></span>Дымовая машина🔼' },
        // Другие вкладки
        { button: '.collapsible-button-reagent', content: '.collapsible-content-reagent', textCollapsed: '<span class="icon-dispenser-working"></span>Реагенты🔽', textExpanded: '<span class="icon-dispenser-working"></span>Реагенты🔼' },
        { button: '.collapsible-button-сomponents', content: '.collapsible-content-сomponents', textCollapsed: 'Список формул🔽', textExpanded: 'Список формул🔼' },
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