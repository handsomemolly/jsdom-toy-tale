let addToy = false;
let toys;
const toyContainer = document.getElementById('toy-collection')
let newToy;


function fetchToys() {
  return fetch(`http://localhost:3000/toys`)
  .then(res => res.json())
  .then(json => storeToys(json))
}

function storeToys(json) {
  toys = json;
}

function x(toy) {
  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let p = document.createElement('p')
  let btn = document.createElement('button')
  h2.innerText = toy.name
  img.src = toy.image
  p.innerText = toy.likes
  btn.classList.add('like-btn')
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(btn)
  toyContainer.appendChild(div)
}

function renderToys() {
  toys.forEach(toy => {
    x(toy)
  })
}

function renderNewToy() {
  x(newToy)
}


function handleNewToy(e) {
  e.preventDefault()
  let valArray = document.getElementsByClassName('input-text')
  let name = valArray[0].value 
  let image = valArray[1].value
  let temp = {
    name: name,
    image: image,
    likes: 0
  }
  newToy = temp
}


function postToy() {
  
    let data = {
        name: newToy.name,
        image: newToy.image,
        likes: newToy.likes
    };
    let obj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch("http://localhost:3000/toys", obj)
    .then(function(response) {
        return response.json();
    })
    .then(function(object) {
        x(object);
    })
}



  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const newBtn = document.getElementsByClassName("submit")[0]

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  newBtn.addEventListener("click", () => {
      handleNewToy()
      postToy()
      console.log('hey')
  });

  fetchToys()

