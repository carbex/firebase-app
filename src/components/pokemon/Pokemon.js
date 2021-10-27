import React, { useState, useEffect } from "react";
import axios from 'axios';

function Pokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  console.log(pokemon)

  useEffect(() => {
      setIsLoading(true)
    const callApi = async () => {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/25')
        setPokemon(response.data)
        setIsLoading(false)
    }
    callApi()
  }, [])

  if(isLoading) return 'Chargement.....'

  return (
    <div>
      <h1>{pokemon?.name}</h1>
      {pokemon && <img src={pokemon?.sprites.front_default} alt={pokemon.name} />}
      
    </div>
  );
}

export default Pokemon;
