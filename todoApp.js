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

            return li;
        }

        function appendToList(todoLi){
            todoApp
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

                function isInvalid(){
                    return todoApp.addTodoBtn.getAttribute('disabled') !== null;
                }

                if ( isInvalid() ){
                    return false;
                }

                var todoText = todoApp.todoInput.value;
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
