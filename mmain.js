const SampleSearch = 'https://genius.com/search?q='
const SampleButton = '<button id="ButtonSearhGenious" style="background: none; border: none; color: #808080; font-size: 18px; font-weight: 600; padding: 8px 12px; cursor: pointer; transition: color 0.3s ease, transform 0.2s ease;">G</button>'
let TrackName = '';
let TreckAutors = [];

function CheckText(text){
    if ( text && (!text.includes('prod. by') && !text.includes('prod.by')) && (!text.includes('CONTAINER_IS_HIDDEN')) ) {
            return 1;
        };
    return 0;
};
function Main(){
    setTimeout(() => {
    const BarPalyer = document.querySelector('[class^="PlayerBarDesktopWithBackgroundProgressBar_description"]')
    if (BarPalyer) {
        const nowTrekElement = BarPalyer.querySelector('[class^="Meta_metaContainer"]');
        const spans = nowTrekElement.querySelectorAll('span');
        const dataTreck = [];
        spans.forEach((span) => {
            const text = span.textContent.trim();
            if (CheckText(text)) {
                dataTreck.push(text)
            }
        })
        TrackName = dataTreck[0]
        TreckAutors = dataTreck.slice(1)
        console.log(`Трек: ${TrackName}`)
        console.log(`Автор: ${TreckAutors}`)
    };
    const BarMeta = document.querySelector('[class^="PlayerBarDesktopWithBackgroundProgressBar_meta"]')
    if (BarMeta && !document.getElementById('ButtonSearhGenious')) {
        BarMeta.innerHTML += SampleButton
        document.getElementById('ButtonSearhGenious').addEventListener('click', () => {
            const query = `${TrackName} ${TreckAutors.join(' ')}`.replace(/ /g, '%20');
            window.open(SampleSearch + query, '_blank');
        });
    }
    }, 500);
};

document.addEventListener('click', Main);
Main();