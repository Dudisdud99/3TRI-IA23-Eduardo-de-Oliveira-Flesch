
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
