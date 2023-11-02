const gnbSearch = document.querySelector('.gnb-search')
const gnbSearchInput = gnbSearch.querySelector('input')
const gnbSearchHistory = gnbSearch.querySelector('.search-history')

function cloaseGnbSearhHistory(e) {
  console.log('1111')
  if (!gnbSearch.contains(e.target)) {
    gnbSearchHistory.classList.remove('is-active')
    window.removeEventListener('click', cloaseGnbSearhHistory)
  }
}

function openGnbSearhHistory() {
  if (!gnbSearchHistory.classList.contains('is-active')) {
    window.addEventListener('click', cloaseGnbSearhHistory)
  }
  gnbSearchHistory.classList.add('is-active')
}

gnbSearchInput.addEventListener('focus', openGnbSearhHistory)
