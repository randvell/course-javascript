/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns.html

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

import './towns.html';
import { loadAndSortTowns } from './functions';

const homeworkContainer = document.querySelector('#app');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
  setLoadingState();
  return loadAndSortTowns()
    .then((towns) => {
      setLoadedState();
      return towns;
    })
    .then((towns) => Promise.resolve(towns))
    .catch(() => setErrorState());
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
  return full.toLowerCase().includes(chunk.toLowerCase());
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с надписью "Не удалось загрузить города" и кнопкой "Повторить" */
const loadingFailedBlock = homeworkContainer.querySelector('#loading-failed');
/* Кнопка "Повторить" */
const retryButton = homeworkContainer.querySelector('#retry-button');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

window.addEventListener('load', (event) => {
  loadTowns();
});

retryButton.addEventListener('click', () => {
  setLoadingState();
  return loadTowns();
});

filterInput.addEventListener('input', () => {
  filterResult.innerHTML = '';

  const chunk = filterInput.value;
  if (chunk) {
    loadTowns()
      .then((towns) => towns.filter((town) => isMatching(town.name, chunk)))
      .then((towns) => fetchTowns(towns));
  }
});

function fetchTowns(towns) {
  if (!Array.isArray(towns)) {
    return;
  }

  towns.forEach((town) => {
    const cityElement = document.createElement('div');
    cityElement.textContent = town.name;
    filterResult.appendChild(cityElement);
  });
}

function setLoadingState() {
  loadingFailedBlock.style.visibility = 'hidden';
  loadingBlock.style.visibility = 'visible';
}

function setErrorState() {
  loadingFailedBlock.style.visibility = 'visible';
  loadingBlock.style.visibility = 'hidden';
}

function setLoadedState() {
  loadingFailedBlock.style.visibility = 'hidden';
  loadingBlock.style.visibility = 'hidden';
}

export { loadTowns, isMatching };
