let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskList = document.getElementById("task-list"); // Assuming your HTML ul ID is "task-list"
const form = document.getElementById("task-form");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
 
function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : ""; // Apply 'completed' class for styling
        li.style.borderLeftColor = task.priority === "High" ? "red" :
                                   task.priority === "Medium" ? "orange" : "green";

        li.innerHTML = `
            <div>
                <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${index})">
                <strong>${task.title}</strong> - ${task.description || ""}
                <br><small>Due: ${task.dueDate || "No date"}</small>
            </div>
            <div>
                <button onclick="editTask(${index})">✏</button>
                <button onclick="deleteTask(${index})">🗑</button>
            </div>
        `;
        
        taskList.appendChild(li);
    });
}
const updateStatus = () =>{
    const completedTasks = tasks.filter(task=> task.completed).length
    const totalTasks = tasks.length
    const progress =( completedTasks/totalTasks ) * 100;
 const progressBar = document.getElementById('progress')
 
 progressBar.style.width = `${progress}%`;

 document.getElementById('numbers').innerText = `${completedTasks} / ${totalTasks}`;
 if(tasks.length && completedTasks === totalTasks){
    blaskConfetti();
 }
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const newTask = {
        title: form.title.value,
        description: form.description.value,
        priority: form.priority.value,
        dueDate: form["due-date"].value, // Access by name or ID if defined
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    form.reset();
    updateStatus();
   saveTasks(); 
});

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed; 
    console.log({tasks})// Toggle the completed status
    saveTasks();
    renderTasks();
    updateStatus();
    saveTasks();
}

function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
        updateStatus();
        saveTasks();
    }
}

function editTask(index) {
    const task = tasks[index];
    // Prompt for each field, pre-filling with current value
    const title = prompt("Edit title", task.title);
    const desc = prompt("Edit description", task.description);
    const priority = prompt("Edit priority (Low, Medium, High)", task.priority);
    const dueDate = prompt("Edit due date (YYYY-MM-DD)", task.dueDate);

    // Only update if prompt was not cancelled (null)
    if (title !== null) tasks[index].title = title;
    if (desc !== null) tasks[index].description = desc;
    if (priority !== null) tasks[index].priority = priority;
    if (dueDate !== null) tasks[index].dueDate = dueDate;

    saveTasks();
    renderTasks();
    updateStatus();
    saveTasks();
}

// Initial render when the page loads
renderTasks(); 

const blaskConfetti = ()=>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}