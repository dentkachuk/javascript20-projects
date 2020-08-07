const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const quoteBlock = document.getElementById('quote');
const loader = document.getElementById('loader');

function loading() {
    loader.hidden = false;
    quoteBlock.hidden = true;
}

function complete() {
    if (!loader.hidden) {
        quoteBlock.hidden = false;
        loader.hidden = true;
    }
}

// get random quote from API
async function getQuote() {
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if (data.quoteAuthor) {
            quoteAuthor.innerText = data.quoteAuthor;
        } else {
            quoteAuthor.innerText = 'Unknown';
        }

        if(data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        complete();
    } catch (error) {
        console.error(error);
        setTimeout(() => {
            getQuote();
        }, 1000);
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweetUrl, '_blank');
}

// On Load
getQuote();