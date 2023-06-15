/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable spaced-comment */
"use strict";
// this function is strict...

let form = document.querySelector('#form');
let input = document.querySelector('#taskInput');
let ul = document.querySelector('#tasksList');
let btnAllremove = document.querySelector('#removeDoneTasks');


form.addEventListener('submit', e => {
    e.preventDefault();
    addTask(input.value);
    input.value = '';
});

ul.addEventListener('click', e => {
    let currentEl = e.target;
    let currentTaskItem = currentEl.parentElement.parentElement;
    let valueOfDataAttr = currentEl.getAttribute('data-action');


    if (valueOfDataAttr == 'done') {
        currentEl.classList.toggle('btn-done-complete');
        toggleComplTask(currentTaskItem);
    }
    if (valueOfDataAttr == 'delete') {
        deleteTask(currentTaskItem);
    }
});

btnAllremove.addEventListener('click', deleteAllTasks);


function addTask(task) {
    let li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'task-item');
    li.innerHTML = `
                <span class="task-title">${task}</span>
                <div class="task-item__buttons">
                    <button type="button" data-action="done" class="btn-action">
                        <img src="./img/tick.svg" alt="Done" width="18" height="18">
                    </button>
                    <button type="button" data-action="delete" class="btn-action">
                        <img src="./img/cross.svg" alt="Done" width="18" height="18">
                    </button>
                </div>
    `;
    ul.append(li);
    setTitleStorage();
}


function deleteTask(task) {
    task.remove();
    setTitleStorage();
}

function toggleComplTask(task) {
    task.classList.toggle('task-title--done');
}


function deleteAllTasks() {
    let taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(el => {
        if (el.classList.contains('task-title--done')) {
            el.remove();
        }
    });
    setTitleStorage();
}

function getAllTitles() {
    let taskTitles = document.querySelectorAll('.task-title');
    let arrOfTitles = [];
    taskTitles.forEach(title => arrOfTitles.push(title.innerText));
    return JSON.stringify(arrOfTitles);
}

function setTitleStorage() {
    localStorage.setItem('titles', getAllTitles());
    checkEmptyStorage();
}

function checkEmptyStorage() {
    let emptyList = document.querySelector('.empty-list__title');   
    if (localStorage.getItem('titles') == '[]') {
        emptyList.innerText = 'Вы сделали все дела! Идите спать';
    } else {
        emptyList.innerText = 'Список дел';
    }
}


function renderTasks() {
    let titlesArr = JSON.parse(localStorage.getItem('titles'));
    titlesArr.forEach(title => {
        addTask(title);
    });
}

renderTasks();

