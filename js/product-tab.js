const productTab = document.querySelector('.product-tab')
const productTabButtonList = productTab.querySelectorAll('button')

const TOP_HEADER_DESKTOP = 80 + 50 + 54
const TOP_HEADER_MOBILE = 50 + 40 + 40

let currentActiveTab = productTab.querySelector('.is-active')
let disableUpdating = false

function toggleActiveTab() {
  const tabItem = this.parentNode

  if (currentActiveTab !== tabItem) {
    disableUpdating = true
    tabItem.classList.add('is-active')
    currentActiveTab.classList.remove('is-active')
    currentActiveTab = tabItem

    setTimeout(() => {
      disableUpdating = false
    }, 1000)
  }
}

function scrollToTabPanel() {
  const tabPanelId = this.parentNode.getAttribute('aria-labelledby')
  const tabPanel = document.querySelector(`#${tabPanelId}`)

  const scrollAmount =
    tabPanel.getBoundingClientRect().top -
    (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP : TOP_HEADER_MOBILE)

  window.scrollBy({
    top: scrollAmount,
    behavior: 'smooth',
  })
}

productTabButtonList.forEach((button) => {
  button.addEventListener('click', toggleActiveTab)
  button.addEventListener('click', scrollToTabPanel)
})

// 사전정보: 각 tabPanel의 y축 위치(문서의 시작점에서부터 얼마나 아래에 있는지)
// 요소의 y축 위치 = window.scrollY + element.getBoundingClientRect().top
const productTabPanelIdList = [
  'product-spec',
  'product-review',
  'product-inquiry',
  'product-shipment',
  'product-recommendation',
]

const productTabPanelList = productTabPanelIdList.map((panelId) => {
  const tabPanel = document.querySelector(`#${panelId}`)
  return tabPanel
})

const productTabPanelPostionMap = {}

function detectTabPanelPosition() {
  // 각각의 tabPanel의 y축 위치를 찾는다
  // productTabPanelPostionMap에 그 값을 업데이트

  productTabPanelList.forEach((panel) => {
    const id = panel.getAttribute('id')
    const position = window.scrollY + panel.getBoundingClientRect().top
    productTabPanelPostionMap[id] = position
  })

  updateActiveTabOnScroll()
}

function updateActiveTabOnScroll() {
  if (disableUpdating) {
    return
  }

  // 1. 현재 유저가 얼마만큼 스크롤을 했느냐 => window.scrollY
  // 2. 각 tabPanel y축 위치 => productTabPanelPostionMap 통해 알 수 있음

  const scrolledAmount =
    window.scrollY +
    (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP + 80 : TOP_HEADER_MOBILE + 8)

  let newActiveTab
  if (scrolledAmount >= productTabPanelPostionMap['product-recommendation']) {
    newActiveTab = productTabButtonList[4] // 추천 버튼
  } else if (scrolledAmount >= productTabPanelPostionMap['product-shipment']) {
    newActiveTab = productTabButtonList[3] // 배송/환불 버튼
  } else if (scrolledAmount >= productTabPanelPostionMap['product-inquiry']) {
    newActiveTab = productTabButtonList[2] // 문의 버튼
  } else if (scrolledAmount >= productTabPanelPostionMap['product-review']) {
    newActiveTab = productTabButtonList[1] // 리뷰 버튼
  } else {
    newActiveTab = productTabButtonList[0] // 상품정보 버튼
  }

  // 추가: 끝까지 스크롤 한 경우에는 newActiveTab = productTabButtonList[4]
  // window.scrollY + window.innerHeight == body의 전체 height
  // window.innerWidth < 1200 - orderCta, 56px
  const bodyHeight =
    document.body.offsetHeight + (window.innerWidth < 1200 ? 56 : 0)
  if (window.scrollY + window.innerHeight == bodyHeight) {
    newActiveTab = productTabButtonList[4]
  }

  if (newActiveTab) {
    newActiveTab = newActiveTab.parentNode

    if (newActiveTab !== currentActiveTab) {
      newActiveTab.classList.add('is-active')
      if (currentActiveTab !== null) {
        currentActiveTab.classList.remove('is-active')
      }
      currentActiveTab = newActiveTab
    }
  }
}

window.addEventListener('load', detectTabPanelPosition)
window.addEventListener('resize', detectTabPanelPosition)
window.addEventListener('scroll', updateActiveTabOnScroll)
