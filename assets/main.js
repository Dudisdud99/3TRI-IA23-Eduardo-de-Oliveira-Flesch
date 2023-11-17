
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
const fechar = document.querySelector(".fechar")

caixas.forEach(caixa => {
  caixa.addEventListener('click', () => {
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  });
});

dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
});

fechar.addEventListener("click", () => dialog.close())

// --------------------------------------------

const imgFundo = document.querySelector('.imgFundo');
const degrade2 = document.querySelector('.degrade2');
const imgLogo = document.querySelector('.imgLogo>img');
const sinopse = document.querySelector('.carrocel p');
const carrocelThumb = document.querySelector('.carrocelThumb');

const duracaoIntervalo = 4000

let posicaoAtual = 0;
let intervalIdCarrossel;

async function main() {
  const request = await fetch("assets/carrocel.json");
  const carrocel = await request.json();
  const indicadores = document.querySelectorAll('.indicador');

  async function preCarregarImagens() {
    const imagensPreCarregadas = [];

    for (let i = 0; i < carrocel.length; i++) {
      const img = new Image();
      img.src = carrocel[i].imgAnime;
      const imgLogo = new Image();
      imgLogo.src = carrocel[i].imgLogo;

      await Promise.all([img.decode(), imgLogo.decode()]);

      imagensPreCarregadas.push({ img, imgLogo });
    }

    return imagensPreCarregadas;
  }

  const imagensPreCarregadas = await preCarregarImagens();

  var imgFundoWidth = imgFundo.clientWidth;
  degrade2.style.width = `${imgFundoWidth}px`;

  imgFundo.onload = function () {
    imgFundoWidth = imgFundo.clientWidth;
    degrade2.style.width = `${imgFundoWidth}px`
  };

  function proximaImagemCarrossel() {
    posicaoAtual++;
    if (posicaoAtual >= carrocel.length) {
      posicaoAtual = 0;
    }
    atualizarCarrossel();
    atualizarIndicadores();
  }

  function iniciarIntervaloCarrossel() {
    intervalIdCarrossel = setInterval(proximaImagemCarrossel, duracaoIntervalo);
  }

  function atualizarIndicadores() {
    indicadores.forEach(indicador => indicador.classList.remove('ativo'));
    indicadores[posicaoAtual].classList.add('ativo');
  }

  function atualizarCarrossel() {
    const transicao = document.querySelector('.transicao');
    transicao.classList.add('darken');

    if (posicaoAtual >= 0 && posicaoAtual < carrocel.length) {
      transicao.addEventListener('transitionend', function () {
        transicao.classList.remove('darken');
        sinopse.innerHTML = carrocel[posicaoAtual].sinopse;
        imgLogo.src = carrocel[posicaoAtual].imgLogo;
        imgFundo.src = carrocel[posicaoAtual].imgAnime;
      }, { once: true });
    }
  }


  indicadores.forEach((indicador, index) => {
    indicador.addEventListener('click', () => {
      posicaoAtual = index;
      clearInterval(intervalIdCarrossel);
      iniciarIntervaloCarrossel();
      atualizarCarrossel();
      atualizarIndicadores();
    });
  });

  iniciarIntervaloCarrossel();
  atualizarIndicadores();
}

main();

function moverCarrocel(direcao) {
  const caixaWidth = document.querySelector('.caixa').offsetWidth;
  const espacoEntreCaixas = 15;
  const elementosParaMover = 3;

  const scrollAmount = (caixaWidth + espacoEntreCaixas) * elementosParaMover;
  const currentPosition = carrocelThumb.scrollLeft;
  let newPosition;

  if (direcao === 1) {
    newPosition = currentPosition + scrollAmount;
  } else {
    newPosition = currentPosition - scrollAmount;
  }

  carrocelThumb.scrollTo({
    left: newPosition,
    behavior: 'smooth'
  });
}
