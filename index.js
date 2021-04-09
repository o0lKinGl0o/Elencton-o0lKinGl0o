
const { BrowserWindow } = require('electron').remote;
const path = require('path');


const notifyBtn = document.getElementById('createTask');

notifyBtn.addEventListener('click', (event) => {

    const modalPath = path.join('file://', __dirname, 'createTask.html');

    let child = new BrowserWindow({
        width: 600,
        height: 250,
        movable:false,
        frame: false,
        show: false,
        
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        }
    });

    child.on('close', () => { win = null });
    child.loadURL(modalPath);
    child.show();
});
