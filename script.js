

// Function to Print all the todo List items
const getTodoList = ()=>{
    // getting the todolist from local storage
    const todoList = localStorage.getItem('todoList')||[];
  
    // if todolist is empty 
    if(!todoList){
        return;
    }
    
    //sort according to the time and date
    const listItems= JSON.parse(todoList).reverse();

    //Reference to the todo list
    const todoItemList = document.getElementById('todoItems');
    
    // mapping the list items 
    const list = listItems.map((todoItem,ind)=>`<li class="my-2 bg-white rounded-lg font-semibold p-2 flex flex-col">
    <div class="w-full h-4 flex justify-between">
        <h3 class="text-[10px] text-slate-600">${new Date(todoItem.date).toDateString()}</h3>
        <h3 class="text-[10px] text-slate-600">${new Date(todoItem.date).toLocaleTimeString()}</h3>
    </div>
    <div class="w-full flex h-5">
        <h3 class="w-4/5">${todoItem.todoText}</h3>
        <div class="w-1/5 text-xl flex justify-around font-bold">
            <i class='bi bi-check2-square '  onclick='completeTask(this,${ind})'></i>
            <i class="bi bi-pencil-square text-purple-600" onclick='updateTodo(${ind})'></i>
            <i class="bi bi-trash text-red-500 block " onclick='deleteTask(${ind})'></i>
        </div>
    </div>
    </li>`)  ;


    //Mapping it into the dom tree

    todoItemList.innerHTML="";
    
    list.forEach(listItem=> {
        todoItemList.innerHTML+=listItem;
    });
   
}
// initialy calling the function to print the todo list on the dom
getTodoList();


//Update Todo


//Delete a Todo
const deleteTask = (id)=>{
    
    //id : Current index to delete.
    // getting the todolist from local storage
    const todoList = localStorage.getItem('todoList')||[];
    
    let  listItems= JSON.parse(todoList);

    //if there is only 1 item then make the list empty
    if(listItems.length===1){
        listItems=[];
        localStorage.setItem('todoList',JSON.stringify(listItems));
    }
    else{
        //
        listItems.splice(id-1,1);
        localStorage.setItem('todoList',JSON.stringify(listItems));
    }

    // get the new list
    getTodoList();
}

const updateTodo= (id)=>{
    // id :Current - Index
// getting the todolist from local storage
const todoList = localStorage.getItem('todoList');
const listItems = JSON.parse(todoList);

const todoText = document.getElementById('todoText').value = listItems[id].todoText;

deleteTask(id);

}

//ON completion of the task

const completeTask = (ele,id)=>{
     //id : Current index to delete.
     // ele : current element in which the user clicked.

    // getting the todolist from local storage
    const todoList = localStorage.getItem('todoList')||[];
    const  listItems= JSON.parse(todoList);
  
    //If the task is not completed 
    if(listItems[id].completed){
        ele.style.color='black';
        listItems[id].completed = false;
    }
    // IF the completed is false or not completed
    else{
        ele.style.color='green';
        listItems[id].completed = true;
    }
   
    //Set the list into the local stoarge 
    localStorage.setItem('todoList',JSON.stringify(listItems));
}

//Cretae a todo
document.getElementById('addTodo').addEventListener('click',()=>{
    //Get the todo text from user input
    const todoText = document.getElementById('todoText').value;

    //if it is empty
    if(!todoText){
        alert('Empty Todo Cannot be saved');
    }
    //get the todolist
    const todoList = localStorage.getItem('todoList')||[];
    
    //todo list is empty  > push the new Todo
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
    // Push it to the array of todoItem
    todoItems.push({
        id:todoItems.length+1,
        todoText,
        date:new Date(),
        completed:false,
    });
    //set it to the localstorage
    localStorage.setItem('todoList',JSON.stringify(todoItems));
    
    //print the new List on the DOM
    getTodoList();
});





