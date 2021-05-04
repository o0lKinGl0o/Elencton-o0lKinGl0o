const db = require('electron-db');
const path_update = require('path');
const location_update = path_update.join(__dirname, '');
if (db.valid('butID', location_update))
{
  console.log("Valid but_ID: " + location_update);
  db.getAll('butID', location_update, (succ, data1) => {
    data1.forEach( data1 => {
      if (db.valid('taskTable', location_update))
      {
        console.log("Valid taskTable: " + location_update);
        console.log(Number(data1.id));
        db.search('taskTable',location_update, 'id', data1.id, (succ, data2) => {
          console.log("search taskTable: " + location_update);
          console.log(data2);
          data2.forEach( data2 => {
            console.log(data2);
            document.write(`<form>
              <div class="container">
                <div class="row">
                  <div class="col">
                  <input type="text" class="form-control inputLogin" id="exampleFormControlInput1" value = "${data2.login}" placeholder="Login" required>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control inputPassword" id="exampleFormControlInput1" value = "${data2.password}" placeholder="Password" required>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <input type="text" class="form-control inputSize" id="exampleFormControlInput1" value = "${data2.size}" placeholder="Size" required>
                  </div>
                  <div class="col">
                    <select class="form-select form-select-sm sposob" aria-label=".form-select-sm example" value = "${data2.sposob}">
                      <option selected>Select metod</option>
                      <option value="Самовывоз">Самовывоз</option>
                      <option value="Курьерская служба СДЭК">Курьерская служба СДЭК</option>
                      <option value="Почта России">Почта России</option>
                      <option value="EMS Почта России">EMS Почта России</option>
                    </select>
                  </div>
                </div>
              </div>
              <button type="button" class="btn btn-primary btn-lg btn_createTask create-json" id="updTask">Save</button>
            </form>`);
          });
        });
      }
      else {
        console.log("NOT_Valid taskTable: " + location_update);
      }
    });
  });
}
else {
  console.log("NOT_Valid butID: " + location_update);
}
