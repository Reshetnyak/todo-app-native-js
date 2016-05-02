;(function todoApplication(window, doc){

    var Todo = function(text){
        this.id   = '_' + new Date().getTime();
        this.text = text;
        this.completed = false;
        this.archived  = false;
    };

    Todo.prototype.createTodoEl = function(){

        var todo = this;
        var todoLi = doc.createElement('LI');
        var dF = doc.createDocumentFragment();
        var compiledTemplate = compile(todoApp.todoTemplate, {
            id: todo.id,
            text: todo.text,
            name: todoApp.todosNum + 1,
            tabindex: todoApp.todosNum + 1
        });
        todoLi.innerHTML = compiledTemplate;

        dF.appendChild(todoLi);

        return dF;

        function compile(template, data){
            return template.replace(/\{\{\s+?(\S+)\s+?\}\}/g, function(matched, property){
                return data[property];
            });
        }
    };

    Todo.prototype.addHandlers = function(){

        var todo = this;
        var id = '#' + todo.id;

        var todoDiv         = doc.querySelector( id + '.todo');
        var descriptionForm = doc.querySelector( id + ' .todo-description');
        var todoStatus      = doc.querySelector( id + ' .todo-status');
        var textSpan        = doc.querySelector( id + ' .todo-text');
        var todoInput       = doc.querySelector( id + ' .edit-todo');
        var closeBtn        = doc.querySelector( id + ' .close-btn');

        addHandlers();

        function addHandlers(){
            descriptionForm.addEventListener('submit', onSubmitTodo.bind(todo));
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
        function onSubmitTodo(e){
            e.preventDefault();
            // it will cause save changes
            todoApp.todoInput.focus();
        }
        function saveChanges(){

            var val = todoInput.value;
            var isEmpty = val.trim() === '';

            if ( isEmpty ){
                todo.removeTodo();
                todoApp.todosNum -= 1;
                todoApp.setDummyTodoVisibility();
                todo = null; //delete todo;
            } else {
                todo.text = val;
                textSpan.textContent = val;
            }

            toggleEditableMode();
            todoApp.todoInput.focus();
        }
        function toggleStatus(){
            todo.competed = !todo.completed;
            todoDiv.classList.toggle('completed');
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
        this.addHandlers();
    };

    Todo.prototype.removeTodo = function(){

        var ul = todoApp.todosUl;
        var todoToDelete = ul.querySelector('#' + this.id).parentNode;

        todoToDelete && ul.removeChild(todoToDelete);
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
        setTemplate: function(){
            this.todoTemplate = doc.querySelector('#todo-template').innerHTML;
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
            todoApp.setTemplate();
            todoApp.setAppElements();
            todoApp.addHandlers();
        }
    };

    window.addEventListener('DOMContentLoaded', todoApp.init);

}(window, document));
