let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const toyCollection = document.getElementById('toy-collection')

  fetch('http://localhost:3000/toys')
  .then((response) => response.json())
  .then((toys) => {
    toys.forEach((toy) => {
        const card = createToyCards(toy);
        toyCollection.appendChild(card)
    });
  });

    function createToyCards(toy) {
        const card = document.createElement("div");
        card.classList.add('card')

        const h2 = document.createElement('h2');
        h2.textContent = toy.name

        const img = document.createElement('img');
        img.src = toy.image
        img.classList.add('toy-avatar');

        const p = document.createElement('p')
        p.textContent = `${toy.likes} likes`;

        const button = document.createElement('button')
        button.classList.add('like-btn');
        button.id = toy.id;
        button.textContent = "Like ❤️"

        button.addEventListener('click', () =>{
          increasesLikes(toy);
        });

        card.appendChild(h2);
        card.appendChild(img);
        card.appendChild(p);
        card.appendChild(button);

        return card;

    };

    function increasesLikes(toy) {
      const newNumberOfLikes = toy.likes + 1;

      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({likes: newNumberOfLikes })
      })
      
      .then((response) => response.json())
      .then((updatedToy) => {
      const likeButton = document.getElementById(updatedToy.id);
      const likeCount = likeButton.parentElement.querySelector('p');

      likeCount.textContent = `${updatedToy.likes} likes`;
    });

    };

    const nameInput = document.querySelector(".add-toy-form input[name = 'name']")
    const imageInput = document.querySelector(".add-toy-form input[name = 'image']")

    nameInput.id = "name"
    imageInput.id = "image"

    const newToyForm = document.querySelector(".add-toy-form");
      newToyForm.addEventListener("submit", (event) => {
        event.preventDefault();
          const name = newToyForm.querySelector('#name').value
          const image = newToyForm.querySelector('#image').value
          
        fetch('http://localhost:3000/toys',{
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: name,
            image: image,
            likes: 0
          })
        })
          .then((response) => response.json())
          .then((newToy) => {
              const card = createToyCards(newToy)
              const toyCollection = document.getElementById("toy-collection");
              toyCollection.appendChild(card);

              toyform.reset();
          });
      });

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
});
