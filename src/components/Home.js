import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {

  const [chosenPet, setChosenPet] = useState([])
  const [pets, setPets] = useState([])
  const [users, setUsers] = useState([])
  const [nameclass, setNameclass] = useState("")
  const [params, setParams] = useState("")
  const [petImage, setPetImage] = useState("")

  useEffect(() => {
    console.log("use effect running")
    axios.get("/api/pets")
      .then(response => response.data)
      .then(setPets([response.data]))
  }, [params])

  const feedPet = (ev, pet) => {
    const id = pet.id
    const feed = ev.target.innerText
    if (pet.hunger_level > 0) {
      axios
        .put(`/api/pets/${feed}`, { id })
        .then(response => setChosenPet([response.data]))
    } else {
      alert(`${pet.name} is full! You can't feed her anymore`)
      setPetImage(pet.love_image)
    }
  }

  const playWithPet = (ev, pet) => {
    const id = pet.id
    const play = ev.target.innerText
    if (pet.tired_level < 5) {
      axios
        .put(`/api/pets/${play}`, { id })
        .then(response => setChosenPet([response.data]))
    } else {
      alert(`${pet.name} is too tired! Have her take a nap!`)
      setPetImage(pet.tired_image)
    }
  }

  const takeANap = (ev, pet) => {
    const id = pet.id
    const nap = ev.target.innerText

    if (pet.tired_level > 0) {
      axios
        .put(`/api/pets/${nap}`, { id })
        .then(response => setChosenPet([response.data]))
    } else {
      alert(`${pet.name} is Wide Awake! Time to play!`)
      setPetImage(pet.play_image)
    }
  }

  const reduceLoveLevel = (ev, pet) => {
    const id = pet.id
    const switchButton = ev.target.innerText

    axios.put(`/api/pets/${switchButton}`, { id }).then(response => {
      setChosenPet([response.data])
    })
  }

  return (
    <div className="section">
      <div className="banner">
        <h1>Pet</h1>
        <h2>Select a pet by clicking a photo!</h2>
      </div>
      <div className="pets">
        {pets.map(pet => {
          return (
            <div key={pet.id}>
              <img
                src={pet.image}
                onClick={ev => {
                  setChosenPet([pet])
                  setParams("selected")
                  setPetImage(pet.image)
                }}
              />
              <div className="stats">
                <br />
                        Stats:
                        <br />
                        love: {pet.love_level}
                <br />
                        hunger: {pet.hunger_level}
                <br /> tired: {pet.tired_level}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


export default Home;
