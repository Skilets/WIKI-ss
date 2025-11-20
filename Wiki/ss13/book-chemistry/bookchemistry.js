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
        { button: '.collapsible-button-сomponents', content: '.collapsible-content-сomponents', textCollapsed: 'Список компонентов🔽', textExpanded: 'Список компонентов🔼' },
        { button: '.collapsible-button-сomponents-agents', content: '.collapsible-content-сomponents-agents', textCollapsed: 'Список компонентов агентов🔽', textExpanded: 'Список компонентов агентов🔼' },
        { button: '.collapsible-button-optional-catalysts', content: '.collapsible-content-optional-catalysts', textCollapsed: 'Доп. катализаторы для ВСЕХ лекарственных реакций🔽', textExpanded: 'Доп. катализаторы для ВСЕХ лекарственных реакций🔼' },
        { button: '.collapsible-button-core-healing-medicines', content: '.collapsible-content-core-healing-medicines', textCollapsed: 'Основные лекарственные препараты🔽', textExpanded: 'Основные лекарственные препараты🔼' },
        { button: '.collapsible-button-superior-healing-medicines', content: '.collapsible-content-superior-healing-medicines', textCollapsed: 'Высшие лекарственные препараты🔽', textExpanded: 'Высшие лекарственные препараты🔼' },
        { button: '.collapsible-button-unique-healing-medicines', content: '.collapsible-content-unique-healing-medicines', textCollapsed: 'Уникальные лекарственные препараты🔽', textExpanded: 'Уникальные лекарственные препараты🔼' },
        { button: '.collapsible-button-noncraftable-medicines', content: '.collapsible-content-noncraftable-medicines', textCollapsed: 'Некрафтабельные медикаменты🔽', textExpanded: 'Некрафтабельные медикаменты🔼' },
        { button: '.collapsible-button-narcotics', content: '.collapsible-content-narcotics', textCollapsed: 'Наркотики🔽', textExpanded: 'Наркотики🔼' },
        { button: '.collapsible-button-pyrotechnics', content: '.collapsible-content-pyrotechnics', textCollapsed: 'Пиротехника🔽', textExpanded: 'Пиротехника🔼' },
        { button: '.collapsible-button-other-reagents', content: '.collapsible-content-other-reagents', textCollapsed: 'Прочие реагенты🔽', textExpanded: 'Прочие реагенты🔼' },
        { button: '.collapsible-button-virology-recipes', content: '.collapsible-content-virology-recipes', textCollapsed: 'Вирусология🔽', textExpanded: 'Вирусология🔼' },
        { button: '.collapsible-button-mutation-toxins', content: '.collapsible-content-mutation-toxins', textCollapsed: 'Мутационные токсины🔽', textExpanded: 'Мутационные токсины🔼' },
        { button: '.collapsible-button-unique-chemicals', content: '.collapsible-content-unique-chemicals', textCollapsed: 'Уникальные химикаты🔽', textExpanded: 'Уникальные химикаты🔼' },
        { button: '.collapsible-button-lavaland-chemicals', content: '.collapsible-content-lavaland-chemicals', textCollapsed: 'Химикаты Лаваленда🔽', textExpanded: 'Химикаты Лаваленда🔼' },
        { button: '.collapsible-button-toxins', content: '.collapsible-content-toxins', textCollapsed: 'Токсины🔽', textExpanded: 'Токсины🔼' },
        { button: '.collapsible-button-impure-inverse-failed-chemicals', content: '.collapsible-content-impure-inverse-failed-chemicals', textCollapsed: 'Нечистые/инвертированные/неудачные химикаты🔽', textExpanded: 'Нечистые/инвертированные/неудачные химикаты🔼' },
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