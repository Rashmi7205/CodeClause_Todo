const todoItemList = document.getElementById('todoItems');
const todoList = localStorage.getItem('todoList')||[];

const getTodoList = ()=>{
    if(!todoList){
        return;
    }
    const listItems= JSON.parse(todoList).reverse();
    console.log(listItems);
    const list = listItems.map((todoItem)=>`<li class="my-2 bg-white rounded-lg font-semibold p-2 flex flex-col">
    <div class="w-full h-4 flex justify-between">
        <h3 class="text-[10px] text-slate-600">${new Date(todoItem.date).toDateString()}</h3>
        <h3 class="text-[10px] text-slate-600">${new Date(todoItem.date).toLocaleTimeString()}</h3>
    </div>
    <div class="w-full flex h-5">
        <h3 class="w-4/5">${todoItem.todoText}</h3>
        <div class="w-1/5 text-xl flex justify-around">
            <i class="bi bi-check2-square"></i>
            <i class="bi bi-trash text-red-500"></i>
        </div>
    </div>
  
</li>`)  ;
    todoItemList.innerHTML="";
    list.forEach(listItem=> {
        todoItemList.innerHTML+=listItem;
    });
}
getTodoList();


document.getElementById('addTodo').addEventListener('click',()=>{
    const todoText = document.getElementById('todoText').value;
    if(!todoText){
        alert('Empty Todo Cannot be saved');
    }
    if(!todoList.length){
        localStorage.setItem('todoList',JSON.stringify([{
            id:1,
            todoText,
            date:new Date(),
            completed:false,
        }]));
        return;
    }
    const todoItems= JSON.parse(todoList);
    todoItems.push({
        id:todoItems.length+1,
        todoText,
        date:new Date(),
        completed:false,
    });
    localStorage.setItem('todoList',JSON.stringify(todoItems));
    getTodoList();
});





