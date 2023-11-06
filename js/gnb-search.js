const gnbSearch = document.querySelector('.gnb-search')
const gnbSearchInput = gnbSearch.querySelector('input')
const gnbSearchHistory = gnbSearch.querySelector('.search-history')
const gnbSearchHistoryList = gnbSearchHistory.querySelector('ol')

const deleteAllButton = gnbSearchHistory.querySelector(
  '.search-history-header button'
)

const deleteButtonList = gnbSearchHistoryList.querySelectorAll('.delete-button')

function cloaseGnbSearhHistory() {
  gnbSearchHistory.classList.remove('is-active')
  window.removeEventListener('click', cloaseGnbSearhHistoryOnClickingOutside)
}

function cloaseGnbSearhHistoryOnClickingOutside(e) {
  if (!gnbSearch.contains(e.target)) {
    cloaseGnbSearhHistory()
  }
}

function openGnbSearhHistory() {
  if (gnbSearchHistoryList.children.length === 0) {
    return
  }

  if (!gnbSearchHistory.classList.contains('is-active')) {
    window.addEventListener('click', cloaseGnbSearhHistoryOnClickingOutside)
  }
  gnbSearchHistory.classList.add('is-active')
}

gnbSearchInput.addEventListener('focus', openGnbSearhHistory)

function deleteAllSearchHistoryItems() {
  gnbSearchHistoryList.innerHTML = ''
  cloaseGnbSearhHistory()
}

deleteAllButton.addEventListener('click', deleteAllSearchHistoryItems)

function deleteSearchHistofyItem(e) {
  e.stopPropagation()
  const itemToDelete = this.parentNode
  gnbSearchHistoryList.removeChild(itemToDelete)

  if (gnbSearchHistoryList.children.length === 0) {
    cloaseGnbSearhHistory()
  }
}

deleteButtonList.forEach((button) => {
  button.addEventListener('click', deleteSearchHistofyItem)
})
