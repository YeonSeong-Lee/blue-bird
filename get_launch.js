const fetch = require('node-fetch');
const cheerio = require('cheerio');
const schedule = require('node-schedule');

const url = 'http://psnest.kr/sub/sub05_05.php';

async function getLunchMenu() {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const today = new Date().getDay(); // 0 (일요일) ~ 6 (토요일)
    const menuRows = $('.food_list_box table tbody tr');

    let lunchMenu = '';
    menuRows.each((index, row) => {
      const dayOfWeek = $(row).find('th').text().trim();
      if (dayOfWeek.includes('중식') && index === today) {
        lunchMenu = $(row).find('td').text().trim();
      }
    });

    if (lunchMenu) {
      console.log(`오늘의 점심 메뉴: ${lunchMenu}`);
    } else {
      console.log('오늘의 점심 메뉴를 찾을 수 없습니다.');
    }

  } catch (error) {
    console.error('점심 메뉴 크롤링 중 오류 발생:', error);
  }
}

// 매일 오전 8시에 실행되도록 예약
schedule.scheduleJob('0 8 * * *', getLunchMenu); 
