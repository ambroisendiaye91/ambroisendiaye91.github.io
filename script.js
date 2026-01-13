const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Afficher les tâches
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="actions">
        <button class="complete">✔</button>
        <button>✖</button>
      </div>
    `;

    // Marquer comme terminée
    li.querySelector(".complete").addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
    });

    // Supprimer
    li.querySelector(".actions button:last-child").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
    });

    taskList.appendChild(li);
  });
}

// Sauvegarder
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Ajouter une tâche
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({ text, completed: false });
  taskInput.value = "";
  saveTasks();
});

// Ajouter avec Entrée
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTaskBtn.click();
});

// Initialisation
renderTasks();
