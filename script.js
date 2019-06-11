var todoList = {
    todos: ['item 1', 'item 2', 'item 3'],
    displayTodos: function() {
        console.log('My Todos', this.todos);
    },
    addTodo: function(todo) {
        this.todos.push(todo);
        this.displayTodos();
    },
    changeTodo: function(position, newValue) {
        this.todos[position] = newValue;
        this.displayTodos();
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
        this.displayTodos();
    },
    // create new method called replaceTodoList
    //e.g. replace existing with an entirely
    //param(list). Default start pos is 0, delCount
    //derive it as a variable(size of list)
    //break list param up into items, then pass into
    //method
    
};