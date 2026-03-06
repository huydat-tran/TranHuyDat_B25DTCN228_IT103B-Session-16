let tasks = [
  {
    id: 1,
    name: "Quét nhà",
  },
  {
    id: 2,
    name: "Giặt quần áo",
  },
];

const taskList = document.querySelector("#taskList");
const form = document.querySelector("#form");
const inputTask = document.querySelector("#taskInput");

const updateUI = () => {
  taskList.innerHTML = renderTask(tasks);
};

const renderTask = (tasks) => {
  if (!Array.isArray(tasks)) return "";

  return tasks
    .map((t) => {
      return `
    <li>${t.name}</li>
    `;
    })
    .join("");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formTask = e.target;
  const task = formTask.taskInput.value.trim();
  if (!task) alert("Yêu cầu nhập");
  else {
    newTask = {
      id: tasks.length + 1,
      name: task,
    };

    tasks.push(newTask);
  }
  updateUI();
  form.reset();
});
