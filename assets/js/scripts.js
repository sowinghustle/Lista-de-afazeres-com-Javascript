// Criando constantes que estão recebendos IDs do HTML
const botaoTarefa = document.querySelector("#botao-tarefa");
const input = document.querySelector("#tarefa-input");
const divConteudo = document.querySelector("#container-tarefas");

getLocalStorageItens().forEach(tarefa => {
  adicionarTarefa(tarefa.descricao);
});

function getLocalStorageItens (){
  const tarefasSalvas = localStorage.getItem("tarefas");
  if (tarefasSalvas != null){
    const listaTarefasSalva = JSON.parse(tarefasSalvas);
    return listaTarefasSalva;
  }
  return [];
}

// Criando a função 'Botao clique' e atribuindo os valores que ela receberá
function botaoClique() {
  if (input.value == ''){
    return;
  }
 const valorInput = input.value;
  // Definindo uma constante e declarando o valor dela como o VALUE da constante que criamos anteriormente
  adicionarTarefa(valorInput);
  const lista = getLocalStorageItens();
  lista.push({descricao:valorInput});
  localStorage.setItem("tarefas", JSON.stringify(lista));
}

function adicionarTarefa(valorInput) {
  const excluirTarefa = document.createElement("i");
  excluirTarefa.classList.add("botao-x", "fa-solid", "fa-x");
  excluirTarefa.addEventListener("click", function () {
    this.parentElement.remove();
   const itens = getLocalStorageItens();
   const novosItens = [];
   let jaRemovido = false;
   for (let item of itens) {
      if (item.descricao != valorInput || jaRemovido) {
       novosItens.push(item);   
      }
      else {
        jaRemovido = true;
      }
    }
    localStorage.setItem("tarefas" , JSON.stringify(novosItens))
  });

  const conteudoDoHtml = document.createElement("div");
  conteudoDoHtml.style.display = "flex";
  const inputdoHtml = document.createElement("input");
  inputdoHtml.classList.add("input-novo");
  inputdoHtml.type = "text";
  inputdoHtml.value = valorInput;
  inputdoHtml.readOnly = true;
  conteudoDoHtml.appendChild(inputdoHtml);
  conteudoDoHtml.appendChild(excluirTarefa);
  divConteudo.appendChild(conteudoDoHtml);

  document.getElementById("tarefa-input").value = "";
}

document.querySelector("form").addEventListener("submit", function(event){
  event.preventDefault()
});


const inputNovo = document.querySelector("#input-novo");
botaoTarefa.addEventListener("click", botaoClique);
