const { BrowserWindow } = require('electron').remote;
const path = require('path');
const fs = require('fs');
function GFG_upd(clicked){
  let value = Number(this.id);
  console.log(value);
  let obj = new Object();
  obj.id = value;
  console.log(obj);
  const db_update = require('electron-db');
  const path_up = require('path');
  const location_up = path_up.join(__dirname, '');
  const app = electron.app || electron.remote.app;
  if (db_update.valid('butID', location_up))
  {
    db_update.getAll('butID', location_up, (succ, data) => {
      console.log("Success_get_id: " + succ);
      console.log(data);
      data.forEach( data => {
        db_update.updateRow('butID', location_up, data.id, obj, (succ, msg) => {
          console.log("Success_update_id: " + succ);
          console.log("Message: " + msg);
        });
      });
    });
  }
  else {
    console.log('БД не подклбчена');
  }
  const modalPath = path.join('file://', __dirname, 'updTask.html');
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
}
