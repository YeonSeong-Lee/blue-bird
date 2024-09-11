const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path')
const cheerio = require('cheerio');

const url = 'http://psnest.kr/sub/sub05_05.php';

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1050,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  ipcMain.handle('resizeWindow', (e, w, h) => {
    const resizeWindow = (w, h) => {
      // Set the desired table height
      mainWindow.setSize(w, h);
    }
    resizeWindow(w, h);
  });
  ipcMain.handle('getLunchMenu', async() => {
    const getLunchMenu = async() => {
      try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const today = new Date().getDay() - 1; // 0 (일요일) ~ 6 (토요일)
        const all_menu_items = {
          "월": [],
          "화": [],
          "수": [],
          "목": [],
          "금": [],
        }
        let today_menu = {
          "아침": "",
          "점심": "",
          "저녁": ""
        };
    
        $('tr.time').each((rowIndex, rowElement) => {
          const mealTime = $(rowElement).find('th').text().trim(); // 식사 시간 (아침, 점심, 저녁)
          const menuCells = $(rowElement).find('td.hour.week'); // 요일별 메뉴 셀
      
            menuCells.each((dayIndex, cellElement) => {
            if (cellElement) { // Check if cellElement is not null
              const cellText = $(cellElement).text().trim();
              if (dayIndex === 1 && mealTime == "점심") {
              all_menu_items["월"].push(`${cellText}`);
              }
              if (dayIndex === 2 && mealTime == "점심") {
              all_menu_items["화"].push(`${cellText}`);
              }
              if (dayIndex === 3 && mealTime == "점심") {
              all_menu_items["수"].push(`${cellText}`);
              }
              if (dayIndex === 4 && mealTime == "점심") {
              all_menu_items["목"].push(`${cellText}`);
              }
              if (dayIndex === 5 && mealTime == "점심") {
              all_menu_items["금"].push(`${cellText}`);
              }
            }
            });
        });
    
        return all_menu_items || 'No menu available for today.';
      } catch (error) {
        console.error('Error fetching lunch menu:', error);
        throw error;
      }
    }
    const today_menu = await getLunchMenu();
    return today_menu;
  });
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  try {
    createWindow()
  } catch (error) {
    console.error('오류 발생:', error);
  }

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.