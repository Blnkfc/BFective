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
    let allContentItems = []
    switch(fetchId){
      case 1:{
        allTodoItems = await fetchAllTodos()
        console.log(`all todos ${allTodoItems}`)
        allTodoItems.forEach(t => {
          const todoElement = document.createElement('details')
          const todoTitle = document.createElement('summary')
          const todoContent = document.createElement('p')
  
  
          
          addClass(todoTitle, 'text-xl font-bold pl-4')
          addClass(todoContent, 'text-lg pl-2')
  
  
          todoTitle.textContent = t.title
          todoContent.textContent = t.content
          todoElement.appendChild(todoTitle)
          todoElement.appendChild(todoContent)
          todoPageContent.appendChild(todoElement)
      });
        break
      }
      case 2:{
        allNoteItems = await fetchAllNotes()
        console.log(`all notes ${allNoteItems}`)
        allNoteItems.forEach(n => {
          const noteElement = document.createElement('details')
          const noteTitle = document.createElement('summary')
          const noteContent = document.createElement('input')
          noteContent.readOnly = true

          addClass(noteTitle, 'text-xl font-bold pl-4')
          addClass(noteContent, 'text-lg pl-2')

          noteTitle.textContent = n.title
          noteContent.textContent = n.content
          noteElement.appendChild(noteTitle)
          noteElement.appendChild(noteContent)
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

