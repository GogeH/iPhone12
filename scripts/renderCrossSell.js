'use strict';

const renderCrossSell = () => {
    const COUNT_ROW_GOODS = 4;
    const crossSellList = document.querySelector('.js-cross-sell-list');
    const crossSellAdd = document.querySelector('.js-button-add');
    const allGoods = [];

    const getData = (url, callback) => {
        fetch(url).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
            .then(callback)
            .catch((err) => {
                console.log(err);
            });
    };

    const shuffle = arr => arr.sort(() => Math.random() - 0.5);

    const createCrossSellItem = (good) => {
        const MODULE_CLASSES = {
            SELL_ITEM: 'cross-sell__item js-cross-sell__item',
            SELL_IMAGE: 'cross-sell__image-cross-sell__image',
            SELL_TITLE: 'cross-sell__title js-cross-sell__title',
            SELL_PRICE: 'cross-sell__price js-cross-sell__price',
            BUTTON: 'button js-button',
            BUTTON_BUY: 'button__buy js-button__buy',
            BUTTON_SELL: 'cross-sell__button js-ross-sell__button',
        };
        const {photo, name, price} = good;
        const liItem = document.createElement('li');

        liItem.innerHTML = `
               <article class="${MODULE_CLASSES.SELL_ITEM}">
                  <img class="${MODULE_CLASSES.SELL_IMAGE}" src="${photo}" alt="${name}">
                  <h3 class="${MODULE_CLASSES.SELL_TITLE}">${name}</h3>
                  <p class="${MODULE_CLASSES.SELL_PRICE}">${price}₽</p>
                  <button type="button" class="${MODULE_CLASSES.BUTTON} ${MODULE_CLASSES.BUTTON_BUY} ${MODULE_CLASSES.BUTTON_SELL}">Купить</button>
                </article>              
            `;

        return liItem;
    };

    const render = arr => {
        arr.forEach(item => {
            crossSellList.append(createCrossSellItem(item));
        });
    };

    const createCrossSellList = ((goods = []) => {
        allGoods.push(...shuffle(goods));

        const fourItems = allGoods.splice(0, COUNT_ROW_GOODS);

        render(fourItems);
    });

    crossSellAdd.addEventListener('click', () => {
        render(allGoods);
        crossSellAdd.remove();
    });

    getData('cross-sell-dbase/dbase.json', createCrossSellList);
};

export default  renderCrossSell;