const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')
    
//crirar lista
function criarLi(){
    const li = document.createElement('li')
    return li
}
// evevento de enter e Salvar Tarefa
inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        if (!inputTarefa.value) return
        criarTarefa(inputTarefa.value)
    }
})
// limpar Input e ter focus
function limpaInput(){
    inputTarefa.value = ''
    inputTarefa.focus()
}
// crirar Tarefa
function criarTarefa(txtInput){
    const li = criarLi()
    li.innerHTML = txtInput
    tarefas.appendChild(li)
    limpaInput()
    criaBotaoApagar(li)
    salvarTarefas()
}
// evento de click no botao
btnTarefa.addEventListener('click', function(){
    if (!inputTarefa.value) return
    criarTarefa(inputTarefa.value)
})
// criar botao apagar na lista
function criaBotaoApagar(li){
    li.innerText += ' '
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar')
    li.appendChild(botaoApagar)

}
// apagar tarefa lista com o botao
document.addEventListener('click', function(e){
    const el = e.target
    if(el.classList.contains('apagar')){
        el.parentElement.remove()
        salvarTarefas()
    }
})

//Salvar Tarefas no Storage do navegador
function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = []
    for( let tarefas of liTarefas){
        let tarefaTexto = tarefas.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaDeTarefas.push(tarefaTexto)
    }

    const tarefaJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefaJSON)
}

// Recarregar tarefa e transfomar JSON em Array salvo
function adicionaTarefaSalvas(){
    const tarefas = localStorage.getItem('tarefas')
    const listaDetarefas = JSON.parse(tarefas)

    for (let tarefas of listaDetarefas){
        criarTarefa(tarefas)
    }
}
adicionaTarefaSalvas()