import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons, fetchDetailedPokemon } from './app/pokeSlice';
import Main from './components/Main';
const App = () => {
  const poke = useSelector((state) => state.poke);
  const dispatch = useDispatch();
  useEffect(() => {
    if (poke.list[1]) {
      return;
    }
    dispatch(fetchPokemons()).then((res) => {
      res.payload.forEach((x, index) =>
        dispatch(fetchDetailedPokemon(index + 1))
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Main />;
};

export default App;
