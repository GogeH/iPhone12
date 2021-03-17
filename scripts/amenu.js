'use strict';

const amenu = () => {
    (() => {
        const MODULE_CLASSES = {
            ITEM: 'amenu__item',
            LIST: 'amenu__list',
            BURGER: 'amenu__burger',
            BURGER_OPEN: 'amenu__burger-open',
            BUTTON: 'button',
            BUTTON_BURGER: 'amenu__burger-btn',
            BUTTON_BURGER_ACTIVE: 'amenu__burger-btn_active',
            BURGER_LIST: 'amenu__burger-list',
        };

        let lastWidthItems = 0;
        let burgerSize = 0;

        const init = (menu, menuList, itemsMenu, burgerMenu) => {
            itemsMenu.forEach(elem => {
                elem.classList.add(MODULE_CLASSES.ITEM);
            });

            burgerMenu.classList.add(MODULE_CLASSES.BURGER);

            const [burgerBtn, burgerList] = createBurgerBlock(burgerMenu);

            updateMenu(menu, menuList, burgerMenu, burgerBtn, burgerList);

            window.addEventListener('resize', () => {
                updateMenu(menu, menuList, burgerMenu, burgerBtn, burgerList);
            });
        };


        const createBurgerBlock = (burgerMenu) => {
            const burgerBtn = document.createElement(MODULE_CLASSES.BUTTON);
            burgerMenu.append(burgerBtn);
            burgerBtn.classList.add(MODULE_CLASSES.BUTTON_BURGER);

            burgerBtn.addEventListener('click', () => {
                burgerMenu.classList.toggle(MODULE_CLASSES.BURGER_OPEN);
            });

            const burgerList = document.createElement('ul');
            burgerMenu.append(burgerList);
            burgerList.classList.add(MODULE_CLASSES.BURGER_LIST);

            return [burgerBtn, burgerList];
        };

        const updateMenu = (menu, menuList, burgerMenu, burgerBtn, burgerList) => {
            const menuItems = menuList.querySelectorAll(`.${MODULE_CLASSES.ITEM}`);
            const burgerItems = burgerList.querySelectorAll(`.${MODULE_CLASSES.ITEM}`);
            const widthMenu = menu.offsetWidth;

            burgerSize = burgerMenu.offsetWidth || burgerSize;
            const widthAllItems = [...menuItems].reduce((width, elem) => {
                return elem.offsetWidth + width + parseFloat(getComputedStyle(elem).marginRight)
            }, 0) + burgerSize;

            if (widthMenu < widthAllItems) {
                const lastItems = menuItems[menuItems.length - 1];
                if (lastItems) {
                    lastWidthItems = lastItems.offsetWidth;

                    burgerList.prepend(lastItems);
                    return updateMenu(menu, menuList, burgerMenu, burgerBtn, burgerList);
                }
            }

            if (widthMenu > widthAllItems + lastWidthItems * 2 && burgerItems.length) {
                const firstElem = burgerItems[0];
                menuList.append(firstElem);
                return updateMenu(menu, menuList, burgerMenu, burgerBtn, burgerList);
            }

            if (burgerItems.length) {
                burgerMenu.style.display = '';
            } else {
                burgerMenu.style.display = 'none';
            }

            checkBurgerItems(burgerItems, burgerBtn);
        };

        const checkBurgerItems = (burgerItems, burgerBtn) => {
            if (burgerItems.length) {
                burgerBtn.classList.add(MODULE_CLASSES.BUTTON_BURGER_ACTIVE);
            } else {
                burgerBtn.classList.remove(MODULE_CLASSES.BUTTON_BURGER_ACTIVE);
            }
        };

        window.amenu = (selectorMenu, selectorMenuList, selectorItemsMenu, selectorBurgerMenu) => {

            const menu = document.querySelector(selectorMenu),
                menuList = document.querySelector(selectorMenuList),
                itemsMenu = document.querySelectorAll(selectorItemsMenu),
                burgerMenu = document.querySelector(selectorBurgerMenu);

            init(menu, menuList, itemsMenu, burgerMenu);
        };

    })();

    // const amenuArgs = ['.js-header-menu', '.js-header-menu-list', '.js-header-menu-item', '.js-header-menu-burger'];
    //
    // if (document.readyState === 'complete') {
    //     amenu(...amenuArgs);
    // } else {
    //     window.addEventListener('load', () => {
    //         amenu(...amenuArgs);
    //     });
    // }
};

export default amenu;