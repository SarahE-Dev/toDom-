// =============================================================================

// const { justComplete, justNotComplete } = require("./backend");

// Remember that our list is called `todos`, and it's in `todos.js`. It's not in this file, nor is it being `require`-d in, but it's available globally because its file is loaded in BEFORE this one in `index.html`.

// Write each function below its comment and you'll be doing pretty well.  The printTodo function has been declared for you so that we can drill down in the comments on its individual steps. Add the code for each part below its comment as well.

// Doing our code under its pre-written comment in this way will self-document your code and, more importantly, make it easier to follow along with the assignment!

// Remember that each function below is a helper function or an event listener function that runs when the user interacts with our page. So we should NOT be calling any functions or doing anythinmg in the global scope. Just functions functions functions!
// (With one big exception, which you'll see in the comments when we get there.)

// And now: code away!

// =============================================================================

// A function that, given a todo object, adds an item to our todo list array.
function addTodoObject(obj){
  todos.push(obj)
}


// A function that removes an item at a given index from our todo list array. You can use splice!

function removeObj(n){
  todos.splice(n, 1)
}

// A function that takes in a todo object and displays it on the DOM. This is a pretty big function, so we'll walk through the different parts of it.
const printTodo = function(todoObj) {
  // Use `document.createElement` to make an <li>.
  let newLi = document.createElement('li');
  
  // Set its text (preferably using `.innerText`) to be our given object's text field. Check out what a todo object looks like in `todos.js` if you need to!
  newLi.innerText = todoObj.text;

  // Give our new li a `todo-item` class using `classList`. This will allow us to style it later if we want.
  newLi.classList.add('todo-item');

  // Give our new li an id that is the object's id. This is so that we have a matching relationship between todo _html elements_ and their corresponding _array objects_. Now we'll be able to find the corresponding array object when they click to toggle the completeness on a DOM element.
  newLi.id = todoObj.id;
  
  // Give the li a `complete` class if the todo object indicates it was complete already. (Again, check the `todos.js` to see what the objects look like!)
  if(todoObj.complete === true){
    newLi.classList.add('complete')
  }

  // Query the todo list <ol> and store it in a variable
  let list = document.querySelector('.todo-list');

  // Append the li we made to the ol as the last child using `.appendChild`. If this isn't working for you, check what is being appended to what!
  list.appendChild(newLi)
}


// A function that print ALL todos. It should loop through our todos array and call the above print-one-todo function on each one.
function printAllTodos(arr){
  for(let object of arr){
    printTodo(object)
  }
}


// Now here in the global code, call the above function, so our todos array gets printed out on page load (which is when global code is run). This is the only time we're calling a function ourselves; the rest is event listeners and helper functions that run when the user interacts with the DOM!

printAllTodos(todos)



// A function that clears all todos from the DOM. This is a great helper function for refreshing our todos.
// Test it in the console and see if your list disappears!

function clearTodoList(){
  let list = document.querySelector('.todo-list');
  list.innerHTML = '';
}

// A function that refreshes our page by calling each of the two above functions. Since printing all todos onto the DOM is based on our todos array, if we make a change to our todos array, we can simply call this function, which will make our DOM match our todos array by simply clearing the page and repopulating it according to our todos' new state.

function refreshPage(){
  clearTodoList();
  printAllTodos(todos)
}



/*
Let's wire it all together. Add an event listener for the add todo button that will:
1. Queries the input box. We will need that node element again, so save it to a variable!
2. Create a todo object. Its text should be the text that was in the input box (you might have to research this!), its priority should be set to 2, and its completeness should be false, as we definitely haven't completed the todo yet.
3. Pass that object to your adding todos function to put it in our array.
4. Pass the object as well to your adding todos function to put it on the DOM.
5. Stretch goal: remove all text from the input box. Try adding multiple todos without this first, you'll see why we should do it!
*/
document.querySelector('.add-todo').addEventListener('click', ()=>{
  let inputBox = document.querySelector('.todo-input');
  let todoObject = {
    text: inputBox.value,
    priority: 2,
    complete: false
  }
  addTodoObject(todoObject);
  printTodo(todoObject);
  listItemListener(todos);
  inputBox.value = '';

})


/* 
 Run over to the HTML and add a button for CLEAR TODOS or REMOVE TODOS or some such, giving it a class or id of your choice. Now let's wire up that button, giving it a click event listener that clears all todos from the DOM (we have a function for that!) and removes all todo objects from the todos array as well.
*/
document.querySelector('.clear-todos').addEventListener('click', ()=>{
  clearTodoList();
  todos.length = 0;
})



// And you're DONE with the best interface we've written yet for a todos app!


function listItemListener(arr){
  let listItems = document.querySelectorAll('li');
  for(let i=0; i<listItems.length; i++){
  listItems[i].addEventListener('click', ()=>{
    if(arr[i].complete === false){
      arr[i].complete = true
    }else if(arr[i].complete === true){
      arr[i].complete = false
    }
    if(arr[i].complete === true){
      listItems[i].classList.add('complete')
    }else if(arr[i].complete === false){
      listItems[i].classList.remove('complete')
    }
  })
  
}}


listItemListener(todos);

document.querySelector('.delete').addEventListener('click', ()=>{
  let complete = [];
  for(let i=0; i < todos.length; i++){
    if(todos[i].complete === false){
      complete.push(todos[i])
    }
  }
  todos = complete;
  clearTodoList()
  printAllTodos(todos)
  listItemListener(todos)
  
})

document.querySelector('.show-incomplete').addEventListener('click', ()=>{
  let notcomplete = [];
  for(let i=0; i < todos.length; i++){
    if(todos[i].complete === false){
      notcomplete.push(todos[i])
    }
  }
  clearTodoList()
  printAllTodos(notcomplete)
  listItemListener(notcomplete)
  
})

document.querySelector('.show-all').addEventListener('click', ()=>{
  let list = document.querySelector('ol');
  list.innerHTML = '';
  printAllTodos(todos);
  listItemListener(todos)
})


