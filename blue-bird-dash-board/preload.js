const { contextBridge, ipcRenderer } = require('electron');




window.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('menu');
    menu.innerText = 'Loading...';
});

contextBridge.exposeInMainWorld('versions', {
    ping: () => ipcRenderer.invoke('getLunchMenu'),
});
