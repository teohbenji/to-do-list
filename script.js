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
        this.todos.push({
            todoText: todoText, 
            completed: false
        });
    },

    editTodo: function(position, todoText) {
        if (position === "") {
            messages.message('position');
        } else if (position > (this.todos.length - 1)) {
            messages.message("edit todo"); 
        } else {
            this.todos[position].todoText = todoText;
        }
    },

    deleteTodo: function(position) {
        if (position === "") {
            messages.message('position');
        } else if (position > (this.todos.length - 1)) {
            messages.message("delete todo");
        } else {
            this.todos.splice(position, 1);
        }
    },

    toggleCompleted: function(position) {
        if (position === "") {
            messages.message('position');
        } else if (position > (this.todos.length - 1)) {
            messages.message("toggleCompleted todo");    
        } else {
            var todo = this.todos[position];
            todo.completed = !todo.completed;
        }
    },

    toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;
        
        // for (var i = 0; i < totalTodos; i++) {
        //     if (this.todos[i].completed === true) {
        //         completedTodos++;
        //     } 
        // }

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
        inputValidation.validate(addTodoTextInput);
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        view.displayTodos();
    },

    editTodo: function() {
        var editTodoPositionInput = document.getElementById('editTodoPositionInput');
        var editTodoTextInput = document.getElementById('editTodoTextInput');
        todoList.editTodo(editTodoPositionInput.value, editTodoTextInput.value);
        editTodoPositionInput.value = '';
        editTodoTextInput.value = '';
        view.displayTodos();
    },

    deleteTodo: function(position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },

    toggleCompleted: function() {
        var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
        todoList.toggleCompleted(toggleCompletedPositionInput.value);
        toggleCompletedPositionInput.value = '';
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
    }
}

var inputValidation = {    
    validate: function(input) {
        if (input.value === '') {
            input.className = input.className + " error";
        } else {
            input.className = input.className.replace(" error", "");
        }
    }
}

view.setUpEventListeners();