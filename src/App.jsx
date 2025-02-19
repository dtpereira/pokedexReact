import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState({});

  const getPokemons = (id) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
      const pokemon = response.data;
      setPokemons((prevPokemons) => ({ ...prevPokemons, [id]: pokemon }));
    });
  };

  const arrayPokemons = () =>
    Array(150)
      .fill()
      .map((_, index) => getPokemons(index + 1));

  useEffect(() => {
    arrayPokemons();
  }, []);

  return (
    <div className="container">
      <h1>Diego Pokedex</h1>

      <ul className="pokemons">
        {Object.values(pokemons).map(({ id, name, types }) => (
          <li className={`card ${types[0].type.name}`}>
            <img
              className="card-image"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt={name}
            />
            <h2>
              {id}.{name}
            </h2>
            <p className="type">
              {types.map((item) => item.type.name).join(" || ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
