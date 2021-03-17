'use strict';

import accordion from './accordion.js';
import amenu from './amenu.js';
import backToTop from './back-to-top.js';
import modal from './modal.js';
import progressBar from './progress-bar.js';
import renderCrossSell from './renderCrossSell.js';
import slider from './slider.js';
import tabs from './tabs.js';

document.addEventListener('DOMContentLoaded', () => {
    accordion();
    amenu();
    backToTop();
    modal();
    renderCrossSell();
    progressBar();
    slider();
    tabs();
});
