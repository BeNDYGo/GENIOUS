// ---Встроенный данные и вспомогательные функции---
const SampleSearch = 'https://genius.com/search?q=';
const SampleButtonHTMLYandex = `
<button id="ButtonSearchGenius" 
        style="background: none; border: none; color:rgb(153, 153, 153); font-size: 25px; font-weight: 600; 
               padding: 8px 12px; cursor: pointer; transition: color 0.3s ease, transform 0.2s ease; 
               position: relative; z-index: 1000;">
    G
</button>`;

const SampleButtonHTMLSoundcloud = `
<button id="ButtonSearchGenius" 
    style="background: none; border: none; color: rgb(153, 153, 153); font-weight: 700; font-size: 20px; margin-left: 25px;">
    G
</button>`;

function log(message, data = '') {
    console.log(`[GeniusButton] ${message}`, data || '');
}

function logError(message, error) {
    console.error(`[GeniusButton] ОШИБКА: ${message}`, error || '');
}
