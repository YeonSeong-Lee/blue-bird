// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  fetch_xlsx: () => ipcRenderer.invoke('fetch_xlsx'),
  on: (channel, callback) => ipcRenderer.on(channel, callback)
});
