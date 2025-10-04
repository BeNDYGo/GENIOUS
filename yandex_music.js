function CheckText(text) {
    const result = text && 
                  !text.includes('prod. by') && 
                  !text.includes('prod.by') && 
                  !text.includes('CONTAINER_IS_HIDDEN');
    return result;
}

function GetTrackDataYandex() {
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
function CreateButtonYandex() {
    if (document.getElementById('ButtonSearchGenius')) {
        return;
    }

    const BarMeta = document.querySelector('[class*="PlayerBarDesktopWithBackgroundProgressBar_meta"]');
    if (!BarMeta) {
        log('Панель кнопок не найдена');
        return;
    }

    try {
        BarMeta.insertAdjacentHTML('beforeend', SampleButtonHTML);
        
        const btn = document.getElementById('ButtonSearchGenius');
        log('Кнопка создана');

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const trackData = GetTrackDataYandex();
            if (!trackData) {
                log('Данные трека не найдены');
                return;
            }

            const query = `${trackData.trackName} ${trackData.trackAuthors.join(' ')}`.replace(/ /g, '%20');
            log('Открытие поиска');
            window.open(SampleSearch + query, '_blank');
        });
        
    } catch (error) {
        logError('Ошибка в CreateButtonYandex:', error);
    }
}

// --- Обработчики ---
document.addEventListener('click', () => {
    CreateButtonYandex();
});

if (document.body) {
    document.body.addEventListener('click', () => {
        CreateButtonYandex();
    });
}

function Init() {
    CreateButtonYandex();
}

function SetupObserver() {
    try {
        const observer = new MutationObserver((mutations) => {
            CreateButtonYandex();
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
