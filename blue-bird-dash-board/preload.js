const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('menu');
    menu.innerText = 'Loading...';
});

contextBridge.exposeInMainWorld('electron', {
    getLunchMenu: () => {
        ipcRenderer.send('get-lunch-menu');
    },
    setLunchMenu: (menu) => {
        const menuElement = document.getElementById('menu');
        menuElement.innerText = menu;
    }
});
