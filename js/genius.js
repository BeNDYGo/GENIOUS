function CheckTopResult(){
    // Находим div с текстом "Top Result"
    const topResultDiv = Array.from(document.querySelectorAll('div')).find(div =>
        div.textContent.trim() === 'Top Result'
    );

    if (!topResultDiv) {
        console.log('Div с текстом "Top Result" не найден');
        return;
    }

    // Поднимаемся на 1 div выше (родительский div)
    const mainDiv = topResultDiv.parentElement;

    if (!mainDiv) {
        console.log('Родительский div не найден');
        return;
    }

    // Считаем количество div'ов внутри главного div
    const innerDivs = mainDiv.querySelectorAll(':scope > div');
    const divCount = innerDivs.length;

    console.log(`Количество div'ов в главном div: ${divCount}`);

    // Если количество div'ов равно 2
    if (divCount === 2) {
        // Находим последний div внутри главного div
        const lastDiv = innerDivs[innerDivs.length - 1];

        // Находим элемент "a" (ссылку) в последнем div
        const linkElement = lastDiv.querySelector('a');

        if (linkElement) {
            console.log('найдена ссылка на текст песни');
            linkElement.click();
        } else {
            console.log('Элемент "a" не найден');
        }
    }
}

// --- Обработчики ---
if (document.body) {
    // добавление обработчика события клика на всякий случай
    document.body.addEventListener('click', () => {
        CheckTopResult();
    });
    // проверка через 0.5 секунды
    setTimeout(() => {
        CheckTopResult();
    }, 500);
}