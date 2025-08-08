document.addEventListener('DOMContentLoaded', function () {
	const themeToggle = document.getElementById('theme-toggle');
	const body = document.body;
	const content = document.getElementById('content');
	const homeButton = document.getElementById('home-button');
	const article1Button = document.getElementById('article1-button');
	const article2Button = document.getElementById('article2-button');
	const article3Button = document.getElementById('article3-button');

	// Тема
	function toggleTheme() {
		body.classList.toggle('dark-mode');
		themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌑';
		localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
	}

	const savedTheme = localStorage.getItem('theme');
	if (savedTheme === 'dark') {
		body.classList.add('dark-mode');
		themeToggle.textContent = '☀️';
	}

	themeToggle.addEventListener('click', toggleTheme);

	// Кэш загруженных файлов
	const loadedScripts = new Set();
	const loadedStyles = new Set();

	// Загрузка контента
	function loadContent(url) {
		if (content.dataset.loading === 'true' && content.dataset.loadingUrl === url) {
			console.log(`⏳ Уже загружается: ${url}`);
			return;
		}

		content.dataset.loading = 'true';
		content.dataset.loadingUrl = url;
		content.innerHTML = '';
		console.log(`📄 Загружаю: ${url}`);

		fetch(url)
			.then((response) => {
				if (!response.ok) throw new Error(`Ошибка HTTP ${response.status}`);
				return response.text();
			})
			.then((html) => {
				const parser = new DOMParser();
				const doc = parser.parseFromString(html, 'text/html');
				const baseUrl = url.substring(0, url.lastIndexOf('/') + 1);

				// Подключаем CSS
				doc.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
					let href = link.getAttribute('href');
					if (href && !href.startsWith('http') && !href.startsWith('/')) {
						href = baseUrl + href;
					}
					if (!loadedStyles.has(href)) {
						const newLink = document.createElement('link');
						newLink.rel = 'stylesheet';
						newLink.href = href;
						document.head.appendChild(newLink);
						loadedStyles.add(href);
						console.log(`🧩 CSS добавлен: ${href}`);
					}
				});

				// Вставка содержимого
				content.innerHTML = doc.body.innerHTML;

				// Выбор скрипта и инициализации
				let targetScript = null;
				let initFunction = null;

				if (url.includes('xenobiology.html')) {
					targetScript = 'xenobiology.js';
					initFunction = 'initializeXenobiologyPage';
				} else if (url.includes('bookchemistry.html')) {
					targetScript = 'bookchemistry.js';
					initFunction = 'initializeBookChemistryPage';
				} else if (url.includes('hydroponics.html')) {
					targetScript = 'hydroponics.js';
					initFunction = 'initializeHydroponicsPage';
				} else if (url.includes('rnd.html')) {
					targetScript = 'rnd.js';
					// initFunction = 'initializeRndPage'; // если понадобится
				} else if (url.includes('minesweeper.html')) {
					targetScript = 'minesweeper.js';
					initFunction = 'initializeMinesweeperPage';
				}

				if (targetScript) {
					if (!loadedScripts.has(targetScript)) {
						const script = document.createElement('script');
						script.src = baseUrl + targetScript;
						script.onload = () => {
							console.log(`✅ Скрипт загружен: ${targetScript}`);
							loadedScripts.add(targetScript);
							if (initFunction && typeof window[initFunction] === 'function') {
								window[initFunction]();
							} else {
								console.warn(`⚠️ Функция ${initFunction} не найдена после загрузки`);
							}
						};
						script.onerror = () => {
							console.error(`❌ Ошибка загрузки скрипта: ${targetScript}`);
						};
						document.body.appendChild(script);
					} else {
						console.log(`♻️ Скрипт уже загружен: ${targetScript}`);
						if (initFunction && typeof window[initFunction] === 'function') {
							window[initFunction]();
						} else {
							console.warn(`⚠️ Повтор: ${initFunction} не найдена`);
						}
					}
				}

				content.dataset.loading = 'false';
				delete content.dataset.loadingUrl;
			})
			.catch((error) => {
				console.error('❌ Ошибка загрузки контента:', error);
				content.innerHTML = '<p>Ошибка загрузки содержимого.</p>';
				content.dataset.loading = 'false';
				delete content.dataset.loadingUrl;
			});
	}

	// Делегируем нажатия кнопок контента
	content.addEventListener('click', (event) => {
		const btn = event.target.closest('.wiki-button');
		if (btn) {
			const path = btn.getAttribute('data-path');
			if (path) loadContent(path);
		}
	});

	content.addEventListener('click', (event) => {
		const btn = event.target.closest('.server-link-button');
		if (btn) {
			const url = btn.getAttribute('data-url');
			if (url) window.location.href = url;
		}
	});

	// Обработка главного меню
	homeButton.addEventListener('click', () => {
		content.innerHTML = `<h2 class="sena-s">Добро пожаловать!</h2><p class="sena-s">Это главная страница вики.</p>`;
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
                <button class="wiki-button" data-path="Wiki/ss13/xenobiology/xenobiology.html"><img src="images/icon/xeno.gif"><span>ксенобиология</span></button>
                <button class="wiki-button" data-path="Wiki/ss13/book-chemistry/bookchemistry.html"><img src="images/icon/book-chemistry.gif"><span>Книга хими</span></button>
                <button class="wiki-button" data-path="Wiki/ss13/engineering-items/engineering-items.html"><img src="images/icon/toolbox2.png"><span>Инжинерные<br>инструменты</span></button>
                <button class="wiki-button" data-path="Wiki/ss13/rnd/rnd.html"><img src="images/icon/rnd.gif"><span>Технологи</span></button>
                <button class="wiki-button" data-path="Wiki/ss13/hydroponics/hydroponics.html"><img src="images/icon/hydroponics.png"><span>гидропоника</span></button>
            </div>
        `;
    });

    article2Button.addEventListener('click', function() {
        content.innerHTML =  ` 
        <h2 class="sena-s"> Все что тут есть</h2>
            <div class="article-navigation">
                <button class="wiki-button" data-path="Wiki/ss14/topicA.html">Тема A</button>
                <button class="wiki-button" data-path="Wiki/ss14/topicB.html">Тема B</button>
            </div>
        `;
    });

	article3Button.addEventListener('click', () => {
		content.innerHTML = `
			<h2 class="sena-s">🕹️ ИГРЫ 🎮</h2>
			<p class="sena-s">Игры которые вы сможете пойграть.</p>
			<div class="article-navigation">
				<button class="wiki-button" data-path="Game/minesweeper/minesweeper.html">Сапёр</button>
				<button class="wiki-button" data-path="Wiki/topicB.html">Тема B</button>
			</div>
		`;
	});
});