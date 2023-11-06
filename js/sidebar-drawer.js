const drawerMenuButtonList = document.querySelectorAll(
  '.sidebar-nav .drawer-menu-button'
)

// drawerMenuButton을 감싸고 있는 drawer-menu한테 is-open 추가
function toggleDrawerMenu() {
  const drawerMenu = this.parentNode
  drawerMenu.classList.toggle('is-open')
}

drawerMenuButtonList.forEach(function (button) {
  button.addEventListener('click', toggleDrawerMenu)
})
