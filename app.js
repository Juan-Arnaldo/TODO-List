const newTask = document.getElementById('text');
const list = document.getElementById('list');
const deleteAll = document.getElementById('clear-btn');


newTask.addEventListener('keypress', e => {
    if(e.key === "Enter"){
        e.preventDefault();
        const userTask = newTask.value;
        newTask.value = ''
        newHTML(userTask);
        
    }
})

// Generate the HTML
function newHTML(task){

    // Create the li
    const li = document.createElement('li');
    li.classList.add('task');
    list.appendChild(li);

    // Create the first div
    const div = document.createElement('div');
    div.classList.add('d-task');
    li.appendChild(div);

    // Create the input
    const input = document.createElement('input');
    input.type = 'checkbox';
    div.appendChild(input);

    // Create the p
    const p = document.createElement('p');
    p.innerText = task;
    div.appendChild(p);
    
    //create the second div
    const div2 = document.createElement('div');
    div2.classList.add('d-task-btn');
    li.appendChild(div2)

    // Create the item Edit
    const editBtn = document.createElement('i');
    editBtn.classList.add('uil', 'uil-pen', 'task-btn');
    div2.appendChild(editBtn)
    editBtn.addEventListener('click', e => {
        e.preventDefault()
        const aux = p.textContent;
        console.log(aux)
        editTask(p, aux);
    })

    // Create the item trash
    const deleteBtn = document.createElement('i');
    deleteBtn.classList.add('uil', 'uil-trash', 'task-btn');
    div2.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', e => {
        e.preventDefault();
        deleteTask(li);
    })
}

// edit task
function editTask (item, text) {

    //new input for edit
    const input = document.createElement('input');
    input.classList.add('task-text');
    input.placeholder = 'New task';
    input.value = text;

    item.innerText = '';
    item.appendChild(input);

    input.addEventListener('keypress', e => {
        if(e.key === 'Enter'){
            e.preventDefault();
            item.innerText = input.value;
        }
    })

}

// remove task
function deleteTask (item) {
    item.remove();
}
