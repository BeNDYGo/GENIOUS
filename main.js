const SampleSearch = 'https://genius.com/search?q=';
const SampleButtonHTML = `
<button id="ButtonSearchGenius" 
        style="background: none; border: none; color: #808080; font-size: 18px; font-weight: 600; 
               padding: 8px 12px; cursor: pointer; transition: color 0.3s ease, transform 0.2s ease; 
               position: relative; z-index: 1000;">
    G
</button>`;

function log(message, data = '') {
    console.log(`[GeniusButton] ${message}`, data || '');
}

function logError(message, error) {
    console.error(`[GeniusButton] ОШИБКА: ${message}`, error || '');
}

// --- Вспомогательные функции ---
function CheckText(text) {
    const result = text && 
                  !text.includes('prod. by') && 
                  !text.includes('prod.by') && 
                  !text.includes('CONTAINER_IS_HIDDEN');
    return result;
}

function GetTrackData() {
    const BarPlayer = document.querySelector('[class*="PlayerBarDesktopWithBackgroundProgressBar_description"]');
    
    if (!BarPlayer) {
        log('Панель плеера не найдена');
        return null;
    }

    const nowTrackElement = BarPlayer.querySelector('[class*="Meta_metaContainer"]');
    
    if (!nowTrackElement) {
        return null;
    }

    const spans = nowTrackElement.querySelectorAll('span');
    
    const dataTrack = [];
    spans.forEach((span, index) => {
        const text = span.textContent.trim();
        if (CheckText(text)) {
            dataTrack.push(text);
        }
    });

    if (dataTrack.length === 0) {
        return null;
    }

    const trackName = dataTrack[0];
    const trackAuthors = dataTrack.slice(1);
    
    log('Данные трека:', { trackName, trackAuthors });
    return { trackName, trackAuthors };
}

// --- Создание кнопки ---
function CreateButton() {
    const BarMeta = document.querySelector('[class*="PlayerBarDesktopWithBackgroundProgressBar_meta"]');
    
    if (!BarMeta) {
        log('Панель кнопок не найдена');
        return;
    }

    if (document.getElementById('ButtonSearchGenius')) {
        return;
    }

    try {
        BarMeta.insertAdjacentHTML('beforeend', SampleButtonHTML);
        
        const btn = document.getElementById('ButtonSearchGenius');
        log('Кнопка создана');

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const trackData = GetTrackData();
            if (!trackData) {
                log('Данные трека не найдены');
                return;
            }

            const query = `${trackData.trackName} ${trackData.trackAuthors.join(' ')}`.replace(/ /g, '%20');
            log('Открытие поиска');
            window.open(SampleSearch + query, '_blank');
        });
        
    } catch (error) {
        logError('Ошибка в CreateButton:', error);
    }
}

function Init() {
    CreateButton();
}
// --- Логика Наблюдателя ---

document.addEventListener('click', () => {
    CreateButton();
});

function SetupObserver() {
    try {
        const observer = new MutationObserver((mutations) => {
            CreateButton();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    } catch (error) {
        logError('Не удалось настроить наблюдатель:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        Init();
        SetupObserver();
    } catch (error) {
        logError('Инициализация не удалась:', error);
    }
});

if (document.body) {
    document.body.addEventListener('click', () => {
        CreateButton();
    });
}

// Открытие страницы
const BarPlayer = document.querySelector('[class*="PlayerBar"]');

if (BarPlayer) {
    BarPlayer.addEventListener('click', () => {
        CreateButton();
    });
}
