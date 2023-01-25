const form = document.querySelector("form");
const list = document.querySelector("ul");
const numberDone = document.getElementById("completed-number");

let tasks = [];
// let completedTasks=[];
// console.log(completed);
document.addEventListener('DOMContentLoaded', () =>{
    const container = document.querySelector('.todo');
    console.log(container);
})


form.addEventListener("submit", (event) =>{
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;

    // const input = form.elements;
    // console.log(input.value);
    const task = {
        title:title,
        description: description,
        date:date,
        id: Date.now(),
        complete: false
    };
    
    tasks.push(task);
    form.reset();
    dislayTasks();
    // console.log(tasks);
    setUpEventListeners()
});
function dislayTasks(){
    const taskContainer = document.getElementById('task-container');
    taskContainer.innerHTML ="";
    for(let i = 0; i<tasks.length; i++){
        const task = tasks[i];
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.setAttribute('id', task.id);
        taskElement.innerHTML = `
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <p>Expected completion date: ${task.date}</p>
          <button class="complete-btn" id=${task.id}complete>Complete</button>
          <button class="delete-btn" id=${task.id}delete>Delete</button>
          <button class="edit-btn" id=${task.id}edit>Edit</button>
        `;

        taskContainer.appendChild(taskElement);
    };

}

function setUpEventListeners(){
    const taskContainer = document.getElementById('task-container');
    for(let task of tasks){
        const currentTask = document.getElementById(task.id);

        // Listen for delete events
        const buttonElement = document.getElementById(`${task.id}delete`);
        buttonElement.addEventListener('click', () => {
            taskContainer.removeChild(currentTask);
            tasks = tasks.filter(elem => elem.id != task.id);
        })

        // Listen for edit events
        const editElement = document.getElementById(`${task.id}edit`);
        editElement.addEventListener('click', () => {
            const title = document.getElementById("title");
            const description = document.getElementById("description");
            const date = document.getElementById("date");
            title.value = task.title;
            description.value = task.description;
            date.value = task.date;
            taskContainer.removeChild(currentTask);
            tasks = tasks.filter(elem => elem.id != task.id);
        })

        // Listen for tasks marked as complete
        const completedTask = document.getElementById(`${task.id}complete`);
        // completedTasks.push(completedTask);
        completedTask.addEventListener('click', () => {
            tasks.forEach(elem => {
                if(elem.id == task.id){
                    elem.complete = true
                }
            });
            const noOfComplete = tasks.reduce((acc, curr) => {
                if(curr.complete){
                    acc++;
                }
                return acc;
            },0);
            console.log(noOfComplete, "khuihihk")
            const noOfCompleted = document.getElementById('completed-number');
            noOfCompleted.innerHTML = (`${noOfComplete}Tasks completed`)

        })


    }
};



