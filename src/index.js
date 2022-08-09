let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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


  fetch('http://localhost:3000/toys')
    .then (response => response.json())
    .then(toys => {
      // console.log(toys)
      toyCollection = document.getElementById('toy-collection')
      
     for(const toy of toys) {
        const div = document.createElement('div')
        div.className = 'card'
        let h2 = document.createElement('h2')
        h2.innerText = toy.name
        let img = document.createElement('img')
        img.className = 'toy-avatar'
        img.src = toy.image
        const p = document.createElement('p')
        p.innerText = toy.likes + ' Likes'
        const btn = document.createElement('button')
        btn.className = 'like-btn'
        btn.setAttribute('id', `${toy.id}`)
        btn.innerText = 'Like ❤️'
        btn.addEventListener('click', e => {
          // console.log(toy.likes)
          const newNumberOfLikes = toy.likes++
          fetch(`http://localhost:3000/toys/${toy.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type' : 'application/json',
              Accept : 'application/json'
            },
            body: JSON.stringify({
              'likes': newNumberOfLikes
            }) 
          })
          .then(res => res.json())
          .then(data => {
            p.innerText = `${newNumberOfLikes} Likes`
          })
        })
        div.appendChild(img)
        div.appendChild(h2)
        div.appendChild(p)
        div.appendChild(btn)
        toyCollection.appendChild(div)
      }
    })


  const createToyBtn = document.querySelector('.add-toy-form')
  createToyBtn.addEventListener('submit', (e) => {
    e.preventDefault()
    const formInput = document.querySelectorAll('.input-text')
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        Accept : 'application/json'
      },
      body: JSON.stringify({
        "name": formInput[0].value,
        "image": formInput[1].value,
        "likes": 0
      })
    })
    .then(response => response.json())
    .then(toy => {
      console.log(toy)
      const div = document.createElement('div')
      div.className = 'card'
      let h2 = document.createElement('h2')
      h2.innerText = toy.name
      let img = document.createElement('img')
      img.className = 'toy-avatar'
      img.src = toy.image
      const p = document.createElement('p')
      p.innerText = toy.likes + ' Likes'
      const btn = document.createElement('button')
      btn.className = 'like-btn'
      btn.setAttribute('id', `${toy.id}`)
      btn.innerText = 'Like ❤️'
      btn.addEventListener('click', e => {
        // console.log(toy.likes)
        const newNumberOfLikes = toy.likes++
        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type' : 'application/json',
            Accept : 'application/json'
          },
          body: JSON.stringify({
            'likes': newNumberOfLikes
          }) 
        })
        .then(res => res.json())
        .then(data => {
          p.innerText = `${newNumberOfLikes} Likes`
        })
      })
      div.appendChild(img)
      div.appendChild(h2)
      div.appendChild(p)
      div.appendChild(btn)
      toyCollection.appendChild(div)
    })
    createToyBtn.reset()
  })
  
});
