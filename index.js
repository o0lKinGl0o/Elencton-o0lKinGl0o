const notifyBtn = document.getElementById('createTask');
notifyBtn.addEventListener('click', (event) => {
  const modalPath = path.join('file://', __dirname, 'createTask.html');
  let child = new BrowserWindow({
      width: 600,
      height: 325,
      movable:false,
      //frame: false,
      show: false,
      //skipTaskbar:true,
      //hasShadow:false,
      backgroundColor: '#252a34',
      //transparent: true,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false,
      }
    });
    child.on('close', () => {
       child = null
       location.reload();
     });
    child.loadURL(modalPath);
    child.show()
})
