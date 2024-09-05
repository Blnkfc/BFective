function removeClass (element, classStr) {
  if(element)
      element.className = (' '+element.className+' ').split(' ' + classStr + ' ').join(' ');
}
function addClass (element, classStr){
  if(element)
      element.className += ' ' + classStr;
}


const todoPageContent = document.getElementById('todo_content')
const notePageContent = document.getElementById('note_content')
const reminderPageContent = document.getElementById('reminder_content')
const fetchAllTodos = async () => {
    const response =  await fetch('http://localhost:3000/api/todos')
    const data = await response.json()
    return data;
}
const fetchAllNotes = async () => {
    const response =  await fetch('http://localhost:3000/api/notes')
    const data = await response.json()
    return data;
}
const fetchAllReminders = async () => {
    const response =  await fetch('http://localhost:3000/api/reminders')
    const data = await response.json()
    return data;
}

const rePopulateContent = async (fetchId) => {
    todoPageContent.innerHTML = ""
    notePageContent.innerHTML = ""
    reminderPageContent.innerHTML = ""
    switch(fetchId){
      case 1:{
        const allTodoItems = await fetchAllTodos()
        console.log(`all todos ${allTodoItems}`)
        allTodoItems.forEach(t => {
          const todoElement = document.createElement('details')
          const todoTitle = document.createElement('summary')
          const todoContent = document.createElement('div')
  
  
          
          addClass(todoTitle, 'text-xl font-bold mx-1')
          addClass(todoContent, 'text-white text-lg border-accent border-solid border-2 mx-1 bg-accent rounded-b-md scale-0 transition-all ease-linear group-open:scale-100')
          addClass(todoElement, 'open:border-solid open:border-2 open:border-secondary open:bg-accent hover:cursor-pointer group ')
  
  
          todoTitle.textContent = t.title
          todoContent.textContent = t.content
          todoElement.appendChild(todoTitle)
          todoElement.appendChild(todoContent)
          todoPageContent.appendChild(todoElement)
      });
        break
      }
      case 2:{
        const allNoteItems = await fetchAllNotes()
        console.log(`all notes ${allNoteItems}`)
        const noteContentReadOnlyMode = 'text-lg pl-1 bg-transparent text-white border-none outline-none'
        allNoteItems.forEach(n => {
          const noteElement = document.createElement('details')
          const noteTitle = document.createElement('summary')
          const noteContent = document.createElement('input')
          const noteContentWrapper = document.createElement('div')
          noteContent.readOnly = true

          const noteSettings = document.createElement('div')
          const settingsEdit = document.createElement('button')
          const settingsSave = document.createElement('button')
          const settingsDelete = document.createElement('button')

          settingsEdit.textContent = "E"
          settingsSave.textContent = "S"
          settingsDelete.textContent = "D"
          noteSettings.appendChild(settingsEdit)
          noteSettings.appendChild(settingsSave)
          noteSettings.appendChild(settingsDelete)

          

          addClass(noteTitle, 'text-xl font-bold mx-1 pl-2')
          addClass(noteContent, noteContentReadOnlyMode)
          addClass(noteContentWrapper, 'border-accent border-solid border-2 mx-1 bg-accent rounded-b-md scale-0 transition-all ease-linear group-open:scale-100 ')
          addClass(noteElement, 'open:border-solid open:border-2 open:border-secondary open:bg-accent hover:cursor-pointer group')

          noteTitle.textContent = n.title
          noteContent.value = n.content
          noteContentWrapper.appendChild(noteContent)
          noteContentWrapper.appendChild(noteSettings)
          noteElement.appendChild(noteTitle)
          noteElement.appendChild(noteContentWrapper)
          notePageContent.appendChild(noteElement)
        })
        break
      }
      case 3:{
        allContentItems = await fetchAllReminders()
        break
      }
    }

    
}

rePopulateContent(1)

const addTodoBtn = document.getElementById('add_content')
addTodoBtn.addEventListener('click', async () => {
    try {     
      const response = await fetch('http://localhost:3000/api/todos', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: 'post',
        body: JSON.stringify({
            "title": "New todo",
            "content": "Do this rn."
          })
      });
      console.log('Completed!', response);
    } catch(err) {
      console.error(`Error: ${err}`);
    }
    rePopulateContent(1)
  });



  const navTodoBtn = document.getElementById('nav-todo')
  const navNoteBtn = document.getElementById('nav-notes')
  const navReminderBtn = document.getElementById('nav-reminders')
  navTodoBtn.addEventListener('click', () => rePopulateContent(1))
  navNoteBtn.addEventListener('click', () => rePopulateContent(2))
  navReminderBtn.addEventListener('click', () => rePopulateContent(3))

