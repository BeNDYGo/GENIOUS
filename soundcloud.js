function GetTrackDataSoundcloud(){
    const playbackSoundBadge = document.querySelector('[class*="playbackSoundBadge"]');
    if (!playbackSoundBadge){
        log('не удалось найти playbackSoundBadge');
        return null;
    }

    const TextPlay = document.querySelector('[class*="playbackSoundBadge__titleContextContainer"]');
    if (!TextPlay){
        log('не удалось найти TextPlay');
        return null;
    }

    const spans = TextPlay.querySelectorAll('span')
    const href = TextPlay.querySelectorAll('a')

    const trackName = spans[spans.length - 1].textContent;
    const trackAuthors = href[0].textContent;

    log({trackName}, {trackAuthors})
    return { trackName, trackAuthors };
}

function CreateButtonSoundcloud(){
    if (document.getElementById('ButtonSearchGenius')) {
        return;
    }

    const playbackSoundBadge = document.querySelector('[class*="playbackSoundBadge"]');
    if (!playbackSoundBadge){
        log('не удалось найти playbackSoundBadge');
        return null;
    }

    const PalyBar = document.querySelector('[class*="playbackSoundBadge__actions"]');
    if (!PalyBar){
        log('не удалось найти PalyBar');
        return null;
    }
    
    try {
        PalyBar.insertAdjacentHTML('beforeend', SampleButtonHTML);
        
        const btn = document.getElementById('ButtonSearchGenius');
        log('Кнопка создана');

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const trackData = GetTrackDataSoundcloud();
            if (!trackData) {
                log('Данные трека не найдены');
                return;
            }

            const query = `${trackData.trackName} ${trackData.trackAuthors}`;
            log('Открытие поиска');
            window.open(SampleSearch + query, '_blank');
        });
        
    } catch (error) {
        logError('Ошибка в CreateButtonSoundcloud:', error);
    }
};

// --- Обработчики ---
document.addEventListener('click', () => {
    CreateButtonSoundcloud();
});

if (document.body) {
    document.body.addEventListener('click', () => {
        CreateButtonSoundcloud();
    });
}

function Init() {
    CreateButtonSoundcloud();
}

function SetupObserver() {
    try {
        const observer = new MutationObserver((mutations) => {
            CreateButtonSoundcloud();
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
