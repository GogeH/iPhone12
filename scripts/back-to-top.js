'use strict';

const backToTop = () => {
    const backToTopButton = document.querySelector('.js-back-to-top');
    let timeOut;

    backToTopButton.addEventListener('click', () => {
        document.documentElement.scrollTop = 0;
    });

    window.addEventListener('scroll', () => {
        clearTimeout(timeOut);

        timeOut = setTimeout(() => {
            backToTopButton.classList.toggle('visually-hidden', document.documentElement.scrollTop < document.documentElement.clientHeight);
        }, 100);
    });
};

export default backToTop;