const initialJson = '[{"id": 1,"name": "Йога","time": "10:00 - 11:00","maxParticipants": 15,"currentParticipants": 8},{"id": 2,"name": "Пилатес", "time": "11:30 - 12:30","maxParticipants": 10,"currentParticipants": 5},{"id": 3,"name": "Кроссфит","time": "13:00 - 14:00","maxParticipants": 20,"currentParticipants": 15},{"id": 4,"name": "Танцы","time": "14:30 - 15:30","maxParticipants": 12,"currentParticipants": 10},{"id": 5,"name": "Бокс","time": "16:00 - 17:00","maxParticipants": 8,"currentParticipants": 6}]';

const lsKey = 'lessons';

if (!localStorage.getItem(lsKey)) {
    localStorage.setItem(lsKey, initialJson);
}

const lessons = JSON.parse(localStorage.getItem(lsKey));
const container = document.querySelector('.container');
container.innerHTML = lessons.map(createLessonsHTML).join("");


function createLessonsHTML(lesson) {
    return `<div class="lesson" id ="${lesson.id}">
    <p class="name">${lesson.name}</p>
    <p class="time">${lesson.time}</p>
    <p>Максимальное количество участников:<span class="max_participants">${lesson.maxParticipants}</span></p>
    <p>Участников записано:<span class="current_participants" >${lesson.currentParticipants}</span></p>
    <button class="btn_sign_up">Записаться</button>
    <button class="btn_sign_cancel" disabled>Отменить запись</button>
</div>`
}

const sign_btn = document.querySelector('.btn_sign_up');

if (+document.querySelector('.max_participants').textContent <= +document.querySelector('.current_participants').textContent) {
    sign_btn.setAttribute('disabled', true);
}     //условие для блокировки кнопки записи (если в JSON максимальное колисество мест меньше или равно записавшимся)

container.addEventListener('click', ({target}) => {
    const divItem = target.closest("div");
    if (target.closest('.btn_sign_up')) {
        divItem.querySelector('.current_participants').textContent = `${++lessons[divItem.id-1].currentParticipants}`;
        divItem.querySelector('.btn_sign_up').setAttribute('disabled', true);// пользователь может записаться только один раз
        divItem.querySelector('.btn_sign_cancel').removeAttribute('disabled');
        localStorage.setItem(lsKey, JSON.stringify(lessons));
    }   
   
})

const cancel_btn = document.querySelector('.btn_sign_cancel');
container.addEventListener('click', ({target}) => {
    const divItem = target.closest("div");
    if (target.closest('.btn_sign_cancel')) {
        divItem.querySelector('.current_participants').textContent = `${--lessons[divItem.id-1].currentParticipants}`;
        divItem.querySelector('.btn_sign_cancel').setAttribute('disabled', true);
        localStorage.setItem(lsKey, JSON.stringify(lessons));
    }
})
