// Фильтрация товаров
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Обновляем активную кнопку
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Фильтруем товары
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
    // FAQ функциональность
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    
    // Закрываем все другие FAQ
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').classList.remove('active');
        }
    });
    
    // Переключаем текущий FAQ
    faqItem.classList.toggle('active');
    answer.classList.toggle('active');
}

// Обработка формы
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Простая валидация
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const agree = document.getElementById('agree').checked;
            
            if (!name || !email || !message || !agree) {
                alert('Пожалуйста, заполните все обязательные поля и примите соглашение');
                return;
            }
            
            // Имитация отправки
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Отправляется...</span> ⏳';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});

    
    // Обработка кнопок "В корзину"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Анимация кнопки
            this.style.background = '#00ff88';
            this.textContent = 'Добавлено!';
            
            setTimeout(() => {
                this.style.background = '';
                this.textContent = 'В корзину';
            }, 2000);
            
            // Здесь можно добавить логику добавления в корзину
            console.log(`Товар "${productName}" добавлен в корзину`);
        });
    });
    
});
// Обработка отправки формы в модальном окне
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form__form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Валидация формы
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // Симуляция отправки формы
                const submitBtn = contactForm.querySelector('.contact-form__btn--submit');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '⌛ Отправка...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // Показываем успешное сообщение
                    alert('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
                    
                    // Закрываем модальное окно
                    const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
                    modal.hide();
                    
                    // Восстанавливаем кнопку
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Очищаем форму
                    contactForm.reset();
                }, 2000);
            }
        });
        
        // Обработка кнопки сброса
        const resetBtn = contactForm.querySelector('.contact-form__btn--reset');
        resetBtn.addEventListener('click', function() {
            if (confirm('Вы уверены, что хотите очистить форму?')) {
                contactForm.reset();
            }
        });
    }
    
    // Анимация для полей формы при фокусе
    const formInputs = document.querySelectorAll('.contact-form__form .form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});
// ========================================
// МОДАЛЬНОЕ ОКНО - КОНТАКТНАЯ ФОРМА
// ========================================

// Получаем элементы
const modal = document.getElementById('contactModal');
const openBtn = document.getElementById('openContactModal');
const closeBtn = document.getElementById('closeModal');
const form = document.getElementById('contactForm');
const notification = document.getElementById('notification');

// Открыть модальное окно
openBtn.addEventListener('click', () => {
  modal.showModal();
  // Фокус на первое поле формы
  document.getElementById('name').focus();
});

// Закрыть модальное окно через кнопку
closeBtn.addEventListener('click', () => {
  modal.close();
});

// Закрыть при клике на backdrop (тёмный фон)
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

// Закрыть по нажатию Escape
modal.addEventListener('cancel', (e) => {
  e.preventDefault();
  modal.close();
});

// Обработка отправки формы
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Получить данные формы
  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  };
  
  // Вывод в консоль для проверки
  console.log('Отправка данных:', data);
  
  // ========================================
  // ЗДЕСЬ ДОБАВЬТЕ КОД ДЛЯ ОТПРАВКИ НА СЕРВЕР
  // ========================================
  // Пример с FormSubmit.co:
  /*
  fetch('https://formsubmit.co/your-email@example.com', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Успешно отправлено:', data);
    showNotification();
  })
  .catch(error => {
    console.error('Ошибка:', error);
    alert('Ошибка при отправке сообщения');
  });
  */
  
  // Закрыть модальное окно
  modal.close();
  
  // Очистить форму
  form.reset();
  
  // Показать уведомление
  showNotification();
});

// Функция показа уведомления
function showNotification() {
  notification.classList.remove('hidden');
  
  // Автоматически скрыть через 3 секунды
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 3000);
}
