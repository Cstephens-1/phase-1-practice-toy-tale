let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  toggleMenu();
  createToy();
  getToys();
  
  function createToy(){
    const newToyForm = document.querySelector(".add-toy-form")

    newToyForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const newToyName = e.target.name.value
      const newToyImage = e.target.image.value

      const toy = {
        name: newToyName,
        image: newToyImage,
        likes : 0
      }

      const configObj = {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify(toy)
      }

    fetch("http://localhost:3000/toys", configObj)
    .then(resp => resp.json())
    .then(newToy => renderToys(newToy))
  })
  }

  function renderToys(toy){
  const toyContainer = document.querySelector("#toy-collection")
  //create a card for each item.
  const newToyCard = document.createElement("div")
  newToyCard.className = "card"

  const cardH2 = document.createElement("h2")
  cardH2.textContent = toy.name

  const cardImg = document.createElement("img")
  cardImg.src = toy.image
  cardImg.className = "toy-avatar"

  const cardLikes = document.createElement("p")
  cardLikes.textContent = toy.likes + " Likes"

  const cardBtn = document.createElement("button")
  cardBtn.className = "like-btn"
  cardBtn.id = toy.id
  cardBtn.textContent = "Like"
  cardBtn.addEventListener("click",() => likesButton(toy))


  newToyCard.append(cardH2, cardImg, cardLikes, cardBtn)
  toyContainer.append(newToyCard)
  }


  function likesButton(toy){

    const likes = ++toy.likes
    const toyLikes = document.getElementById(`${toy.id}`).parentNode.childNodes[2]
    toyLikes.textContent = toy.likes + " Likes"
    
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH", 
      headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ likes: likes})
      })
  }

  function getToys(){
    fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toys => toys.forEach((toy) => renderToys(toy)))
  }

//give the add toy buttton functionality to toggle the menu
  function toggleMenu(){
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    addBtn.addEventListener("click", () => {
      // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
        toyFormContainer.style.display = "block";
      } else {
        toyFormContainer.style.display = "none";
      }
    });
  }
});




 