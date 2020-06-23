let images = request()
    .then(imgs => images = imgs)
    .catch(error => console.log(error));

document.querySelector('h1').innerHTML = getMessage();

setInterval(function () {
    Array.from(document.getElementsByClassName('grid-item')).forEach(element => {
        element.style.backgroundImage = `url(${images[Math.floor(Math.random() * images.length)]})`;
    });
}, 2500);

function getMessage() {
    const now = new Date();
    const days = daysUntulNextBirthday(now);

    switch (days) {
        case 0:
            return 'É HOJE!!!';
        case 1:
            return 'É amanhã!';
        default:
            return `Falta ${days} dias!`;
    }
}

function daysUntulNextBirthday(now) {
    const bday = getNextBirthday(now);
    const days = millisecondsToDays(bday - now);

    return Math.ceil(days);
}

function getNextBirthday(now) {
    const year = now.getFullYear();
    const bday = new Date(`${year}-04-13`);

    return now <= bday ? bday : new Date(`${year + 1}-04-13`);
}

function millisecondsToDays(ts) {
    return ts / 1000 / 60 / 60 / 24;
}

function request(options) {
    return fetch('https://api.myjson.com/bins/9tq93', options)
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            throw new Error('Deu erro tio');
        })
        .catch(error => console.log(error));
}

if (navigator.serviceWorker) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(registration => console.log('Registered events at scope: ', registration.scope))
        .catch(error => console.log(error));
}
