import * as cheerio from 'https://cdn.jsdelivr.net/npm/cheerio@1.0.0-rc.10/+esm';

const url = 'http://psnest.kr/sub/sub05_05.php';

async function getLunchMenu() {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const today = new Date().getDay() - 1; // 0 (일요일) ~ 6 (토요일)
    const all_menu_items = [];
    let today_launch_menu = '';

    $('tr.time').each((rowIndex, rowElement) => {
      const mealTime = $(rowElement).find('th').text().trim(); // 식사 시간 (아침, 점심, 저녁)
      const menuCells = $(rowElement).find('td.hour.week'); // 요일별 메뉴 셀
  
      menuCells.each((dayIndex, cellElement) => {
        if (cellElement) { // Check if cellElement is not null
          const cellText = $(cellElement).text().trim();
          if (dayIndex === today) {
            today_launch_menu += `${mealTime}: ${cellText}\n`;
          }
        }
      });
    });

    return today_launch_menu || 'No menu available for today.';
  } catch (error) {
    console.error('Error fetching lunch menu:', error);
    throw error;
  }
}

getLunchMenu().then((menu) => {
  console.log(menu);
  setLunchMenu(menu);
  // const menuElement = document.getElementById('menu');
  // menuElement.innerText = menu;
});