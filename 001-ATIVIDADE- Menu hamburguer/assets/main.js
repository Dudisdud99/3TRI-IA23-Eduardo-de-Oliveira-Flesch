
const button = document.querySelector('.menu-button');
const nav = document.querySelector('.menu');
const icon = document.querySelector('.icon');

button.addEventListener('click', () => {
  button.classList.toggle('active');
  nav.classList.toggle('opened');
  icon.classList.toggle('active');
});
// ----------------------------------------------------------------------------------

const btDialog = document.querySelector(".bt-dialog")
const btModal = document.querySelector(".bt-modal")
const dialog = document.querySelector("dialog")


// --------------------------------------------

const imgFundo = document.querySelector('.imgFundo');
const degrade2 = document.querySelector('.degrade2');
const imgLogo = document.querySelector('.imgLogo>img');
const sinopse = document.querySelector('.carrocel p');


async function main() {

  const request = await fetch("assets/carrocel.json")
  const carrocel = await request.json()

  // Crie um array com os caminhos das imagens
  const imagens = [
    'assets/img/deathNote.webp',
    'assets/img/dr-stone.jpg',
    'assets/img/naruto.webp',
  ];

  const logos = [
    'assets/img/deathNote-logo.png',
    'assets/img/Dr._Stone_logo.webp',
    'assets/img/naruto-logo.png',
  ];


  var imgFundoWidth = imgFundo.clientWidth;
  degrade2.style.width = `${imgFundoWidth}px`;

  // Variável para rastrear a posição atual no carrossel
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
        imgLogo.src = carrocel[posicaoAtual].img
        imgFundo.src = imagens[posicaoAtual]
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
      posicaoAtual = 0; // Volta para a primeira imagem se atingir o final
    }
    atualizarCarrossel();
  }

  // Configura um intervalo para trocar automaticamente as imagens a cada 5 segundos
  setInterval(proximaImagem, 4000);

  // carrocel.addEventListener('click', proximaImagem);
}

main()