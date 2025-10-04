// ---Встроенный данные и вспомогательные функции---
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
