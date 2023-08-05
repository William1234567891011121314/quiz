let jogando = true;

async function main() {
  const request = await fetch("quiz.json");
  const quiz = await request.json();
  const bigornahit = new Audio('./assets/bigornahit.ogg');
  const levelup = new Audio('./assets/levelup.ogg');
  const reiniciar = new Audio('./assets/reiniciar.ogg');

  let numeroDaPergunta = 0;
  let erros = 0;

  elAlternativas = document.querySelector(".alternativas");
  elPergunta = document.querySelector(".pergunta");
  popup = document.querySelector("#popup");
  let nperguntagui = document.querySelector("#numerodapergunta>h1");

  function carregarPergunta(nPergunta) {
    numeroDaPergunta.innerHTML = nPergunta
    if (nPergunta >= quiz.length) {
      elPergunta.innerHTML = "Acabou! Os seus resultados foram:";
      let acertos = quiz.length - erros;
      if(acertos<0){
        acertos = 0;
      }
      elAlternativas.innerHTML = `<p>Erros: ${erros}</p><p>Acertos: ${acertos}</p>`;
      return;
    }
    atualizarnumerodapergunta();
    elPergunta.innerHTML = quiz[nPergunta].pergunta;
    elAlternativas.innerHTML = "";
    quiz[nPergunta].alternativas.forEach(alt => elAlternativas.innerHTML += `<button>${alt}</button>`);
  }

  elAlternativas.addEventListener("click", ev => {
    const alternativaClicada = ev.target;
    const arrayAlternativas = [...elAlternativas.children];
    const numeroDaAlternativaClicada = arrayAlternativas.indexOf(alternativaClicada);
    if (numeroDaAlternativaClicada === quiz[numeroDaPergunta].resposta && jogando) {
      levelup.play();
      carregarPergunta(++numeroDaPergunta);
      return;
    }
    if (alternativaClicada.tagName !== "BUTTON") {
      return;
    }
    popup.innerHTML = '<button class="continuarbutton">Continuar</button><h1>ERRADO!</h1>';
    popup.style.display = "flex";
    erros++;
    bigornahit.play()
    jogando = false;
  })
  function atualizarnumerodapergunta() {
    nperguntagui.innerHTML = numeroDaPergunta+1;
  }
  popup.addEventListener("click", ev => {
    if (ev.target.classList.contains("continuarbutton")) {
      carregarPergunta(0);
      popup.style.display = "none";
      numeroDaPergunta = 0;
      atualizarnumerodapergunta();
      jogando = true;
      popup.innerHTML = '';
      reiniciar.play();
    }
  })

  carregarPergunta(0);
}

main();