'use strict';

const progressBar = () => {
    const progressLine = document.querySelector('.progress-line');

    window.addEventListener('scroll', (e) => {
        setTimeout(() => {
            let scrollHeight = document.body.scrollTop || document.documentElement.scrollTop;
            let bodyHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let progressBar = scrollHeight / bodyHeight * 100;

            progressLine.style.width = `${progressBar}%`;
        }, 100);
    });
};

export default  progressBar;