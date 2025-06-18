function initializeBookChemistryPage() {
    console.log("Bookchemistry.js: Инициализация Book Chemistry-страницы...");

    const infoButtons = document.querySelectorAll('.image-text-button');

    infoButtons.forEach(button => {
        if (!button._hasEventListener) { 
            button.addEventListener('click', function() {
                const info = this.getAttribute('data-info');
                const infoDisplay = this.parentElement.querySelector('.info-display');

                if (infoDisplay.style.display === 'block') {
                    infoDisplay.style.display = 'none';
                } else {
                    const lines = info.split('\\n');
                    let numberedList = '';
                    for (let i = 0; i < Math.min(lines.length, 3); i++) {
                        numberedList += `${i + 1}. ${lines[i]}<br>`;
                    }
                    infoDisplay.innerHTML = numberedList;
                    infoDisplay.style.display = 'block';
                }
            });
            button._hasEventListener = true; 
        }
    });
}