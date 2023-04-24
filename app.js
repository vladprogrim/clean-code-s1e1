//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("task__input_add");//Add a new task.
var addButton=document.getElementsByTagName("task__button_add")[0];//first button
var incompleteTaskHolder=document.getElementById("task-list_incomplete");//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById("task-list_completed");//#completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

  var listItem=document.createElement("li");

  //input (checkbox)
  var checkBox=document.createElement("input");//checkbox
  //label
  var label=document.createElement("label");//label
  //input (text)
  var editInput=document.createElement("input");//text
  //button.edit
  var editButton=document.createElement("button");//edit button

  //button.delete
  var deleteButton=document.createElement("button");//delete button
  var deleteButtonImg=document.createElement("img");//delete button image

  label.innerText=taskString;
  label.className='task__label';

  //Each elements, needs appending
  listItem.className="task-list__task"
  checkBox.type="checkbox";
  editInput.type="text";
  editInput.className="task__input task__input_common";

  checkBox.className="task__checkbox";
  deleteButtonImg.className="button__img"

  editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
  editButton.className="task__button_common";

  deleteButton.className="task__button_delete";
  deleteButtonImg.src='./remove.svg';
  deleteButton.appendChild(deleteButtonImg);


  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



var addTask=function(){
  console.log("Add Task...");
  //Create a new list item with the text from the #add-task-input:
  if (!taskInput.value) return;
  var listItem=createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  var listItem=this.parentNode;

  var editInput=listItem.querySelector('.task__input');
  var label=listItem.querySelector(".task__label");
  var editBtn=listItem.querySelector(".task__button_common");
  var containsClass=listItem.classList.contains("edit-mode");
    //If class of the parent is .edit-mode
  if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
        editInput.classList.add("task__input_common")
        editInput.classList.remove("task__input_editable")
        label.classList.remove("task__label_editable")
  }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
        editInput.classList.remove("task__input_common")
        editInput.classList.add("task__input_editable")
        label.classList.add("task__label_editable")
  }

  //toggle .edit-mode on the parent.
  listItem.classList.toggle("edit-mode");
};


//Delete task.
var deleteTask=function(){
  console.log("Delete Task...");

  var listItem=this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  var listItem=this.parentNode;
  completedTasksHolder.appendChild(listItem);
  for (let label of listItem.getElementsByClassName("task__label")) {
    label.classList.add("task__label_completed")
  }
  bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
  console.log("Incomplete Task...");
//Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incomplete-tasks.
  var listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  for (let label of listItem.getElementsByClassName("task__label")) {
    label.classList.remove("task__label_completed")
  }
  bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
//select ListItems children
  var checkBox=taskListItem.querySelector(".task__checkbox");
  var editButton=taskListItem.querySelector(".task__button_common");
  var deleteButton=taskListItem.querySelector(".task__button_delete");


  //Bind editTask to edit button.
  editButton.onclick=editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick=deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.