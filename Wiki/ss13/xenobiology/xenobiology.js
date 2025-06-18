/*const iconButtons = document.querySelectorAll('.icon-button');
const infoCells = document.querySelectorAll('.info-cell');

iconButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Скрываем все ячейки с информацией
        infoCells.forEach(cell => {
            cell.style.display = 'none';
        });

        // Показываем нужную ячейку
        const infoId = button.getAttribute('data-info-id');
        const infoCell = document.getElementById(infoId);
        if (infoCell) {
            infoCell.style.display = 'block';
        }
    });
});*/

    const collapsibleButton = document.querySelector('.collapsible-button');
    const collapsibleContent = document.querySelector('.collapsible-content');

    collapsibleButton.addEventListener('click', () => {
        collapsibleContent.classList.toggle('collapsed');
        // Меняем стрелочку
        if (collapsibleContent.classList.contains('collapsed')) {
            collapsibleButton.textContent = '0-1 уровень🔽';
        } else {
            collapsibleButton.textContent = '0-1 уровень🔼';
        }
    });

    const collapsibleButton1 = document.querySelector('.collapsible-button-1');
    const collapsibleContent1 = document.querySelector('.collapsible-content-1');

    collapsibleButton1.addEventListener('click', () => {
        collapsibleContent1.classList.toggle('collapsed');
        // Меняем стрелочку
        if (collapsibleContent1.classList.contains('collapsed')) {
            collapsibleButton1.textContent = '2-3 уровень🔽';
        } else {
            collapsibleButton1.textContent = '2-3 уровень🔼';
        }
    });

    const collapsibleButton2 = document.querySelector('.collapsible-button-2');
    const collapsibleContent2 = document.querySelector('.collapsible-content-2');

    collapsibleButton2.addEventListener('click', () => {
        collapsibleContent2.classList.toggle('collapsed');
        // Меняем стрелочку
        if (collapsibleContent2.classList.contains('collapsed')) {
            collapsibleButton2.textContent = '4 уровень🔽';
        } else {
            collapsibleButton2.textContent = '4 уровень🔼';
        }
    });

    const collapsibleButton3 = document.querySelector('.collapsible-button-3');
    const collapsibleContent3 = document.querySelector('.collapsible-content-3');

    collapsibleButton3.addEventListener('click', () => {
        collapsibleContent3.classList.toggle('collapsed');
        // Меняем стрелочку
        if (collapsibleContent3.classList.contains('collapsed')) {
            collapsibleButton3.textContent = '5 уровень🔽';
        } else {
            collapsibleButton3.textContent = '5 уровень🔼';
        }
    });

    const collapsibleButton4 = document.querySelector('.collapsible-button-4');
    const collapsibleContent4 = document.querySelector('.collapsible-content-4');

    collapsibleButton4.addEventListener('click', () => {
        collapsibleContent4.classList.toggle('collapsed');
        // Меняем стрелочку
        if (collapsibleContent4.classList.contains('collapsed')) {
            collapsibleButton4.textContent = 'спец. уровень🔽';
        } else {
            collapsibleButton4.textContent = 'спец. уровень🔼';
        }
    });

    const collapsibleButton5 = document.querySelector('.collapsible-button-5');
    const collapsibleContent5 = document.querySelector('.collapsible-content-5');

    collapsibleButton5.addEventListener('click', () => {
        collapsibleContent5.classList.toggle('collapsed');
        // Меняем стрелочку
        if (collapsibleContent5.classList.contains('collapsed')) {
            collapsibleButton5.textContent = 'Репродуктивный🔽';
        } else {
            collapsibleButton5.textContent = 'Репродуктивный🔼';
        }
    });