const MODULE_CLASSES = {
  DOTS: 'dots__item',
  DOTS_BUTTON: 'dots__button',
};

const slider = () => {
  const init = () => {
    const sliders = document.querySelectorAll('.js-slider');

    Array.from(sliders).forEach((slider) => {
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
      let movePosition = SLIDER_TO_SCROLL * itemWidth;
      let activeSlide = 0;
      let position = 0;
      let slidersCount = items.length;

      const updatePositionValue = (value) => {
        position = value;
      };

      const updateActiveSlide = (index) => {
        activeSlide = index;
      };

      const shiftRight = () => {
        if (activeSlide + 1 >= slidersCount) {
          return;
        }

        const itemRight = itemsCount - (Math.abs(position) + SLIDER_TO_SHOW * itemWidth) / itemWidth;

        updatePositionValue(position - (itemRight >= SLIDER_TO_SCROLL ? movePosition : itemRight * itemWidth));

        updateActiveSlide(activeSlide + 1);
        setPosition();
        disableButtons();
        changeActiveDot();
      };

      const shiftLeft = () => {
        if (activeSlide <= 0) {
          return;
        }

        const itemLeft = Math.abs(position) / itemWidth;

        updatePositionValue(position + (itemLeft >= SLIDER_TO_SCROLL ? movePosition : itemLeft * itemWidth));

        updateActiveSlide(activeSlide - 1);
        setPosition();
        disableButtons();
        changeActiveDot();
      };

      const changeItemsWidth = () => {
        itemWidth = slider.clientWidth / SLIDER_TO_SHOW;
        movePosition = SLIDER_TO_SCROLL * itemWidth;

        items.forEach((item) => {
          item.style.minWidth = `${itemWidth}px`;
        });

        updatePositionValue(-(itemWidth * activeSlide));
        setPosition();
      };

      if (btnPrev && btnNext) {
        btnNext.addEventListener('click', () => shiftRight());

        btnPrev.addEventListener('click', () => shiftLeft());
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
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < itemsCount; i++) {
          const dot = document.createElement('li');

          dot.classList.add(MODULE_CLASSES.DOTS);
          dot.innerHTML = `<button class="${MODULE_CLASSES.DOTS_BUTTON}" type="button"></button>`;
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

      changeItemsWidth();
      createDots();

      dots.forEach((item, index) => {
        item.addEventListener('click', () => {
          updateActiveSlide(index);
          updatePositionValue(-(itemWidth * index));
          setPosition();
          changeActiveDot();
          disableButtons();
        });
      });

      disableButtons();
      changeActiveDot();

      let lastWindowWidth;

      window.addEventListener('resize', () => {
        if (lastWindowWidth !== window.innerWidth) {
          changeItemsWidth();
          lastWindowWidth = window.innerWidth;
        }
      });

      const initSwipeHandlers = () => {
        slider.addEventListener('touchstart', handleTouchStart);
        slider.addEventListener('touchmove', handleTouchMove);

        let shiftStart = null;

        function handleTouchStart(event) {
          const firstTouch = event.touches[0];

          shiftStart = firstTouch.clientX;
        }

        function handleTouchMove(event) {
          if (!shiftStart) {
            return false;
          }

          const shiftEnd = event.touches[0].clientX;
          const shirt = shiftEnd - shiftStart;

          if (shirt < 0) {
            shiftRight();
          } else {
            shiftLeft();
          }

          shiftStart = null;
        }
      };

      initSwipeHandlers();
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



