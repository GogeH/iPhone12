'use strict';

const tabs = () => {
    const cardDetailChangeElems = document.querySelectorAll('.js-card-change');
    const cardDetailTitleElem = document.querySelector('.js-card-title');
    const cardImageItemElem = document.querySelector('.js-card-image_item');
    const cardDetailPriceElem = document.querySelector('.js-card-price');
    const descriptionMemoryElem = document.querySelector('.js-description-memory');
    const descriptionScreenElem = document.querySelector('.js-description-screen');
    const screenElems = document.querySelector('.js-screen');
    const expansionElems = document.querySelector('.js-expansion');

    const data = [
        {
            name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
            img: 'img/iPhone/iPhone-graphite.png',
            price: 95990,
            memoryROM: 128,
            screen: 6.1,
            expansion: '2532x1170',
        },
        {
            name: 'Смартфон Apple iPhone 12 Pro 256GB Silver',
            img: 'img/iPhone/iPhone-silver.png',
            price: 105990,
            memoryROM: 256,
            screen: 6.7,
            expansion: '2778x1284',
        },
        {
            name: 'Смартфон Apple iPhone 12 Pro 512GB Pacific Blue',
            img: 'img/iPhone/iPhone-blue.png',
            price: 129990,
            memoryROM: 512,
            screen: 6.7,
            expansion: '2778x1284',
        }
    ];

    const deactive = () => {
        cardDetailChangeElems.forEach(btn => btn.classList.remove('active'));
    };

    cardDetailChangeElems.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            if (!btn.classList.contains('active')) {
                deactive();
                btn.classList.add('active');
                cardDetailTitleElem.textContent = data[i].name;
                cardImageItemElem.src = data[i].img;
                cardImageItemElem.alt = data[i].name;
                cardDetailPriceElem.textContent = data[i].price + '₽';
                descriptionMemoryElem.textContent = `>Встроенная память (ROM) ${data[i].memoryROM} ГБ`;
                descriptionScreenElem.textContent = `Экран ${data[i].screen}/${data[i].expansion} Пикс`;
                screenElems.textContent = data[i].screen;
                expansionElems.textContent = data[i].expansion;
            }
        });
    });
};

export default tabs;