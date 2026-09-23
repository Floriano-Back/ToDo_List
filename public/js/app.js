import {
  STATUS,
  STATUS_LIST,
  getApiHost,
  setApiHost,
  fetchActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from "./api.js";

const els = {
  status: document.getElementById("statusLine"),
  settingsBtn: document.getElementById("settingsBtn"),
  settingsPanel: document.getElementById("settingsPanel"),
  apiHostInput: document.getElementById("apiHostInput"),
  saveApiBtn: document.getElementById("saveApiBtn"),
  form: document.getElementById("taskForm"),
  descInput: document.getElementById("descInput"),
  list: document.getElementById("taskList"),
  empty: document.getElementById("emptyState"),
  error: document.getElementById("errorState"),
  tabs: document.getElementById("filterTabs"),
};

let activities = [];
let currentFilter = "all";

function setStatus(text) {
  els.status.textContent = text;
}

function showError(message) {
  els.error.textContent = message;
  els.error.classList.remove("hidden");
}

function clearError() {
  els.error.classList.add("hidden");
}

function filtered() {
  if (currentFilter === "all") return activities;
  return activities.filter(a => a.status === currentFilter);
}

function statusClass(status) {
  if (status === STATUS.DONE) return "done";
  if (status === STATUS.STOPPED) return "stopped";
  return "in-progress";
}

function render() {
  const rows = filtered();
  els.list.innerHTML = "";
  els.empty.classList.toggle("hidden", rows.length > 0);

  rows.forEach((activity, index) => {
    const li = document.createElement("li");
    li.className = "task-row";

    const num = document.createElement("span");
    num.className = "num";
    num.textContent = String(index + 1).padStart(2, "0");

    const body = document.createElement("div");
    body.className = "task-body";
    const desc = document.createElement("div");
    desc.className = "task-desc" + (activity.status === STATUS.DONE ? " done" : "");
    desc.textContent = activity.description ?? "(sem descrição)";
    body.appendChild(desc);

    const select = document.createElement("select");
    select.className = "status-select status-" + statusClass(activity.status);
    STATUS_LIST.forEach(value => {
      const opt = document.createElement("option");
      opt.value = value;
      opt.textContent = value;
      opt.selected = value === activity.status;
      select.appendChild(opt);
    });
    select.addEventListener("change", () => updateStatus(activity, select.value));

    const del = document.createElement("button");
    del.className = "task-delete";
    del.textContent = "excluir";
    del.addEventListener("click", () => removeActivity(activity));

    li.append(num, body, select, del);
    els.list.appendChild(li);
  });
}

async function loadActivities() {
  clearError();
  setStatus("carregando…");
  try {
    activities = await fetchActivities();
    render();
    setStatus(`conectado em ${getApiHost()} · ${activities.length} atividade(s)`);
  } catch (err) {
    activities = [];
    render();
    setStatus(`sem conexão com ${getApiHost()}`);
    showError(
      "Não foi possível carregar as atividades. Verifique se o backend está rodando, se o endereço em ⚙ está correto e se a tabela MySQL existe."
    );
  }
}

async function addActivity(description) {
  try {
    await createActivity(description);
    await loadActivities();
  } catch (err) {
    showError("Não foi possível criar a atividade — a descrição precisa ser única, talvez já exista uma igual.");
  }
}

async function updateStatus(activity, newStatus) {
  try {
    await updateActivity(activity.id, activity.description, newStatus);
    await loadActivities();
  } catch (err) {
    showError("Não foi possível atualizar a atividade (confira o bug de :id no backend — ver README).");
  }
}

async function removeActivity(activity) {
  try {
    await deleteActivity(activity.id);
    await loadActivities();
  } catch (err) {
    showError("Não foi possível excluir a atividade.");
  }
}

// --- Eventos ---

els.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const description = els.descInput.value.trim();
  if (!description) return;
  addActivity(description);
  els.descInput.value = "";
});

els.settingsBtn.addEventListener("click", () => {
  els.apiHostInput.value = getApiHost();
  els.settingsPanel.classList.toggle("hidden");
});

els.saveApiBtn.addEventListener("click", () => {
  const value = els.apiHostInput.value.trim();
  if (value) {
    setApiHost(value);
    els.settingsPanel.classList.add("hidden");
    loadActivities();
  }
});

els.tabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (!btn) return;
  currentFilter = btn.dataset.filter;
  [...els.tabs.children].forEach(t => t.classList.toggle("active", t === btn));
  render();
});

// --- Início ---
loadActivities();
