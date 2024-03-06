const prev = document.querySelector('.btn_prev');
const next = document.querySelector('.btn_next');
const wrapper = document.querySelector('.wrapper');
const img = document.querySelectorAll('img');
const navigation = document.querySelector('.navigation');
const slides = Array.from(wrapper.querySelectorAll('img'));
const count  = slides.length;
let slideIndex = 0;


//Добавление кружков навигации
for (let i = 0; i < slides.length; i++) {
    navigation.innerHTML += `<figure data-index = ${i} class = "circle"></figure>`;
}


//Переключение кружков навигации
navigation.addEventListener('click', ({target}) => { 
    const circle = target.closest('figure');
    slideIndex = +circle.getAttribute('data-index');
    updateSlider();
})

//Смена слайдов
prev.addEventListener('click', showPreviousSlide);
next.addEventListener('click', showNextSlide);


// Функция для показа предыдущего слайда
function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + count) % count;
  updateSlider();
}

// Функция для показа следующего слайда
function showNextSlide() {
  slideIndex = (slideIndex + 1) % count;
  updateSlider();
}

// Функция для обновления отображения слайдера
function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

// Инициализация слайдера
updateSlider();


