
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

  const today = new Date().toLocaleDateString('kr', { weekday: 'long' });
  console.log(today);
  switch (today) {
    case '월요일':
      mon_launch.style.fontWeight = 'bold';
      document.getElementById('mon-bottom').style.backgroundColor = 'red';
      break;
    case '화요일':
      tue_launch.style.fontWeight = 'bold';
      document.getElementById('tue-bottom').style.backgroundColor = 'red';
      break;
    case '수요일':
      wed_launch.style.fontWeight = 'bold';
      document.getElementById('wed-bottom').style.backgroundColor = 'red';
      break;
    case '목요일':
      thu_launch.style.fontWeight = 'bold';
      document.getElementById('thu-bottom').style.backgroundColor = 'red';
      break;
    case '금요일':
      fri_launch.style.fontWeight = 'bold';
      document.getElementById('fri-bottom').style.backgroundColor = 'red';
      break;
    default:
      break;
  }
  
}

fetchMenu();
