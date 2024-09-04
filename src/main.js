function update(value, newValue) {
    value = newValue;
    return value;
}

function state(value) {
    return [ value, update ];
}



let [currentActivePage, setCurrentActivePage] = state(1)


function deleteClass (element, classStr) {
    if(element)
        element.className = (' '+element.className+' ').split(' ' + classStr + ' ').join(' ');
}
function addClass (element, classStr){
    if(element)
        element.className += ' ' + classStr;
}

const navTodo = document.getElementById('nav-todo')
const navNotes = document.getElementById('nav-notes')
const navReminders = document.getElementById('nav-reminders')
const TODO = document.getElementById('content-Todo')
const Notes = document.getElementById('content-Notes')
const Reminders = document.getElementById('content-Reminders')

const disabledNavButtonString = ' bg-accent border-solid border-secondary border-2 p-4 font-bold text-secondary border-t-0 border-x-0  text-white  '
const enabledNavButtonString = ' bg-primary border-solid border-secondary border-2 p-4 font-bold text-secondary border-b-0 '
//TODO Create function to clear all classes from element and add strings for enabled and disabled nav buttons
//TODO Make switch cases clear all classes before adding new class, and use default strings for list of all classes
//TODO If clearing all classes and switching them with default string works correctly, removeClass will be obsolete
function setPage(id){
    switch(id){
        //Set active page = todo list
        case 1:{
            navTodo.className = ""
            navNotes.className = ""
            navReminders.className = ""
            
            addClass(navTodo, enabledNavButtonString)
            addClass(navNotes, disabledNavButtonString)
            addClass(navReminders, disabledNavButtonString)

            addClass(TODO, 'flex')
            addClass(Notes, 'hidden')
            addClass(Reminders, 'hidden')
            deleteClass(TODO, 'hidden')
            deleteClass(Notes, 'flex')
            deleteClass(Reminders, 'flex')
            break
        }
        //set active page = notes
        case 2:{
            navTodo.className = ""
            navNotes.className = ""
            navReminders.className = ""
            
            addClass(navTodo, disabledNavButtonString)
            addClass(navNotes, enabledNavButtonString)
            addClass(navReminders, disabledNavButtonString)

            addClass(TODO, 'hidden')
            addClass(Notes, 'flex')
            addClass(Reminders, 'hidden')
            deleteClass(TODO, 'flex')
            deleteClass(Notes, 'hidden')
            deleteClass(Reminders, 'flex')
            break
        }
        //set active page = reminders
        case 3:{
            navTodo.className = ""
            navNotes.className = ""
            navReminders.className = ""
            
            addClass(navTodo, disabledNavButtonString)
            addClass(navNotes, disabledNavButtonString)
            addClass(navReminders, enabledNavButtonString)

            addClass(TODO, 'hidden')
            addClass(Notes, 'hidden')
            addClass(Reminders, 'flex')
            deleteClass(TODO, 'flex')
            deleteClass(Notes, 'flex')
            deleteClass(Reminders, 'hidden')
            break
        }
        default:{
            alert('wrong case')
        }
    }
}
setPage(currentActivePage)

navTodo.addEventListener('click', () => {setPage(1); setCurrentActivePage(1)})
navNotes.addEventListener('click', () => {setPage(2); setCurrentActivePage(2)})
navReminders.addEventListener('click', () => {setPage(3); setCurrentActivePage(3)})


const root = document.getElementById('root')



