const BtnCriarTarefa = document.getElementById('criar-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');
const input = document.getElementById('texto-tarefa');
const btnApagaTudo = document.getElementById('apaga-tudo');
const btnApagaFinalizados = document.getElementById('remover-finalizados');
const btnSalvaTarefas = document.getElementById('salvar-tarefas');
const btnApagaSelecionado = document.getElementById('remover-selecionado');
const btnUp = document.getElementById('mover-cima');
const btnDown = document.getElementById('mover-baixo');

function observaTarefas() {
  const listaTarefasFilhos = document.querySelector('#lista-tarefas').children;
  for (let i = 0; i < listaTarefasFilhos.length; i += 1) {
    listaTarefasFilhos[i].addEventListener('click', tarefaClicked);
    listaTarefasFilhos[i].addEventListener('dblclick', tarefaCompleta);
  }
  return listaTarefasFilhos;
}

function tarefaClicked(evento) {
  const lista = observaTarefas();
  for (let i = 0; i < lista.length; i += 1) {
    lista[i].classList.remove('selected');
  }
  evento.target.classList.add('selected');
  btnApagaSelecionado.addEventListener('click', removeSelecionado);
}

function addTask() {
  const tarefa = document.createElement('li');
  tarefa.innerText = input.value;
  listaTarefas.appendChild(tarefa);
  input.value = '';
  observaTarefas();
}

function tarefaCompleta(evento) {
  if (evento.target.classList.contains('completed')) {
    evento.target.classList.remove('completed');
  } else {
    evento.target.classList.add('completed');
  }
}

function apagaTudo() {
  while (listaTarefas.firstChild) {
    listaTarefas.removeChild(listaTarefas.firstChild);
  }
}

function apagaFinalizados() {
  for (let i = listaTarefas.children.length - 1; i > 0; i -= 1) {
    if (listaTarefas.children[i].classList.contains('completed')) {
      listaTarefas.removeChild(listaTarefas.children[i]);
    }
  }
}

function salvaTarefas() {
  localStorage.clear();
  for (let i = 0; i < listaTarefas.children.length; i += 1) {
    if (listaTarefas.children[i].classList.contains('completed')) {
      const tarefaConcluida = listaTarefas.children[i].textContent + '*';
      localStorage.setItem(i, tarefaConcluida);
    } else {
      localStorage.setItem(i, listaTarefas.children[i].textContent);
    }
  }
}

function carregaTarefas() {
  for (let i = 0; i < localStorage.length; i += 1) {
    const verificador = localStorage.getItem(i).split('');
    let unindo = '';
    const ultimoCarac = verificador.length - 1;
    if (verificador[ultimoCarac] === '*') {
      for (let j = 0; j < verificador.length - 1; j += 1) {
        unindo = unindo + verificador[j];
      }
      const tarefa = document.createElement('li');
      tarefa.innerText = unindo;
      tarefa.className = 'completed';
      listaTarefas.appendChild(tarefa);
    } else {
      const tarefa = document.createElement('li');
      tarefa.innerText = localStorage.getItem(i);
      listaTarefas.appendChild(tarefa);
    }
  }
  observaTarefas();
}

function removeSelecionado() {
  for (let i = listaTarefas.children.length - 1; i > 0; i -= 1) {
    if (listaTarefas.children[i].classList.contains('selected')) {
      listaTarefas.removeChild(listaTarefas.children[i]);
    }
  }
}

function sobeItem() {
  const tarefaSelecionada = document.querySelector('.selected');
  if (
    tarefaSelecionada == null ||
    tarefaSelecionada.previousElementSibling == null
  ) {
    return false;
  }
  listaTarefas.insertBefore(
    tarefaSelecionada,
    tarefaSelecionada.previousElementSibling
  );
}

function desceItem() {
  const tarefaSelecionada = document.querySelector('.selected');
  if (
    tarefaSelecionada == null ||
    tarefaSelecionada.nextElementSibling == null
  ) {
    return false;
  }
  listaTarefas.insertBefore(
    tarefaSelecionada.nextElementSibling,
    tarefaSelecionada
  );
}

function start() {
  carregaTarefas();

  BtnCriarTarefa.addEventListener('click', addTask);
  btnApagaTudo.addEventListener('click', apagaTudo);
  btnApagaFinalizados.addEventListener('click', apagaFinalizados);
  btnSalvaTarefas.addEventListener('click', salvaTarefas);
  btnUp.addEventListener('click', sobeItem);
  btnDown.addEventListener('click', desceItem);
}

window.onload = start;