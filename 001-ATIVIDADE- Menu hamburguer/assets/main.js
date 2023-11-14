
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

window.onload = function () {
  atualizarCarrossel();
};



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

const imgFundo = document.querySelector('.imgFundo');
const degrade2 = document.querySelector('.degrade2');
const carrocel = document.querySelector('.carrocel');

var imgFundoWidth = imgFundo.clientWidth;
degrade2.style.width = `${imgFundoWidth}px`;

// Variável para rastrear a posição atual no carrossel
let posicaoAtual = 0;

function atualizarCarrossel() {
  // Verifica se a posição atual é válida
  if (posicaoAtual >= 0 && posicaoAtual < imagens.length) {
    imgFundo.onload = function () {
      // Use the 'load' event to ensure the image has been loaded
      imgFundoWidth = imgFundo.clientWidth;
      degrade2.style.width = `${imgFundoWidth}px`;
    };

    imgFundo.src = imagens[posicaoAtual];
    animeLogo.src = logos[posicaoAtual];
  }
}

function proximaImagem() {
  posicaoAtual++;
  if (posicaoAtual >= imagens.length) {
    posicaoAtual = 0; // Volta para a primeira imagem se atingir o final
  }
  atualizarCarrossel();
}

// Configura um intervalo para trocar automaticamente as imagens a cada 5 segundos
setInterval(proximaImagem, 4000);

// carrocel.addEventListener('click', proximaImagem);
