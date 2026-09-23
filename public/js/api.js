// Camada de acesso à API do backend (Express + MySQL, rota base "/list").
// Se o schema da tabela "activity" mudar, ajuste só este arquivo.

const DEFAULT_API_HOST = "http://localhost:3000";
const STORAGE_KEY = "task_tracker_api_host";

export const STATUS = {
  PENDING: 0,
  DONE: 1,
};

export function getApiHost() {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_API_HOST;
}

export function setApiHost(url) {
  localStorage.setItem(STORAGE_KEY, url.replace(/\/+$/, ""));
}

function listUrl(path = "") {
  return `${getApiHost()}/list${path}`;
}

async function request(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchActivities() {
  const data = await request(listUrl());
  return data.result ?? [];
}

export async function createActivity(description) {
  return request(listUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description, status: STATUS.PENDING }),
  });
}

export async function updateActivity(id, description, status) {
  return request(listUrl(`/${id}`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    // id incluído no corpo também, como precaução: o controller atual do
    // backend não repassa o :id da URL para o repository.update — ver README.
    body: JSON.stringify({ id, description, status }),
  });
}

export async function deleteActivity(id) {
  return request(listUrl(`/${id}`), { method: "DELETE" });
}
