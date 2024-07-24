import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import schedule from 'node-schedule';

const url = 'http://psnest.kr/sub/sub05_05.php';

async function getLunchMenu() {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const today = new Date().getDay(); // 0 (일요일) ~ 6 (토요일)
    const all_menu_items = [];

    $('tr.time').each((rowIndex, rowElement) => {
      const mealTime = $(rowElement).find('th').text().trim(); // 식사 시간 (아침, 점심, 저녁)
      const menuCells = $(rowElement).find('td.hour.week'); // 요일별 메뉴 셀
  
      menuCells.each((dayIndex, cellElement) => {
        const cellText = $(cellElement).text().trim();
        if (cellText) { // 빈 셀은 제외
          const menuItems = cellText.split('<br>').map(item => item.trim());
          all_menu_items.push({
            mealTime: mealTime,
            day: dayIndex, // 0 (월) ~ 6 (일)
            menu: menuItems
          });
        }
      });
    });
    console.log('all_menu_items:', all_menu_items);
    console.log('launch menu:', all_menu_items.filter(item => item.mealTime === '점심'));
  } catch (error) {
    console.error('오류 발생:', error);
  }
} 

// 매일 오전 8시에 실행되도록 예약
// schedule.scheduleJob('0 8 * * *', getLunchMenu);

getLunchMenu()
