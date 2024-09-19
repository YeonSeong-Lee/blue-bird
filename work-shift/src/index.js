const { app, BrowserWindow, ipcMain } = require('electron');
const ExcelJS = require('exceljs');
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    nodeIntegration: true, // 추가
    contextIsolation: false // 추가
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  ipcMain.handle('fetch_xlsx', async () => {
    const sheetData = [];
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('24년 근무표.xlsx');
    const worksheet = workbook.worksheets[workbook.worksheets.length - 1];
    sheetData.push(worksheet.name);
    const options = { includeEmpty: true };
    
    worksheet.eachRow(options, (row, rowNum) => {
      sheetData[rowNum] = []
      row.eachCell(options, (cell, cellNum) => {
        sheetData[rowNum][cellNum] = { value:cell.value, style:cell.style }
      })
    })
    return sheetData;
  });
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
