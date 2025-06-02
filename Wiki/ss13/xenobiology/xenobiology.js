const iconButtons = document.querySelectorAll('.icon-button');
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
});