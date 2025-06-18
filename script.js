document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const content = document.getElementById('content');
    const homeButton = document.getElementById('home-button');
    const article1Button = document.getElementById('article1-button');
    const article2Button = document.getElementById('article2-button');

    // Функция для переключения темы 
    function toggleTheme() {
        body.classList.toggle('dark-mode');
        themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️Светлая тема' : '🌑Темная тема';
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    }

    const navIcons = document.querySelectorAll('nav button img');

    navIcons.forEach(icon => {
        const currentSrc = icon.getAttribute('src');
        let newSrc = '';

        if (currentSrc.includes('-dark')) {
            newSrc = currentSrc.replace('-dark', '');
        } else {
            const parts = currentSrc.split('.');
            newSrc = parts[0] + '-dark.' + parts[1];
        }
        icon.setAttribute('src', newSrc);
    });

    // Проверяем сохраненную тему при загрузке страницы 
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️Светлая тема';
    }

    // Обработчик нажатия на кнопку смены темы 
    themeToggle.addEventListener('click', toggleTheme);

    // Функция для загрузки контента 
    function loadContent(url) {
        console.log("Загружаю:", url);
        content.innerHTML = '';

        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                const baseUrl = url.substring(0, url.lastIndexOf('/')) + '/';

                // Изменяем пути к CSS
                const cssLinks = doc.querySelectorAll('link[rel="stylesheet"]');
                cssLinks.forEach(link => {
                    let href = link.getAttribute('href');
                    if (href && !href.startsWith('http') && !href.startsWith('/')) {
                        link.setAttribute('href', baseUrl + href);
                    }
                    document.head.appendChild(link);
                });

                // Извлекаем и добавляем содержимое body
                content.innerHTML = doc.body.innerHTML;

                // **Обработка xenobiology.js и bookchemistry.js**
                if (url.includes('xenobiology.html') || url.includes('bookchemistry.html') || url.includes('rndbook.html')) {
                    const targetScript = url.includes('xenobiology.html') ? 'xenobiology.js' : 'bookchemistry.js';
                    const scriptElement = doc.querySelector(`script[src="${targetScript}"]`);
                    if (scriptElement) {
                        const newScript = document.createElement('script');
                        newScript.src = baseUrl + targetScript;
                        newScript.onload = function() {
                            if (targetScript === 'xenobiology.js');
                            const savedTheme = localStorage.getItem('theme');
                            if (savedTheme === 'dark') {
                                document.body.classList.add('dark-mode');
                            }
                        };
                        document.body.appendChild(newScript);
                    }
                }

            })
            .catch(error => {
                console.error('Ошибка загрузки:', error);
                content.innerHTML = '<p>Ошибка загрузки содержимого.</p>';
            });
    }


    // Обработчики нажатий на кнопки навигации
    homeButton.addEventListener('click', function() {
        content.innerHTML = '<h2>Добро пожаловать!</h2><p>Это главная страница вики.</p>';
    });

    article1Button.addEventListener('click', function() {
        content.innerHTML = `
            <h2 class="sena-s">Ссылки на игровые серверы: 
            <p>
                <span class="server-buttons-container">
                    <button class="server-link-button" data-url="https://play.ss13-bluemoon.ru/">
                        <img src="images/bluemoon-96.png" alt="Bluemoon">
                        <span>Bluemoon</span>
                    </button>
                    <button class="server-link-button" data-url="https://white.ss13-bluemoon.ru/">
                        <img src="images/whitemoon-96.png" alt="Whitemoon">
                        <span>Whitemoon</span>
                    </button>
                </span>
            </p>
            <div class="article-navigation">
                <button class="wiki-button" data-path="Wiki/ss13/xenobiology/xenobiology.html">🦠ксенобиология</button>
                <button class="wiki-button" data-path="Wiki/ss13/bookchemistry/bookchemistry.html">⚗️Книга хими</button>
                <button class="wiki-button" data-path="Wiki/ss13/rnd/rnd.html">🥽РНД</button>
            </div>
        `;

        // Добавляем обработчики для кнопок серверов после их загрузки 
        const serverLinkButtons = document.querySelectorAll('.server-link-button');
        serverLinkButtons.forEach(button => {
            button.addEventListener('click', function() {
                const url = this.getAttribute('data-url');
                window.location.href = url;
            });
        });

        const wikiButtons = document.querySelectorAll('.wiki-button');
        wikiButtons.forEach(button => {
            button.addEventListener('click', function() {
                const path = this.getAttribute('data-path');
                loadContent(path);
            });
        });
    });

    article2Button.addEventListener('click', function() {
        content.innerHTML =  `
            <h2 class="sena-s">🕹️ ИГРЫ 🎮
            <p>Игры которые вы сможете пойграть.</p>
            <div class="article-navigation">
                <button class="wiki-button" data-path="Game/sapper/sapper.html">Сапёр</button>
                <button class="wiki-button" data-path="Wiki/topicB.html">Тема B</button>
            </div>
        `;

        const wikiButtons = document.querySelectorAll('.wiki-button');
        wikiButtons.forEach(button => {
            button.addEventListener('click', function() {
                const path = this.getAttribute('data-path');
                loadContent(path);
            });
        });
    });
});