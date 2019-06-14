function runWithDebugger(ourFunction) {
    debugger;
    ourFunction();
}

var todoList = {
    todos: [],

    init: function() {
        if (this.todos.length === 0) {
            for (var i = 0; i < 3; i++) {
                this.todos.push({  
                    todoText: "Item " + i,
                    completed: false
                });
            }
        }
    },

    addTodo: function(todoText) {
        if (todoText !== "") {
            this.todos.push({
                todoText: todoText, 
            todoText: todoText, 
                todoText: todoText, 
                completed: false
            });
        }
    },

    editTodo: function(position, todoText) {
        if (position !== "" && !(position > (this.todos.length - 1)) && todoText !== "") {  
            this.todos[position].todoText = todoText;    
        }  
    },

    deleteTodo: function(position) {
            this.todos.splice(position, 1);
    },

    toggleCompleted: function(position) {
        if (position !== "" && !(position > (this.todos.length - 1))) {  
            var todo = this.todos[position];
            todo.completed = !todo.completed;   
        }
    },

    toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;

        this.todos.forEach(function(hello) {
            if (hello.completed === true) {
                completedTodos++;
            }
        });

        //If everything is true, make everything false vice versa
        if (completedTodos === totalTodos || completedTodos === 0) {
            this.todos.forEach(function(todo, position) {
                this.toggleCompleted(position);
            }, this)
        } 
    }
};

var handlers = {
    initTodos: function() {
        todoList.init();
        view.displayTodos();
    },

    addTodo: function() {
        var addTodoTextInput = document.getElementById('addTodoTextInput');
        todoList.addTodo(addTodoTextInput.value);
        view.validateText(addTodoTextInput);
        addTodoTextInput.value = '';
        view.displayTodos();
    },

    editTodo: function() {
        var editTodoTextInput = document.getElementById('editTodoTextInput');
        var editTodoPositionInput = document.getElementById('editTodoPositionInput');
        todoList.editTodo(editTodoPositionInput.value, editTodoTextInput.value);
        view.validateTextandPosition(editTodoTextInput, editTodoPositionInput);
        view.displayTodos();
    },

    deleteTodo: function(position) {
        // view.validatePosition(position);
        todoList.deleteTodo(position);
        view.displayTodos();
    },

    toggleCompleted: function() {
        var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
        todoList.toggleCompleted(toggleCompletedPositionInput.value);
        view.validatePosition(toggleCompletedPositionInput);
        view.displayTodos();
    },

    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    }, 
};

var messages = {
    message: function(message) {
        switch (message) {
            case 'position': 
                console.log("Please provide a position.");
                break; 
            default:
                console.log("Unable to " + message + ". Please provide a valid input");      
        }     
    }
};

var view = {
    displayTodos: function() {
        var todosUl = document.querySelector(".todosList");
        todosUl.innerHTML = '';        
        todoList.todos.forEach(function(todo, position) {
            var todoLi = document.createElement("li");
            var todoTextwithCompletion = '';
            
            if (todo.completed === true) {
                todoTextwithCompletion = '(x) ' + todo.todoText;
            } else {
                todoTextwithCompletion = '( ) ' + todo.todoText;
            }

            todoLi.id = position;
            todoLi.textContent = todoTextwithCompletion;
            todoLi.appendChild(this.createDeleteBtn());
            todosUl.appendChild(todoLi);
        }, this)
    },

    createDeleteBtn: function(id){
        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'btn red deleteBtn';
        return deleteBtn;
    },

    setUpEventListeners: function() {
        var todosUl = document.querySelector('ul');

        todosUl.addEventListener('click', function(event) {

            //Get clicked element
            var elementClicked = event.target;

            //Check if elementClicked is a delete button
            if (elementClicked.classList.contains('deleteBtn') === true){
            handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
        }
    });
    },

    //Clear inputs if successful
    validateText: function(textField) {
        if (textField.value === "") {
            if (!textField.classList.contains("error")) {
                textField.className = textField.className + " error";
            }       
        } else {
            textField.className = textField.className.replace(" error", "");
            toggleCompletedPositionInput.value = '';
        }
    },

    validatePosition: function(positionField) {
        if (positionField.value === "") {
            if (!positionField.classList.contains("error")) {
                positionField.className = positionField.className + " error";
            }  
        } else if (positionField.value > (todoList.todos.length - 1)) {
            if (!positionField.classList.contains("error")) {
                positionField.className = positionField.className + " error";
            }
        } else {
            positionField.className = positionField.className.replace(" error", "");
            toggleCompletedPositionInput.value = '';
        }
    },

    validateTextandPosition: function(textField, positionField) {
        // if both inputs are wrong, hold field values
        if(textField.value === "") {
            console.log("yes");
        }
        if (textField.value === "" && ((positionField.value === "") || positionField.value > (todoList.todos.length - 1))) {
            if (!textField.classList.contains("error")) {
                textField.className = textField.className + " error";
            }
            if (!positionField.classList.contains("error")) {
                positionField.className = positionField.className + " error";
            }
        // text value is empty, hold field values and remove position error
        } else if (textField.value === "" && !((positionField.value === "") || positionField.value > (todoList.todos.length - 1))) {
            if (!textField.classList.contains("error")) {
                textField.className = textField.className + " error";
            }
            positionField.className = positionField.className.replace(" error", "");
        // position value is wrong, hold field values and remove text error
        } else if (textField.value !== "" && ((positionField.value === "") || positionField.value > (todoList.todos.length - 1))) {
            if (!positionField.classList.contains("error")) {
                positionField.className = positionField.className + " error";
            }
            textField.className = textField.className.replace(" error", "");
        // both values are correct, clear both fields and remove error class
        } else {
            textField.className = textField.className.replace(" error", "");
            positionField.className = positionField.className.replace(" error", "");
            textField.value = '';
            positionField.value = '';
        }
    }
}

//Better to put the validatetext and validatepositon in view 
//In the todoList methods, change the if else statements to just one big ifelse. If input is valid, run. Else do nothing.

view.setUpEventListeners();