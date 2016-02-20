;(function todoApplication(window, doc){

    var Todo = function(text){
        this.id   = '_' + new Date().getTime();
        this.text = text;
        this.completed = false;
        this.archived  = false;
    };

    Todo.prototype.createTodoEl = function(){

        var todoLi     = doc.createElement('Li');
        var todoStatus = doc.createElement('SPAN');
        var todoInput  = doc.createElement('INPUT');
        var closeBtn   = doc.createElement('SPAN');
        var textSpan   = doc.createElement('SPAN');
        var descriptionForm = doc.createElement('FORM');

        todoLi.classList.add('todo');
        todoLi.id = this.id;

        descriptionForm.classList.add('todo-description');
        descriptionForm.addEventListener('submit', saveChanges.bind(this));
        todoLi.appendChild(descriptionForm);

        todoStatus.classList.add('todo-status');
        todoStatus.addEventListener('click', toggleStatus.bind(this));
        descriptionForm.appendChild(todoStatus);

        textSpan.classList.add('todo-text');
        textSpan.textContent = this.text;
        textSpan.addEventListener('dblclick', showInput);
        descriptionForm.appendChild(textSpan);

        closeBtn.classList.add('close-btn');
        closeBtn.addEventListener('click', this.removeTodo.bind(this));
        descriptionForm.appendChild(closeBtn);

        todoInput.classList.add('.edit-todo', 'hidden');
        todoInput.setAttribute('autocomplete', 'off');
        todoInput.value = this.text;
        todoInput.setAttribute('tabindex', todoApp.todosNum + 1);
        todoInput.setAttribute('name', 'todo' + todoApp.todosNum + 1);
        todoInput.addEventListener('blur', saveChanges.bind(this));
        descriptionForm.appendChild(todoInput);

        return todoLi;

        function showInput(){
            toggleEditableMode();
            todoInput.focus();
        }

        function toggleEditableMode(){
            textSpan.classList.toggle('hidden');
            todoInput.classList.toggle('hidden');
        }
        function saveChanges(e){

            if (e.type === 'submit'){
                e.preventDefault();
            }

            var val = todoInput.value;
            var isEmpty = val.trim() === '';
            var formWasSubmitted = todoInput.classList.contains('hidden');

            if (e.type === 'blur' && formWasSubmitted){
                return false;
            }

            if ( isEmpty ){
                this.removeTodo();
            } else {
                this.text = val;
                textSpan.textContent = val;
            }

            toggleEditableMode();
            todoApp.todoInput.focus();
        }
        function toggleStatus(){
            this.competed = !this.completed;
        }
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
        todoApp.todosNum -= 1;

        todoApp.setDummyTodoVisibility();
    };

    var todoApp = {
        todosNum: 0,
        setAppElements: function(){
            this.addTodoBtn = doc.querySelector('#add-todo-btn');
            this.todoInput  = doc.querySelector('#todo-input');
            this.todosUl    = doc.querySelector('#todos');
            this.todoForm   = doc.querySelector('#todo-form');
            this.dummyTodo  = doc.querySelector('#dummy-todo');
        },
        setDummyTodoVisibility: function(){
            var method = todoApp.todosNum > 0 ? 'add' : 'remove';

            todoApp.dummyTodo.classList[method]('hidden');
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

                todoApp.setDummyTodoVisibility();

                function clearInput(){
                    todoApp.todoInput.value = '';
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
