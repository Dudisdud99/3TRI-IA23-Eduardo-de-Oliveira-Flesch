// document.body.style.setProperty('--color', 'green');

// const widthNav = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--width-main-nav'));

// const imgFundo = document.querySelector(".imgFundo");
// const imgFundoHeight = imgFundo.clientHeight;
// const degrade = document.querySelector(".degrade");
// const degradeHeight = degrade.clientHeight;

//  .style.top = imgFundoHeight //- degradeHeight + widthNav + "px";


// console.log(imgFundoHeight);

// -----------------------------------------------------------------------

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

btDialog.addEventListener("click", () => dialog.show())
btModal.addEventListener("click", () => dialog.showModal())

document.querySelectorAll("dialog button").forEach(
  bt => bt.addEventListener("click", () => dialog.close()))

  // ---------------------------------------------------------------------------------------------

// Crie um array com os caminhos das imagens
const imagens = [
  'assets/img/deathNote.webp',
  'assets/img/dr-stone.jpg',
  'assets/img/naruto.webp',
  'assets/img/dragon-ball-z.jpg'
];

// Referências aos elementos HTML
const imgFundo = document.querySelector('.imgFundo');
const carrocel = document.querySelector('.carrocel');

// Variável para rastrear a posição atual no carrossel
let posicaoAtual = 0;

// Função para atualizar a exibição da imagem no carrossel
function atualizarCarrossel() {
  // Verifica se a posição atual é válida
  if (posicaoAtual >= 0 && posicaoAtual < imagens.length) {
    imgFundo.src = imagens[posicaoAtual];
  }
}

// Função para navegar para a próxima imagem no carrossel
function proximaImagem() {
  posicaoAtual++;
  if (posicaoAtual >= imagens.length) {
    posicaoAtual = 0; // Volta para a primeira imagem se atingir o final
  }
  atualizarCarrossel();
}

// Configura um intervalo para trocar automaticamente as imagens a cada 5 segundos
setInterval(proximaImagem, 8000);

// Evento de clique no botão "Próxima Imagem"
carrocel.addEventListener('click', proximaImagem);
