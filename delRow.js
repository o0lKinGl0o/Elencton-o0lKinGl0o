const buttonDel = document.querySelector(".delBut");
buttonDel.on('click', function () {
  const db = require('electron-db');
  const electron = require('electron');
  const path = require('path');
  const location = path.join(__dirname, '');
  var buttonID =  (this.id);
  console.log(buttonID);
  db.deleteRow('taskTable', location, buttonID, (succ, msg) => {
    console.log(msg);
    console.log(buttonID);
  });
});
