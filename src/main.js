function update(value, newValue) {
    value = newValue;
    return value;
}

function state(value) {
    return [ value, update ];
}


let [todoPage, setTodoPage] = state(true)
let [notesPage, setNotesPage] = state(false)
let [remindersPage, setRemindersPage] = state(false)


function removeClass (element, classStr) {
    element.className = (' '+element.className+' ').split(' ' + classStr + ' ').join(' ');
}
function addClass (element, classStr){
    element.className += ' ' + classStr;
}

const navTodo = document.getElementById('nav-todo')
const navNotes = document.getElementById('nav-notes')
const navReminders = document.getElementById('nav-reminders')
const TODO = document.getElementById('content-TODO')
const Notes = document.getElementById('content-Notes')
const Reminders = document.getElementById('content-Reminders')


function setPage(id){
    switch(id){
        case 1:{
            addClass(navTodo, 'border-b-0')
            addClass(navNotes, 'border-t-0 border-x-0')
            addClass(navReminders, 'border-t-0 border-x-0')
            removeClass(navTodo, 'border-t-0 border-x-0')
            removeClass(navNotes, 'border-b-0')
            removeClass(navReminders, 'border-b-0')

            addClass(TODO, 'flex')
            addClass(Notes, 'hidden')
            addClass(Reminders, 'hidden')
            removeClass(TODO, 'hidden')
            removeClass(Notes, 'flex')
            removeClass(Reminders, 'flex')
            break
        }
        case 2:{
            addClass(navNotes, 'border-b-0')
            addClass(navTodo, 'border-t-0 border-x-0')
            addClass(navReminders, 'border-t-0 border-x-0')
            removeClass(navTodo, 'border-b-0')
            removeClass(navNotes, 'border-t-0 border-x-0')
            removeClass(navReminders, 'border-b-0')

            addClass(TODO, 'hidden')
            addClass(Notes, 'flex')
            addClass(Reminders, 'hidden')
            removeClass(TODO, 'flex')
            removeClass(Notes, 'hidden')
            removeClass(Reminders, 'flex')
            break
        }
        case 3:{
            addClass(navReminders, 'border-b-0')
            addClass(navNotes, 'border-t-0 border-x-0')
            addClass(navTodo, 'border-t-0 border-x-0')
            removeClass(navTodo, 'border-b-0')
            removeClass(navNotes, 'border-b-0')
            removeClass(navReminders, 'border-t-0 border-x-0')

            addClass(TODO, 'hidden')
            addClass(Notes, 'hidden')
            addClass(Reminders, 'flex')
            removeClass(TODO, 'flex')
            removeClass(Notes, 'flex')
            removeClass(Reminders, 'hidden')
            break
        }
        default:{
            alert('wrong case')
        }
    }
}
setPage(1)

navTodo.addEventListener('click', () => setPage(1))
navNotes.addEventListener('click', () => setPage(2))
navReminders.addEventListener('click', () => setPage(3))


const root = document.getElementById('root')



