function removeClass(element, classStr) {
  if (element)
    element.className = (' ' + element.className + ' ').split(' ' + classStr + ' ').join(' ');
}
function addClass(element, classStr) {
  if (element)
    element.className += ' ' + classStr;
}
class NoteConstructor {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
}




const todoPageContent = document.getElementById('todo_content')
const notePageContent = document.getElementById('note_content')
const reminderPageContent = document.getElementById('reminder_content')
const fetchAllTodos = async () => {
  const response = await fetch('http://localhost:3000/api/todos')
  const data = await response.json()
  return data;
}


const fetchAllNotes = async () => {
  const response = await fetch('http://localhost:3000/api/notes')
  const data = await response.json()
  return data;
}


const fetchAllReminders = async () => {
  const response = await fetch('http://localhost:3000/api/reminders')
  const data = await response.json()
  return data;
}



const rePopulateContent = async (fetchId) => {
  todoPageContent.innerHTML = ""
  notePageContent.innerHTML = ""
  reminderPageContent.innerHTML = ""
  switch (fetchId) {
    case 1: {
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
    case 2: {
      
    const allNoteItems = await fetchAllNotes()
    console.log(`all notes ${allNoteItems}`)
    const noteContentReadOnlyMode = 'text-lg pl-1 bg-transparent text-white border-2 border-solid border-transparent outline-none'
    allNoteItems.forEach(n => {
        //Creating details tag with fetched content inside
        const noteElement = document.createElement('details')
        const noteTitle = document.createElement('summary')
        const noteContent = document.createElement('input')
        const noteContentWrapper = document.createElement('div')
        noteContent.readOnly = true

        //INITIATING Edit/Save/Delete Note
        const noteSettings = document.createElement('div')
        const settingsEdit = document.createElement('button')
        const settingsEditImg = document.createElement('img')
        settingsEditImg.src = 'https://i.imgur.com/c4ZYU6r.png'
        settingsEdit.appendChild(settingsEditImg)
        const settingsSave = document.createElement('button')
        const settingsSaveImg = document.createElement('img')
        settingsSaveImg.src = 'https://i.imgur.com/5c7JrnW.png'
        settingsSave.appendChild(settingsSaveImg)
        const settingsDelete = document.createElement('button')
        const settingsDeleteImg = document.createElement('img')
        settingsDeleteImg.src = 'https://i.imgur.com/Ey0yR4T.png'
        settingsDelete.appendChild(settingsDeleteImg)

        //CONFIRM DELETE
        const confirmDelete = document.createElement('div')
        const confirmDeleteText = document.createElement('span')
        confirmDeleteText.textContent = 'Delete current note?'
        const confirmDeleteBtn = document.createElement('button')
        confirmDeleteBtn.textContent = 'CONFIRM'
        const cancelDeleteBtn = document.createElement('button')
        cancelDeleteBtn.textContent = '↺'
        addClass(confirmDelete, 'hidden scale-0 bg-red-400 justify-between ')
        addClass(confirmDeleteText, 'text-lg ')
        addClass(confirmDeleteBtn, 'text-lg font-bold border-solid border-2 border-red-600 rounded-lg ')
        addClass(cancelDeleteBtn, 'text-lg color-slate-600 border-solid border-2 border-slate-600 rounded-lg px-2')

        confirmDeleteBtn.addEventListener('click', () => {
            removeClass(confirmDelete, 'scale-100')
            addClass(confirmDelete, 'scale-0 hidden')
            removeClass(noteSettings, 'hidden')
            addClass(noteSettings, 'block')
        })
        cancelDeleteBtn.addEventListener('click', () => {
            removeClass(confirmDelete, 'scale-100')
            addClass(confirmDelete, 'scale-0 hidden')
            removeClass(noteSettings, 'hidden')
            addClass(noteSettings, 'block')
        })

        confirmDelete.appendChild(confirmDeleteText)
        confirmDelete.appendChild(cancelDeleteBtn)
        confirmDelete.appendChild(confirmDeleteBtn)



        //SETTINGS BUTTONS STYLES
        addClass(settingsEdit, ' w-10 h-10 p-[0.5em] border-solid border-4 border-slate-700 rounded-lg ')
        addClass(settingsSave, ' w-10 h-10 hidden p-[0.5em] border-solid border-4 border-green-600 rounded-lg')
        addClass(settingsDelete, ' w-10 h-10 p-[0.5em] ml-2 border-solid border-4 border-red-600 rounded-lg')
        noteSettings.appendChild(settingsEdit)
        noteSettings.appendChild(settingsSave)
        noteSettings.appendChild(settingsDelete)

        //SETTINGS BUTTONS EVENT LISTENERS
        //EDIT
        settingsEdit.addEventListener('click', () => {
            addClass(settingsEdit, 'hidden')
            addClass(settingsSave, 'inline')
            removeClass(settingsEdit, 'inline')
            removeClass(settingsSave, 'hidden')
            noteContent.readOnly = false
            removeClass(noteContent, 'border-transparent')
            addClass(noteContent, 'border-slate-700')
            noteContent.focus()
        })


        //SAVE
        settingsSave.addEventListener('click', () => {
            console.log('initial save press')
            addClass(settingsEdit, 'inline')
            addClass(settingsSave, 'hidden')
            removeClass(settingsEdit, 'hidden')
            removeClass(settingsSave, 'inline')
            noteContent.readOnly = true
            removeClass(noteContent, 'border-slate-700')
            addClass(noteContent, 'border-transparent')

            const updateNote = async () => {
                const body = new NoteConstructor(noteTitle.textContent, noteContent.value)
                console.log(body)
                try {
                    const response = await fetch(`http://localhost:3000/api/notes/${n?._id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body)
                    })
                    const data = await response.json()
                    console.log(data)
                } catch (error) {
                    console.log(`Error while updating requested note: ${error}`)
                }
            }
            updateNote()

        })
        //DELETE
        settingsDelete.addEventListener('click', () => {
            removeClass(confirmDelete, 'scale-0 ')
            removeClass(confirmDelete, 'hidden')
            addClass(confirmDelete, 'scale-100 flex')
            removeClass(noteSettings, 'flex')
            addClass(noteSettings, 'hidden')
        })


        addClass(noteTitle, 'text-xl font-bold mx-1 pl-2')
        addClass(noteContent, noteContentReadOnlyMode)
        addClass(noteSettings, ' block text-right mt-4')
        addClass(noteContentWrapper, ' flex flex-col border-accent border-solid border-2 mx-1 bg-accent rounded-b-md scale-0 transition-all ease-linear group-open:scale-100 ')
        addClass(noteElement, 'open:border-solid open:border-2 open:border-secondary open:bg-accent hover:cursor-pointer group')

        noteTitle.textContent = n.title
        noteContent.value = n.content
        noteContentWrapper.appendChild(noteContent)
        noteContentWrapper.appendChild(noteSettings)
        noteContentWrapper.appendChild(confirmDelete)
        noteElement.appendChild(noteTitle)
        noteElement.appendChild(noteContentWrapper)
        notePageContent.appendChild(noteElement)
    })
      break
    }
    case 3: {
      const allReminderItems = await fetchAllReminders()

      allReminderItems.forEach(r => {
        const reminderElement = document.createElement('details')
        const reminderTitle = document.createElement('summary')
        const reminderContent = document.createElement('div')
        const reminderDate = document.createElement('div')
        const reminderDateString = new Date(r.dateToRemind)


        addClass(reminderTitle, 'text-xl font-bold mx-1')
        addClass(reminderContent, 'text-white text-lg border-accent border-solid border-2 mx-1 bg-accent rounded-b-md scale-0 transition-all ease-linear group-open:scale-100')
        addClass(reminderElement, 'open:border-solid open:border-2 open:border-secondary open:bg-accent hover:cursor-pointer group ')


        reminderTitle.textContent = r.title
        reminderContent.textContent = r.content
        reminderDate.textContent = reminderDateString.toDateString()
        reminderElement.appendChild(reminderTitle)
        reminderElement.appendChild(reminderContent)
        reminderElement.appendChild(reminderDate)
        reminderPageContent.appendChild(reminderElement)
      });
      
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
  } catch (err) {
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

