// main.js

// Modules to control application life and create native browser window
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cheerio from 'cheerio';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const url = 'http://psnest.kr/sub/sub05_05.php';


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  ipcMain.handle('getLunchMenu', async() => {
    const getLunchMenu = async() => {
      try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const today = new Date().getDay() - 1; // 0 (일요일) ~ 6 (토요일)
        const all_menu_items = [];
        let today_launch_menu = {
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
              if (dayIndex === today) {
              today_launch_menu[mealTime] += `${cellText}`;
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