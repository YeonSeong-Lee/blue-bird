const menu = document.getElementById('menu');

const fetchMenu = async() => {
  const today_menu = await window.versions.ping();
  menu.innerText = today_menu;
}

fetchMenu();
// const today_menu = window.versions.getLunchMenu();
// menu.innerText = today_menu;