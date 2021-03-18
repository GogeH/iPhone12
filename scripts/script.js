'use strict';

import accordion from './accordion.js';
import nav from './nav.js';
import backToTop from './back-to-top.js';
import modal from './modal.js';
import progressBar from './progress-bar.js';
import renderCrossSell from './render-cross-sell.js';
import slider from './slider.js';
import tabs from './tabs.js';

document.addEventListener('DOMContentLoaded', () => {
    accordion();
    nav();
    backToTop();
    modal();
    renderCrossSell();
    progressBar();
    slider();
    tabs();
});
