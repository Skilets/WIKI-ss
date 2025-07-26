document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const content = document.getElementById('content');
    const homeButton = document.getElementById('home-button');
    const article1Button = document.getElementById('article1-button');
    const article2Button = document.getElementById('article2-button');
    const article3Button = document.getElementById('article3-button');

    // Функция для переключения темы
    function toggleTheme() {
        body.classList.toggle('dark-mode');
        themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌑';
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    }

    // Проверяем сохраненную тему при загрузке страницы
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    // Обработчик нажатия на кнопку смены темы
    themeToggle.addEventListener('click', toggleTheme);

    // Set для отслеживания загруженных скриптов в текущей сессии
    // Set позволяет быстро проверять наличие элемента и гарантирует уникальность
    const loadedScripts = new Set();
    const loadedStyles = new Set();

    // Функция для загрузки контента
    function loadContent(url) {
        // Проверяем, не загружается ли уже этот контент
        if (content.dataset.loading === 'true' && content.dataset.loadingUrl === url) {
            console.log(`script.js: Предотвращена повторная загрузка для: ${url}`);
            return;
        }
        content.dataset.loading = 'true';
        content.dataset.loadingUrl = url;

        console.log("script.js: Загружаю:", url);
        content.innerHTML = ''; // Очищаем контент

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} for ${url}`);
                }
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Определяем базовый URL для загружаемого контента (например, Wiki/ss13/xenobiology/)
                const baseUrlIndex = url.lastIndexOf('/');
                const baseUrl = baseUrlIndex !== -1 ? url.substring(0, baseUrlIndex + 1) : '';

                // Изменяем пути к CSS и добавляем их в head
                const cssLinks = doc.querySelectorAll('link[rel="stylesheet"]');
                cssLinks.forEach(link => {
                    let href = link.getAttribute('href');
                    if (href && !href.startsWith('http://') && !href.startsWith('https://') && !href.startsWith('/')) {
                        href = baseUrl + href;
                    }
                    if (!loadedStyles.has(href)) {
                        const newLink = document.createElement('link');
                        newLink.rel = 'stylesheet';
                        newLink.href = href;
                        document.head.appendChild(newLink);
                        loadedStyles.add(href);
                        console.log(`script.js: Добавлен CSS: ${href}`);
                    }
                });

                // Извлекаем и добавляем содержимое body
                content.innerHTML = doc.body.innerHTML;

                // **Обработка JS**
                let targetScript = null;
                let initFunctionName = null; 

                if (url.includes('xenobiology.html')) {
                    targetScript = 'xenobiology.js';
                    initFunctionName = 'initializeXenobiologyPage';}
                else if (url.includes('bookchemistry.html')) {
                    targetScript = 'bookchemistry.js';
                    initFunctionName = 'initializeBookChemistryPage';}
                else if (url.includes('hydroponics.html')) {
                    targetScript = 'hydroponics.js';
                    initFunctionName = 'initializeHydroponicsPage';}
                else if (url.includes('rnd.html')) {
                    targetScript = 'rnd.js';
                }

                // Загружаем скрипт, если он еще не был загружен
                if (targetScript && !loadedScripts.has(targetScript)) {
                    const newScript = document.createElement('script');
                    newScript.src = baseUrl + targetScript;
                    newScript.onload = function() {
                        console.log(`script.js: ${targetScript} загружен.`);
                        loadedScripts.add(targetScript); // Добавляем в Set загруженных скриптов

                        // Вызываем функцию инициализации, если она существует в глобальной области
                        if (initFunctionName && typeof window[initFunctionName] === 'function') {
                            window[initFunctionName]();
                        } else if (initFunctionName) {
                            console.warn(`script.js: Функция ${initFunctionName} не найдена после загрузки ${targetScript}.`);
                        }
                    };
                    newScript.onerror = function() {
                        console.error(`script.js: Ошибка загрузки скрипта: ${targetScript}`);
                    };
                    document.body.appendChild(newScript);
                } else if (targetScript && loadedScripts.has(targetScript)) {
                    console.log(`script.js: ${targetScript} уже загружен, повторная инициализация.`);
                    if (initFunctionName && typeof window[initFunctionName] === 'function') {
                        window[initFunctionName]();
                    } else if (initFunctionName) {
                        console.warn(`script.js: Функция ${initFunctionName} не найдена при повторной инициализации.`);
                    }
                }

                // После успешной загрузки и вставки контента, сбрасываем флаг загрузки
                content.dataset.loading = 'false';
                delete content.dataset.loadingUrl;

            })
            .catch(error => {
                console.error('script.js: Ошибка загрузки контента:', error);
                content.innerHTML = '<p>Ошибка загрузки содержимого.</p>';
                content.dataset.loading = 'false';
                delete content.dataset.loadingUrl;
            });
    }

    // Делегирование событий для кнопок .wiki-button (внутри динамически загруженного контента)
    content.addEventListener('click', function(event) {
        const target = event.target.closest('.wiki-button');
        if (target) {
            const path = target.getAttribute('data-path');
            loadContent(path);
        }
    });

    // Делегирование событий для кнопок .server-link-button (внутри динамически загруженного контента)
    content.addEventListener('click', function(event) {
        const target = event.target.closest('.server-link-button');
        if (target) {
            const url = target.getAttribute('data-url');
            window.location.href = url;
        }
    });


    // Обработчики нажатий на кнопки навигации в главном меню
    homeButton.addEventListener('click', function() {
        content.innerHTML = '<h2 class="sena-s">Добро пожаловать!</h2><p class="sena-s">Это главная страница вики.</p>';
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
                <button class="wiki-button" data-path="Wiki/ss13/xenobiology/xenobiology.html">🦠ксенобиология🦠</button>
                <button class="wiki-button" data-path="Wiki/ss13/book-chemistry/bookchemistry.html">⚗️Книга хими⚗️</button>
                <button class="wiki-button" data-path="Wiki/ss13/engineering-items/engineering-items.html">🧰Инженерный вещи🧰</button>
                <button class="wiki-button" data-path="Wiki/ss13/rnd/rnd.html">🔍Технологи🔍</button>
                <button class="wiki-button" data-path="Wiki/ss13/hydroponics/hydroponics.html">🌳гидропоника🌳</button>
            </div>
        `;
    });

    article2Button.addEventListener('click', function() {
        content.innerHTML =  ` 
        <h2 class="sena-s"> Все что тут есть</h2>
            <div class="article-navigation">
                <button class="wiki-button" data-path="Game/sapper/sapper.html">Сапёр</button>
                <button class="wiki-button" data-path="Wiki/topicB.html">Тема B</button>
            </div>
        `;
    });

    article3Button.addEventListener('click', function() {
        content.innerHTML =  ` 
        <h2 class="sena-s">🕹️ ИГРЫ 🎮</h2>
        <p class="sena-s">Игры которые вы сможете пойграть.</p>
            <div class="article-navigation">
                <button class="wiki-button" data-path="Game/sapper/sapper.html">Сапёр</button>
                <button class="wiki-button" data-path="Wiki/topicB.html">Тема B</button>
            </div>
        `;
    });
});