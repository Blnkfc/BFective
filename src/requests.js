function removeClass (element, classStr) {
    element.className = (' '+element.className+' ').split(' ' + classStr + ' ').join(' ');
}
function addClass (element, classStr){
    element.className += ' ' + classStr;
}


const todoPageContent = document.getElementById('todo_content')
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
    let allContentItems = []
    switch(fetchId){
      case 1:{
        allContentItems = await fetchAllTodos()
      }
      case 2:{
        allContentItems = await fetchAllNotes()
      }
      case 3:{
        allContentItems = await fetchAllReminders()
      }
    }

    allContentItems.forEach(t => {
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
    rePopulateTodos()
  });



