updTask.addEventListener('click', (event) => {
  if (document.querySelector(".inputLogin").value != '' &&
      document.querySelector(".inputPassword").value != '' &&
      document.querySelector(".inputSize").value != '' &&
      document.querySelector(".sposob").value != '')
      {
        if (db.valid('butID', location_update))
        console.log("Valid: " + location_update);
        {
          db.getAll('butID', location_update, (succ, data) => {
            console.log("Success_get_id: " + succ);
            console.log(data);
            data.forEach( data => {
              let obj = new Object();
              obj.id = data.id;
              obj.login = document.querySelector(".inputLogin").value;
              obj.password = document.querySelector(".inputPassword").value;
              obj.size = document.querySelector(".inputSize").value;
              obj.sposob = document.querySelector(".sposob").value;
              db.updateRow('taskTable', location_update, data.id, obj, (succ, msg) => {
                console.log("Success_update_id: " + succ);
                console.log("Message: " + msg);
                const { remote } = require('electron')
                //remote.getCurrentWindow().close()
              });
            });
          });
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
