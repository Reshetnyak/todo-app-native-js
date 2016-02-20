;(function todoApplication(window, doc){


    var Todo = function(text){
        this.id   = new Date().getTime();
        this.text = text;
        this.completed = false;
        this.archived  = false;
    };

    Todo.prototype.appendTodo = function(){

        function createTodo(todo){
            var li = doc.createElement('LI');
            li.setAttribute('id', todo.id);
            li.innerText = todo.text;
        }

        function appendToList(todoLi){
            todoApp
                .appElements
                .todosUl
                .appendChild(todoLi);
        }

        var todo = this;
        var todoLi = createTodo(todo);

        appendToList(todoLi);
    };

    var todoApp = {
        setAppElements: function(){
            this.addTodoBtn = doc.querySelector('#add-to-do-btn');
            this.todoInput  = doc.querySelector('#to-do-input');
            this.todosUl    = doc.querySelector('#todos');
        },
        addHandlers: function(){
            this.addTodoBtn.onclick = function(){
                var todoApp = this;
                var isInvalid = todoApp.addTodoBtn.getAttribute('disabled') !== null;

                if (isInvalid){
                    return false;
                }

                var todoText = todoApp.appElements.todoInput.value;
                var todo = new Todo(todoText);

                todo.appendTodo();

            };
        },
        init: function(){
            todoApp.setAppElements();
            todoApp.addHandlers();
        }
    };

    window.addEventListener('DOMContentLoaded', todoApp.init);





}(window, document));
