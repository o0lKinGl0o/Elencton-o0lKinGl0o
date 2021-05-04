var i = 1;
var j = 0;
var x = 0;
db_task.getAll('taskTable', location_table, (succ, data) => {
  data.forEach( data => {
  document.write(`<tr><th scope="row">${i}</th>
    <td>${data.login}</td>
    <td>${data.size}</td>
    <td>${data.sposob}</td>
    <td>${data.status}</td>
    <td>
    <button type="button" class="btn btn-light PLAY_${j} Play" id = "${data.id}"></button>
    <button type="button" class="btn btn-light DEL_${i}" id = "${data.id}">DELETE</button>
    <button type="button" class="btn btn-light UPD_${x}" id = "${data.id}">UPDATE</button></td></tr>
    <script>document.querySelector(".PLAY_${j++}").onclick = BS_click;</script>
    <script>document.querySelector(".DEL_${i++}").onclick = GFG_click;</script>
    <script>document.querySelector(".UPD_${x++}").onclick = GFG_upd;</script>`);
  });
});
