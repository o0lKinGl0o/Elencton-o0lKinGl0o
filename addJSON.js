addTask.addEventListener('click', (event) => {
  if (document.querySelector(".inputLogin").value != '' &&
      document.querySelector(".inputPassword").value != '' &&
      document.querySelector(".inputSize").value != '' &&
      document.querySelector(".sposob").value != '')
      { const path = require('path');
        const db = require('electron-db');
        const location = path.join(__dirname, '');
        let obj = new Object();
        obj.id += 1;
        obj.login = document.querySelector(".inputLogin").value;
        obj.password = document.querySelector(".inputPassword").value;
        obj.size = document.querySelector(".inputSize").value;
        obj.sposob = document.querySelector(".sposob").value;
        if (db.valid('taskTable', location)) {
          db.insertTableContent('taskTable', location, obj, (succ, msg) => {
            console.log("Success: " + succ);
            console.log("Message: " + msg);
            const { remote } = require('electron')
            remote.getCurrentWindow().close()
          })
        }
      }
      else
      {
        if (document.querySelector(".alert") == null)
        {
          let div = document.createElement('div');
          div.className = "alert alert-danger";
          div.innerHTML = "Empty field";
          document.querySelector(".create-json").after(div);
        }
      }
})
