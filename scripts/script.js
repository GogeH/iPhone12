'use strict';

import accordion from './accordion.js';
import backToTop from './back-to-top.js';
import modal from './modal.js';
import nav from './nav.js';
import progressBar from './progress-bar.js';
import renderCrossSell from './render-cross-sell.js';
import slider from './slider.js';
import tabs from './tabs.js';

document.addEventListener('DOMContentLoaded', () => {
    accordion();
    backToTop();
    modal();
    nav();
    renderCrossSell();
    progressBar();
    slider();
    tabs();
});
