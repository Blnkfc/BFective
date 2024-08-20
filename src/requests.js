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

const rePopulateTodos = async () => {
    todoPageContent.innerHTML = ""
    const allTodos = await fetchAllTodos()
    console.log(allTodos)
    allTodos.forEach(t => {
        const todoElement = document.createElement('details')
        const todoTitle = document.createElement('summary')
        const todoContent = document.createElement('p')


        addClass(todoTitle, 'text-xl font-bold ')
        addClass(todoContent, 'text-lg')


        todoTitle.textContent = t.title
        todoContent.textContent = t.content
        todoElement.appendChild(todoTitle)
        todoElement.appendChild(todoContent)
        todoPageContent.appendChild(todoElement)
    });
}

rePopulateTodos()

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



