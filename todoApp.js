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
            this.addTodoBtn = doc.querySelector('#add-todo-btn');
            this.todoInput  = doc.querySelector('#todo-input');
            this.todosUl    = doc.querySelector('#todos');
            this.todoForm   = doc.querySelector('#todo-form');
        },
        addHandlers: function(){
            this.todoForm.addEventListener('submit', submitListener);

            function submitListener(e){

                e.preventDefault();

                if ( isInputEmpty() ){
                    return false;
                }

                var todoText = todoApp.todoInput.value;
                var todo = new Todo(todoText);

                todo.appendTodo();

            }

            this.todoInput.onkeyup = function(){

                if ( isInputEmpty() ){
                    isBtnEnabled() && disableBtn();
                } else {
                    isBtnEnabled() === false && enableBtn();
                }

                function isBtnEnabled(){
                    return todoApp.addTodoBtn.disabled === false;
                }

                function enableBtn(){
                    todoApp.addTodoBtn.disabled = false;
                }

                function disableBtn(){
                    todoApp.addTodoBtn.disabled = true;
                }
            };

            function isInputEmpty(){
                return todoApp.todoInput.value.trim() === '';
            }
        },
        init: function(){
            todoApp.setAppElements();
            todoApp.addHandlers();
        }
    };

    window.addEventListener('DOMContentLoaded', todoApp.init);

}(window, document));
