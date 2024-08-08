const stuff = [
    {
        id: 1,
        name: 'pp1'
    },
    {
        id: 2,
        name: 'pp2'
    },
    {
        id: 3,
        name: 'pp3'
    }
]

const content = document.getElementById('content')

const addP = document.getElementById('addsmth')
const txt = document.createElement("p")

const addStruc = (data) => {
    console.log(data)
    const newElem = document.createElement('div')
    
    data.forEach(d => {
        const elemTitle = document.createElement('h2')
        elemTitle.textContent = d.name
        newElem.appendChild(elemTitle)
    });

    content.appendChild(newElem)
}

addP.addEventListener('click', () => addStruc(stuff))
txt.textContent = "Something something"

