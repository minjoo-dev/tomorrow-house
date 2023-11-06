const searhModal = document.querySelector('.search-modal')
const searchOverlay = document.querySelector('.overlay')
const searchButton = document.querySelector('.gnb-icon-button.is-search')
const searhModalCloseButton = searhModal.querySelector(
  '.search-modal-form .btn-ghost'
)

function openSearchModal() {
  searhModal.classList.add('is-active')
  searchOverlay.classList.add('is-active')
}

searchButton.addEventListener('click', openSearchModal)

function closeSearchModal() {
  searhModal.classList.remove('is-active')
  searchOverlay.classList.remove('is-active')
}

searhModalCloseButton.addEventListener('click', closeSearchModal)
