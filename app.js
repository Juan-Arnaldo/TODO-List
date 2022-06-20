const newTask = document.getElementById('text');
const list = document.getElementById('list');
const deleteAll = document.getElementById('clear-btn');
const checkbox = document.getElementById('1');

let array = [];

document.addEventListener('DOMContentLoaded', e => {
    loadLS();
    if(array.length > 0){
        array.forEach(e => {
            newHTML(e.text, e.id)
        });
    }
})

function loadLS () {
    if(localStorage.getItem('tasks')){
        array = JSON.parse(localStorage.getItem('tasks'));
    }
}

newTask.addEventListener('keypress', e => {
    const text = newTask.value;

    if(e.key === 'Enter'){
        e.preventDefault();
        newTask.value = ''

        newObj(text, array);
        saveLS(array);
    }
})



function saveLS (array) {
    localStorage.setItem('tasks', JSON.stringify(array));
}

function newObj(text, array) {
    let i;
    if(array.length === 0){
        i = 1;
    }else{
        i = array.length + 1;
    }

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


    //Create P
    const p = document.createElement('p');
    p.innerText = text;
    div.appendChild(p);

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
            console.log('entro');
            saveLS(array);
        }
    })
}

function remove(item) {
    item.remove()

    const id = array.findIndex(e => e.id == item.id)

    if(id >= 0){
        array.splice(id, 1);
        saveLS(array);
    }

}

function check(item, text) {
    const id = array.findIndex(e => e.id == item.id);

    if(array[id].validate === true){
        array[id].validate = false
        text.classList.remove('task-checked')
    }else{
        array[id].validate = true
        text.classList.add('task-checked')
        item.chec
    }
}
