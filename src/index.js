let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector('form')

  toyForm.addEventListener('submit', handleSubmit)


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//DATA
function fetchToys() {
  fetch(`http://localhost:3000/toys`)
  .then(res => res.json())
  .then(toys => toys.forEach(toy => buildCard(toy)))
}

function postToys(toy) {
  fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    headers: {
        "Content Type": "application/json",
        Accept: "application/json"
    },
      body: JSON.stringify(toy) 
  })
  .then(res => res.json())
  .then(toy => buildCard(toy))
}

function updateToy(toy) {
  toy.likes++ 

  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method:'PATCH',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({likes: toy.likes})
  })
  .then(res => res.json())
  .then(toy => {
    let oldToy = document.getElementById(toy.id)
    let p = oldToy.querySelector('p')
    p.textContent = `${toy.likes} Likes`
  })
}


//DOM
function buildCard(toy) {
  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let p = document.createElement('p')
  let btn = document.createElement('button')

  let toyCollection = document.querySelector('#toy-collection')

  div.className = 'card'
  div.id = toy.id
  h2.textContent = toy.name
  img.src = toy.image
  img.className = 'toy-avatar'
  p.textContent = `${toy.likes} likes`
  btn.className = 'like-btn'
  btn.textContent = 'Like <3'

  btn.addEventListener('click', () => updateToy(toy))

  div.append(h2, img, p, btn)
  toyCollection.appendChild(div)

}

//Handle
function handleSubmit(e) {
  e.preventDefault()
  let toy = {
    name: e.target.name.value, //grab the name *value* attribute from the input on HTML
    image: e.target.image.value, 
    likes: 0
  }
  postToys(toy) 
}
