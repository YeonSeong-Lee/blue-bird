
const fetchMenu = async() => {
  const today_menu = await window.versions.ping();
  // const today_menu_json = JSON.parse(today_menu);
  // console.log(today_menu_json);
  const launch_menu = today_menu["점심"];
  console.log(launch_menu);
  menu.innerText = launch_menu;
  // menu.innerText = JSON.stringify(today_menu."점심");
}

fetchMenu();
// const today_menu = window.versions.getLunchMenu();
// menu.innerText = today_menu;