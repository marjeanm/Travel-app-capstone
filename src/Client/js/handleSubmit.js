document.getElementById("click").addEventListener("click", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  var verb = document.getElementById("packing").value;
  addTodo(verb.value);

  function addTodo(todo) {
    var ul = document.getElementById("toDoList");
    var li = document.createElement("li");
    li.className = "listItem";
    li.id = "item";
    li.innerHTML =`<div  id="item">
    <span   class="">${verb}</span>    
    </div>`;
    ul.appendChild(li);
  }

  document.getElementById('clear').addEventListener('click', clearData);

  function clearData() {
    document.getElementById('toDoList').innerHTML = "";
  }
}
export{handleSubmit}