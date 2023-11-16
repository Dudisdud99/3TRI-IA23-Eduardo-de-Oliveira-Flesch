
const button = document.querySelector('.menu-button');
const nav = document.querySelector('.menu');
const icon = document.querySelector('.icon');

button.addEventListener('click', () => {
  button.classList.toggle('active');
  nav.classList.toggle('opened');
  icon.classList.toggle('active');
});
// ----------------------------------------------------------------------------------

const caixas = document.querySelectorAll('.caixa');
const dialog = document.querySelector("dialog")

caixas.forEach(caixa => {
  caixa.addEventListener('click', () => {
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  });
});

dialog.addEventListener('close', () => {
  document.body.style.overflow = ''; 
});
// --------------------------------------------

const imgFundo = document.querySelector('.imgFundo');
const degrade2 = document.querySelector('.degrade2');
const imgLogo = document.querySelector('.imgLogo>img');
const sinopse = document.querySelector('.carrocel p');


async function main() {

  const request = await fetch("assets/carrocel.json")
  const carrocel = await request.json()

  var imgFundoWidth = imgFundo.clientWidth;
  degrade2.style.width = `${imgFundoWidth}px`;

  let posicaoAtual = 0;

  function atualizarCarrossel() {
    const transicao = document.querySelector('.transicao');
    transicao.classList.add('darken');

    if (posicaoAtual >= 0 && posicaoAtual < carrocel.length) {
      imgFundo.onload = function () {
        imgFundoWidth = imgFundo.clientWidth;
        degrade2.style.width = `${imgFundoWidth}px`
      };

      transicao.addEventListener('transitionend', function () {
        transicao.classList.remove('darken');

        sinopse.innerHTML = carrocel[posicaoAtual].sinopse
        imgLogo.src = carrocel[posicaoAtual].imgLogo
        imgFundo.src = carrocel[posicaoAtual].imgAnime
      }, { once: true }); // Ouvinte que será chamado apenas uma vez
    }
  }

  // function atualizarCarrossel() {
  //   // Verifica se a posição atual é válida
  //   if (posicaoAtual >= 0 && posicaoAtual < carrocel.length) {
  //     imgFundo.onload = function () {
  //       imgFundoWidth = imgFundo.clientWidth;
  //       degrade2.style.width = `${imgFundoWidth}px`
  //     };

  //     sinopse.innerHTML = carrocel[posicaoAtual].sinopse
  //     imgLogo.src = carrocel[posicaoAtual].img
  //     imgFundo.src = imagens[posicaoAtual]
  //   }
  // }

  function proximaImagem() {
    posicaoAtual++;
    if (posicaoAtual >= carrocel.length) {
      posicaoAtual = 0;
    }
    atualizarCarrossel();
  }
  setInterval(proximaImagem, 4000);



  const indicadores = document.querySelectorAll('.indicador');

  function atualizarIndicadores() {
    indicadores.forEach(indicador => indicador.classList.remove('ativo'));
    indicadores[posicaoAtual].classList.add('ativo');
  }

  function proximaImagem() {
    posicaoAtual++;
    if (posicaoAtual >= carrocel.length) {
      posicaoAtual = 0;
    }
    atualizarCarrossel();
    atualizarIndicadores();
  }

  indicadores.forEach((indicador, index) => {
    indicador.addEventListener('click', () => {
      posicaoAtual = index;
      atualizarCarrossel();
      atualizarIndicadores();
    });
  });

  atualizarIndicadores();



  const carrocelThumb = document.querySelector('.carrocelThumb');

  window.moverCarrossel = function (direcao) {
    const caixaWidth = document.querySelector('.caixa').offsetWidth;
    const espacoEntreCaixas = 15;
    const elementosParaMover = 3;

    const scrollAmount = (caixaWidth + espacoEntreCaixas) * elementosParaMover;
    const currentPosition = carrocelThumb.scrollLeft;
    let newPosition;

    if (direcao === 1) {
      // Rolar para a direita
      newPosition = currentPosition + scrollAmount;
    } else {
      // Rolar para a esquerda
      newPosition = currentPosition - scrollAmount;
    }

    carrocelThumb.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  }



  // if (distanciaInicial < elementosVisiveis) {
  //   caixa.style.filter = 'brightness(1)';
  // } else {
  //   caixa.style.filter = 'brightness(0.2)';
  // }

  console.log(carrocel.length)
}

main()