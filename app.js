const newTask = document.getElementById('text');
const list = document.getElementById('list');
const btnDelete = document.getElementById('clear-btn');
const btnAll = document.getElementById('all');
const btnPending = document.getElementById('pending');
const btnCompleted = document.getElementById('completed');

let array = [];

document.addEventListener('DOMContentLoaded', e => {
    loadLS();
    if(array.length > 0){
        array.forEach(e => {
            newHTML(e.text, e.id)
        });
    }
})

//Event for new Task
newTask.addEventListener('keypress', e => {
    const text = newTask.value;

    if(e.key === 'Enter'){
        e.preventDefault();
        newTask.value = ''

        newObj(text);
        saveLS(array);
    }
})

//Event for Pending
btnPending.addEventListener('click', e => {
    activate(btnPending);
    showPending();
})

//Event for Completed
btnCompleted.addEventListener('click', e => {
    activate(btnCompleted);
    showCompleted();
})

//Event for All
btnAll.addEventListener('click', e => {
    activate(btnAll);
    showAll();
})

//Event for Remove
btnDelete.addEventListener('click', e => removeAll())

//Function to create new object
function newObj(text) {
    let i = Date.now();
    const obj = {
        id : i,
        validate : false,
        text : text
    }

    array.push(obj);
    newHTML(text, obj.id)

}

function newHTML (text, id) {
    //Create LI
    const li = document.createElement('li');
    li.classList.add('task')
    li.setAttribute('id', id);
    list.appendChild(li)

    //Create the first DIV
    const div = document.createElement('div');
    div.classList.add('d-task');
    li.appendChild(div)

    //Create INPUT
    const input = document.createElement('input');
    input.type = "checkbox";
    input.setAttribute('id', id);
    div.appendChild(input);
    if(array[array.findIndex(e => e.id === id)].validate === true){
        input.checked = true;
    }

    //Create P
    const p = document.createElement('p');
    p.innerText = text;
    div.appendChild(p);
    if(array[array.findIndex(e => e.id === id)].validate === true){
        p.classList.add('task-checked');
    }

    input.addEventListener('click', e => {
        check(input, p);
    })

    //Create the second DIV
    const div2 = document.createElement('div')
    div2.classList.add('d-task-btn');
    li.appendChild(div2);

    // Create the item for edit
    const i = document.createElement('i');
    i.classList.add('uil', 'uil-pen', 'task-btn');
    i.setAttribute('id', id);
    div2.appendChild(i);
    i.addEventListener('click', e => { 
        e.preventDefault();
        const aux = p.textContent;
        edit(aux, p, i);
    })

    //Create the item for delete
    const i2 = document.createElement('i');
    i2.classList.add('uil', 'uil-trash', 'task-btn')
    i2.setAttribute('id', id);
    div2.appendChild(i2)
    i2.addEventListener('click', e => {
        e.preventDefault();
        remove(li);
    })
    
}

//Load the content in Local Storage
function loadLS () {
    if(localStorage.getItem('tasks')){
        array = JSON.parse(localStorage.getItem('tasks'));
    }
}

//Save the content in Local Storage
function saveLS (array) {
    localStorage.setItem('tasks', JSON.stringify(array));
}

//Function to edit
function edit(aux, text, item) {
    text.innerText = '';
    const input = document.createElement('input');
    input.classList.add('task-text');
    text.appendChild(input);
    input.placeholder = 'New Task';
    input.value = aux

    input.addEventListener('keypress', e => {
        if(e.key === 'Enter'){
            e.preventDefault();
            text.innerText = input.value;
        }

        const id = array.findIndex(e => e.id == item.id)

        if(id >= 0){
            array[id].text = text.textContent;
            saveLS(array);
        }
    })
}

//Function to Remove 
function remove(item) {
    item.remove()

    const id = array.findIndex(e => e.id == item.id)

    if(id >= 0){
        array.splice(id, 1);
        saveLS(array);
    }

}
//Function to Check
function check(item, text) {
    const id = array.findIndex(e => e.id == item.id);

    if(array[id].validate === true){
        array[id].validate = false
        text.classList.remove('task-checked')
    }else{
        array[id].validate = true
        text.classList.add('task-checked')
    }
    saveLS(array)
    
}

//Function to view pending task
function showPending() {
    const pending = array.filter(e => e.validate === false)
    
    while(list.firstChild){
        list.removeChild(list.lastChild);
    }

    pending.forEach(e => newHTML(e.text, e.id));
} 

//Function to view Completed task
function showCompleted() {
    const completed = array.filter(e => e.validate)
    
    while(list.firstChild){
        list.removeChild(list.lastChild);
    }

    completed.forEach(e => newHTML(e.text, e.id));
}

//Function to view All task
function showAll() {
    while(list.firstChild){
        list.removeChild(list.lastChild);
    }

    array.forEach(e => newHTML(e.text, e.id));
}

//Function to activate
function activate(item) {
    const activate = document.querySelector('.active');
    activate.classList.remove('active');
    item.classList.add('active');
}

//Function to remove all 
function removeAll() {
    while(list.firstChild){
        list.removeChild(list.lastChild);
    }   

    array = [];
    saveLS(array);
}