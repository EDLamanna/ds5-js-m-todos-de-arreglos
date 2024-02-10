const tareas = [
  { id: 1, tarea: "Sacar la basura", checkBox: false, Eliminar: true },
  { id: 2, tarea: "Colar pasta", checkBox: false, Eliminar: true },
  { id: 3, tarea: "Hacer tareas", checkBox: false, Eliminar: true },
];

const tareasInput = document.querySelector("#tareasInput");
const listaId = document.querySelector("#listaId");
const listaTareas = document.querySelector("#listaTarea");
const iconos = document.querySelector("#iconosUl");
const totalTareasRealizadas = document.querySelector("#totalTareasRealizadas");
const totalTareas = document.querySelector("#totalTareas");
const AgregarTareaBtn = document.querySelector("#AgregarTareaBtn");

const pintarId = () => {
  let html = "";
  for (const tarea of tareas) {
    html += `<li style="${tarea.checkBox ? "color: green;" : ""}">${tarea.id}</li>`;
  }
  listaId.innerHTML = html;
};

const pintarTarea = () => {
  let html = "";
  for (const tarea of tareas) {
    html += `<li style="${tarea.checkBox ? "color: green;" : ""}">${tarea.tarea}</li>`;
  }
  listaTareas.innerHTML = html;
};

const pintarCheckBox = () => {
  let html = "";
  for (const tarea of tareas) {
    html += `<li>
                      <label>
                          <input type="checkbox" ${
                            tarea.checkBox ? "checked" : ""
                          } data-id=${tarea.id}>
                          <button class="quitar" data-id=${tarea.id}>
                           X
                          </button>
                      </label>
                  </li>`;
  }
  iconos.innerHTML = html;
  actualizarTotalTareasRealizadas();
};

const contarTareasIngresadas = () => {
  return tareas.filter((tarea) => tarea.tarea.length > 0).length;
};

const actualizarContadorTareasIngresadas = () => {
  totalTareas.innerHTML = `Total tareas: <strong>${contarTareasIngresadas()}</strong>`;
};

const actualizarTotalTareasRealizadas = () => {
  const tareasRealizadas = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  ).length;
  totalTareasRealizadas.innerHTML = `Realizadas: <strong>${tareasRealizadas}</strong>`;
};

const obtenerUltimoId = () => {
  const ultimoId = tareas.length > 0 ? tareas[tareas.length - 1].id : 0;
  return ultimoId;
};

AgregarTareaBtn.addEventListener("click", () => {
  const nuevaTarea = tareasInput.value;
  if (nuevaTarea !== "") {
    const nuevoId = obtenerUltimoId() + 1;
    tareas.push({
      id: nuevoId,
      tarea: nuevaTarea,
      checkBox: false,
      Eliminar: true,
    });
    tareasInput.value = "";
    pintarId();
    pintarTarea();
    pintarCheckBox();
    actualizarContadorTareasIngresadas();
  }
});

iconos.addEventListener("click", (event) => {
  if (event.target.classList.contains("quitar")) {
    const id = parseInt(event.target.dataset.id);
    const indice = tareas.findIndex((item) => item.id === id);
    if (indice !== -1) {
      tareas.splice(indice, 1);
      pintarId();
      pintarTarea();
      pintarCheckBox();
      actualizarContadorTareasIngresadas();
      actualizarTotalTareasRealizadas();
    }
  }
});

iconos.addEventListener("change", (event) => {
  if (event.target.type === "checkbox") {
    const id = parseInt(event.target.dataset.id);
    const tarea = tareas.find((check) => check.id === id);
    if (tarea) {
      tarea.checkBox = event.target.checked;
      pintarTarea();
      pintarId()
    }
    actualizarTotalTareasRealizadas();
  }
});

pintarId();
pintarTarea();
pintarCheckBox();
actualizarContadorTareasIngresadas();
