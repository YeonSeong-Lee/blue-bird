
const fetchMenu = async() => {
  const mon_launch = document.getElementById('mon-lunch');
  const tue_launch = document.getElementById('tue-lunch');
  const wed_launch = document.getElementById('wed-lunch');
  const thu_launch = document.getElementById('thu-lunch');
  const fri_launch = document.getElementById('fri-lunch');
  
  const all_menu = await window.versions.ping();
  const mon_menu = all_menu["월"];
  const tue_menu = all_menu["화"];
  const wed_menu = all_menu["수"];
  const thu_menu = all_menu["목"];
  const fri_menu = all_menu["금"];

  mon_launch.innerText = mon_menu.join('\n');
  tue_launch.innerText = tue_menu.join('\n');
  wed_launch.innerText = wed_menu.join('\n');
  thu_launch.innerText = thu_menu.join('\n');
  fri_launch.innerText = fri_menu.join('\n');
  
}

const resizeWindow = async() => {
  const table = document.getElementsByClassName('table-fill')[0];
  const w = table.scrollWidth;
  const h = table.scrollHeight;
  console.log(w, h);
  window.versions.resize(w, h);
}

// TODO: 순서 주의
await fetchMenu();
await resizeWindow();
