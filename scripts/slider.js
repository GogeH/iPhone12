'use strict';

const slider = () => {
    const init = () => {
        const slidersElems = document.querySelectorAll('.js-slider');

        slidersElems.forEach((slider) => {
            const SLIDER_TO_SHOW = 1;
            const SLIDER_TO_SCROLL = 1;
            const list = slider.querySelector('.js-slider-list');
            const items = list.querySelectorAll('.js-slider-item');
            const btnPrev = slider.querySelector('.js-slider-arrow-left');
            const btnNext = slider.querySelector('.js-slider-arrow-right');
            const dotsContainer = slider.querySelector('.js-dots');
            const dots = [];
            const itemsCount = items.length;
            let itemWidth = slider.clientWidth / SLIDER_TO_SHOW;
            const movePosition = SLIDER_TO_SCROLL * itemWidth;
            let activeSlide = 0;
            let position = 0;

            items.forEach((item) => {
                item.style.minWidth = `${itemWidth}px`;
            });

            if (btnPrev && btnNext) {
                btnNext.addEventListener('click', () => {

                    const itemRight = itemsCount - (Math.abs(position) + SLIDER_TO_SHOW * itemWidth) / itemWidth;

                    position -= itemRight >= SLIDER_TO_SCROLL ? movePosition : itemRight * itemWidth;

                    activeSlide += 1;

                    setPosition();
                    disableButtons();
                    changeActiveDot();
                });

                btnPrev.addEventListener('click', () => {

                    const itemLeft = Math.abs(position) / itemWidth;

                    position += itemLeft >= SLIDER_TO_SCROLL ? movePosition : itemLeft * itemWidth;

                    activeSlide -= 1;

                    setPosition();
                    disableButtons();
                    changeActiveDot();
                });
            }

            const disableButtons = () => {
                if (!btnPrev || !btnNext) {
                    return;
                }

                btnPrev.disabled = position === 0;
                btnNext.disabled = position <= -(itemsCount - SLIDER_TO_SHOW) * itemWidth;
            };

            const setPosition = () => {
                list.style.transform = `translate(${position}px)`;
            };

            const createDots = () => {
                const MODULE_CLASSES = {
                    DOTS: 'dots__item',
                    DOTS_JS: 'js-dots__item',
                    DOTS_BUTTON: 'dots__button',
                    DOTS_BUTTON_JS: 'js-dots-button',
                };

                const fragment = document.createDocumentFragment();

                for (let i = 0; i < itemsCount; i++) {
                    const dot = document.createElement('li');

                    dot.classList.add(MODULE_CLASSES.DOTS);
                    dot.classList.add(MODULE_CLASSES.DOTS_JS);
                    dot.innerHTML = `<button class="${MODULE_CLASSES.DOTS_BUTTON} ${MODULE_CLASSES.DOTS_BUTTON_JS}" type="button"></button>`;
                    fragment.append(dot);
                    dots.push(dot);
                }

                dotsContainer.append(fragment);
            };

            const changeActiveDot = () => {
                const activeDot = dots.filter((dot) => dot.classList.contains('active'));

                if (activeDot[0]) {
                    activeDot[0].classList.remove('active');
                }

                dots[activeSlide].classList.add('active');
            };

            createDots();

            dots.forEach((item, index) => {
                item.addEventListener('click', () => {
                    position = -(itemWidth * index);
                    activeSlide = index;

                    setPosition();
                    changeActiveDot();
                    disableButtons();
                });
            });

            disableButtons();
            changeActiveDot();
        });
    };

    if (document.readyState === 'complete') {
        init();
    } else {
        document.onreadystatechange = () => {
            if (document.readyState === 'complete') {
                init();
            }
        }
    }
};

export default slider;
