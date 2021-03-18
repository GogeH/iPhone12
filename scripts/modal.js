const modal = () => {
    const cardDetailsButtonBuy = document.querySelectorAll('.js-button');
    const modal = document.querySelector('.js-modal');
    const cardDetailsTitle = document.querySelector('.js-card-title');
    const modalTitle = modal.querySelector('.js-modal-title');
    const modalTitleSubmit = modal.querySelector('.js-modal-title-submit');

    const showModal = () => {
        modal.classList.add('open');
        document.body.style.overflowY = 'hidden';
        modalTitle.textContent = cardDetailsTitle.textContent;
        modalTitleSubmit.value = cardDetailsTitle.textContent;
    };

    const hideModal = () => {
        modal.classList.remove('open');
        document.body.style.overflowY = '';
    };

    cardDetailsButtonBuy.forEach((btn) => {
        btn.addEventListener('click', () => {
            const modalDelivery = document.querySelector('.js-modal-subtitle');

            if (btn.classList.contains('js-button-delivery')) {
                modalDelivery.innerHTML = 'Доставка и оплата';
            } else {
                modalDelivery.innerHTML = 'Оплата';
            }

            showModal();
        });
    });

    modal.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('js-modal-close') || !target.closest('.js-modal-block')) {
            hideModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') { // event.code
            if (modal.classList.contains('open')) {
                event.preventDefault();
                hideModal();
            }
        }
    });

    modal.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('js-modal-close')) {
            hideModal();
        }
    });
};

export default modal;