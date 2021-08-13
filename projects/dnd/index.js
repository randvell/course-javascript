/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';
import { randomNumber } from '../../scripts/helper';

let current;
const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousemove', (e) => {
  if (current) {
    moveItem(current, e.pageX, e.pageY);
  }
});

function moveItem(element, x, y) {
  element.style.left = x - element.offsetWidth / 2 + 'px';
  element.style.top = y - element.offsetHeight / 2 + 'px';
}

document.addEventListener('mousedown', (e) => {
  const target = e.target;
  if (target.classList.contains('draggable-div')) {
    current = target;
  }
});

document.addEventListener('mouseup', () => {
  current = null;
});

export function createDiv() {
  const div = document.createElement('div');
  const width = randomNumber(0, 200);
  const height = randomNumber(0, 200);

  div.className = 'draggable-div';

  div.style.position = 'absolute';
  div.style.width = width + 'px';
  div.style.height = height + 'px';

  div.style.top = randomNumber(0, window.innerHeight - height) + 'px';
  div.style.left = randomNumber(0, window.innerWidth - width) + 'px';
  div.style.backgroundColor =
    'rgb(' +
    [randomNumber(0, 255), randomNumber(0, 255), randomNumber(0, 255)].join(', ') +
    ')';

  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
