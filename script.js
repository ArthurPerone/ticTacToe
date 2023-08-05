function checkWinner() {
  const possibilidadesVitoria = [
    ["A1", "A2", "A3"], // Linha A
    ["B1", "B2", "B3"], // Linha B
    ["C1", "C2", "C3"], // Linha C
    ["A1", "B1", "C1"], // Coluna 1
    ["A2", "B2", "C2"], // Coluna 2
    ["A3", "B3", "C3"], // Coluna 3
    ["A1", "B2", "C3"], // Diagonal principal
    ["A3", "B2", "C1"] // Diagonal secundária
  ];

  // Verifica se alguma das possibilidades de vitória foi alcançada
  for (let i = 0; i < possibilidadesVitoria.length; i++) {
    const [pos1, pos2, pos3] = possibilidadesVitoria[i];

    if (
      //se a posição 1 não for vazia e for igual a posição 2 d igual a posição 3
      document.getElementById(pos1).textContent !== "" &&
      document.getElementById(pos1).textContent ===
        document.getElementById(pos2).textContent &&
      document.getElementById(pos2).textContent ===
        document.getElementById(pos3).textContent
    ) {
      return true; // Encontrou um vencedor
    }
  }
  return false; // Não encontrou um vencedor
}

function defineEmptyCells() {
  let emptyCells = [];
  //verifica linha
  for (let i = 1; i <= 3; i++) {
    //verifica coluna
    for (let j = 1; j <= 3; j++) {
      //define célula baseado na tabela ascii e no numero da coluna
      let cell = document.getElementById(String.fromCharCode(i + 64) + j);
      if (cell.innerHTML === "") {//se a célula estiver vazia
        emptyCells.push(cell); //coloca a célula no array de células vazias
      } else {
        cell.classList.add("disabled"); //senão desativa a célula
      }
    }
  }
  return emptyCells; //retorna a lista de células vazias
}

function computerPlay() {
  let emptyCells = defineEmptyCells(); //atualiza as células vazias
  if (emptyCells.length === 0) {
    //se não existir nenhuma célula no array de células vazias
    return; //não faz nada
  }
  let index = Math.floor(Math.random() * emptyCells.length); //sorteia uma casa vazia
  emptyCells[index].innerHTML = "O"; //marca com a letra O
}

function playerPlay(cell) {
  cell.innerHTML = "X"; // marca com a letra X
}

//verifica linha
for (let i = 1; i <= 3; i++) {
  //verifica coluna
  for (let j = 1; j <= 3; j++) {
    //define célula baseado na tabela ascii e no numero da coluna
    let cell = document.getElementById(String.fromCharCode(i + 64) + j);
    cell.addEventListener("click", () => {//se a célula for clicada
      playerPlay(cell);//marca um X na célula
      if (checkWinner()) {// verifica se alguém venceu
        alert("Você é o vencedor");// como só o player jogou antes é ele quem vence
        let tdList = document.querySelectorAll("td");//cria uma lista com todas as células
        for (let k = 0; k < tdList.length; k++) {
          tdList[k].classList.add("disabled");//marca todas as células como desativadas
        }
        return;
      }
      defineEmptyCells();
      computerPlay();//vez do computador jogar
      if (checkWinner()) {//verifica se alguém venceu
        alert("O computador é o vencedor");//como o a jogada do player já havia sido verificada, o unico que poderia ter vencido é o computador
        let tdList = document.querySelectorAll("td");//cria uma lista com todas as células
        for (let k = 0; k < tdList.length; k++) {
          tdList[k].classList.add("disabled");//desativa todas as células
        }
        return;
      }
    });
  }
}
