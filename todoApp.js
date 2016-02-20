;(function todoApplication(window, doc){


    var Todo = function(text){
        this.id   = '_' + new Date().getTime();
        this.text = text;
        this.completed = false;
        this.archived  = false;
    };

    Todo.prototype.createTodoEl = function(){

        var li = doc.createElement('LI');
        var textSpan = doc.createElement('SPAN');
        var closeBtn = doc.createElement('SPAN');

        li.setAttribute('id', this.id);
        li.classList.add('todo');

        textSpan.textContent = this.text;
        textSpan.classList.add('todo-text');

        closeBtn.textContent = '   X';
        closeBtn.classList.add('close-btn');

        closeBtn.addEventListener('click', this.removeTodo.bind(this));

        li.appendChild(textSpan);
        li.appendChild(closeBtn);

        return li;
    };

    Todo.prototype.appendTodo = function(){

        function appendToList(todoLi){
            todoApp
                .todosUl
                .appendChild(todoLi);
        }

        var todoLi = this.createTodoEl();

        appendToList(todoLi);
    };

    Todo.prototype.removeTodo = function(){
        var ul = todoApp.todosUl;
        var todoToDelete = ul.querySelector('#' + this.id);

        ul.removeChild(todoToDelete);
    }

    var todoApp = {
        todosNum: 0,
        setAppElements: function(){
            this.addTodoBtn = doc.querySelector('#add-todo-btn');
            this.todoInput  = doc.querySelector('#todo-input');
            this.todosUl    = doc.querySelector('#todos');
            this.todoForm   = doc.querySelector('#todo-form');
            this.dummyTodo  = doc.querySelector('#dummy-todo');
        },
        addHandlers: function(){

            this.todoForm.addEventListener('submit', submitListener);

            this.todoInput.addEventListener('keyup', disableIfEmpty);

            function submitListener(e){

                e.preventDefault();

                if ( isInputEmpty() ){
                    return false;
                }

                var todoText = todoApp.todoInput.value;
                var todo = new Todo(todoText);

                todo.appendTodo();
                todoApp.todosNum += 1;
                clearInput();

                todoApp.todosNum > 0 ? hideDummyTodo() : showDummyTodo();

                function clearInput(){
                    todoApp.todoInput.value = '';
                }

                function showDummyTodo(){
                    todoApp.dummyTodo.classList.remove('hidden');
                }

                function hideDummyTodo(){
                    todoApp.dummyTodo.classList.add('hidden');
                }

            }

            function disableIfEmpty(){

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
            }

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
