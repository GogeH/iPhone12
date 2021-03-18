const nav = () => {
  const MODULE_CLASSES = {
    ITEM: 'nav__item',
    LIST: 'nav__list',
    BURGER: 'nav__burger',
    BURGER_OPEN: 'nav__burger-open',
    BUTTON: 'button',
    BUTTON_BURGER: 'nav__burger-btn',
    BUTTON_BURGER_ACTIVE: 'nav__burger-btn_active',
    BURGER_LIST: 'nav__burger-list',
  };

  let lastWidthItems = 0;
  let burgerSize = 0;

  const init = () => {
    const menu = document.querySelector('.js-header-menu');
    const menuList = document.querySelector('.js-header-menu-list');
    const menuItems = document.querySelectorAll('.js-header-menu-item');
    const burgerMenu = document.querySelector('.js-header-menu-burger');

    menuItems.forEach((elem) => {
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
      console.log(1)
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

    burgerMenu.style.display = burgerItems.length ? '' : 'none';

    checkBurgerItems(burgerItems, burgerBtn);
  };

  const checkBurgerItems = (burgerItems, burgerBtn) => {
    burgerBtn.classList.add(
      burgerItems.length
        ? MODULE_CLASSES.BUTTON_BURGER_ACTIVE
        : MODULE_CLASSES.BUTTON_BURGER_ACTIVE
    );
  };

  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', () => {
      init();
    });
  }
};

export default nav;
