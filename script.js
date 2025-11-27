document.addEventListener('DOMContentLoaded', () => {
    // ==============================
    // ФИЛЬТРАЦИЯ ТОВАРОВ (products.html)
    // ==============================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterButtons.length && productCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                const category = this.getAttribute('data-category');

                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                productCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.classList.remove('hidden');
                        card.style.display = 'flex';
                    } else {
                        card.classList.add('hidden');
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ==============================
    // КНОПКИ "В КОРЗИНУ" (products.html)
    // ==============================
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    if (addToCartButtons.length) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function () {
                const productCard = this.closest('.product-card');
                const productName = productCard ? productCard.querySelector('h3')?.textContent : '';

                this.style.background = '#00ff88';
                this.textContent = 'Добавлено!';

                setTimeout(() => {
                    this.style.background = '';
                    this.textContent = 'В корзину';
                }, 2000);

                if (productName) {
                    console.log(`Товар "${productName}" добавлен в корзину`);
                }
            });
        });
    }

    // ==============================
    // FAQ (contacts.html)
    // ==============================
    const faqQuestions = document.querySelectorAll('.faq__question');

    if (faqQuestions.length) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const toggle = question.querySelector('.faq__toggle');

                const isOpen = answer.style.display === 'block';

                document.querySelectorAll('.faq__answer').forEach(a => a.style.display = 'none');
                document.querySelectorAll('.faq__toggle').forEach(t => t.textContent = '+');

                if (!isOpen) {
                    answer.style.display = 'block';
                    if (toggle) toggle.textContent = '-';
                }
            });
        });
    }

    // ==============================
    // МОДАЛЬНОЕ ОКНО - КОНТАКТНАЯ ФОРМА (contacts.html)
    // ==============================
    const modal = document.getElementById('contactModal');
    const openBtn = document.getElementById('openContactModal');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('contactForm');
    const notification = document.getElementById('notification');

    if (modal && openBtn && closeBtn && form && notification) {
        // Открыть модалку
        openBtn.addEventListener('click', () => {
            modal.showModal();
            const nameInput = document.getElementById('name');
            if (nameInput) nameInput.focus();
        });

        // Закрыть по кнопке
        closeBtn.addEventListener('click', () => {
            modal.close();
        });

        // Закрыть по клику на backdrop
        modal.addEventListener('click', (e) => {
            const rect = modal.getBoundingClientRect();
            if (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom
            ) {
                modal.close();
            }
        });

        // Закрыть по Escape
        modal.addEventListener('cancel', (e) => {
            e.preventDefault();
            modal.close();
        });

        // Отправка формы
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
            };

            console.log('Отправка данных:', data);

            // здесь можно добавить реальный fetch на сервер

            modal.close();
            form.reset();
            showNotification();
        });

        function showNotification() {
            notification.classList.add('visible');

            setTimeout(() => {
                notification.classList.remove('visible');
            }, 3000);
        }
    }
});
