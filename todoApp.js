;(function todoApplication(window, doc){

    var Todo = function(text){
        this.id   = '_' + new Date().getTime();
        this.text = text;
        this.completed = false;
        this.archived  = false;
    };

    Todo.prototype.createTodoEl = function(){

        var todo = this;

        var todoLi          = createTodoLi();
        var descriptionForm = createDescriptionForm();
        var todoStatus      = createTodoStatus();
        var textSpan        = createTextSpan();
        var todoInput       = createTodoInput();
        var closeBtn        = createCloseBtn();

        fullFillLi();
        addHandlers();

        return todoLi;

        function createTodoLi(){

            var todoLi = doc.createElement('Li');

            todoLi.classList.add('todo');
            todoLi.id = todo.id;

            return todoLi;
        }

        function createDescriptionForm(){

            var descriptionForm = doc.createElement('FORM');

            descriptionForm.classList.add('todo-description');

            return descriptionForm;
        }

        function createTodoStatus(){

            var todoStatus = doc.createElement('SPAN');

            todoStatus.classList.add('todo-status');

            return todoStatus;
        }

        function createTextSpan(){

            var textSpan = doc.createElement('SPAN');

            textSpan.classList.add('todo-text');
            textSpan.textContent = todo.text;

            return textSpan;
        }

        function createTodoInput(){

            var todoInput = doc.createElement('INPUT');

            todoInput.classList.add('.edit-todo', 'hidden');
            todoInput.setAttribute('autocomplete', 'off');
            todoInput.value = todo.text;
            todoInput.setAttribute('tabindex', todoApp.todosNum + 1);
            todoInput.setAttribute('name', 'todo' + todoApp.todosNum + 1);

            return todoInput;
        }

        function createCloseBtn(){

            var closeBtn = doc.createElement('SPAN');

            closeBtn.classList.add('close-btn');
            closeBtn.textContent = ' X';
            closeBtn.addEventListener('click', todo.removeTodo.bind(todo));

            return closeBtn;
        }

        function fullFillLi(){
            todoLi.appendChild(descriptionForm);
            descriptionForm.appendChild(todoStatus);
            descriptionForm.appendChild(textSpan);
            descriptionForm.appendChild(todoInput);
            descriptionForm.appendChild(closeBtn);
        }

        function addHandlers(){
            descriptionForm.addEventListener('submit', saveChanges.bind(todo));
            todoStatus.addEventListener('click', toggleStatus.bind(todo));
            textSpan.addEventListener('dblclick', showInput);
            todoInput.addEventListener('blur', saveChanges.bind(todo));
            closeBtn.addEventListener('click', todo.removeTodo.bind(todo));
        }

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
                todo.wasSubmited = true;
                e.preventDefault();
            } else {
                todo.wasSubmited = false;
            }

            var val = todoInput.value;
            var isEmpty = val.trim() === '';

            if ( isEmpty && todo.wasSubmited === false){
                todo.removeTodo();
                todoApp.todosNum -= 1;
                todoApp.setDummyTodoVisibility();
                todo = null; //delete todo;
            } else {
                todo.text = val;
                textSpan.textContent = val;
                toggleEditableMode();
            }

            todoApp.todoInput.focus();
        }
        function toggleStatus(){
            todo.competed = !todo.completed;
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
