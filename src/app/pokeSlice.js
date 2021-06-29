import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPokemons = createAsyncThunk(
  'poke/fetchPokemonsStatus',
  async () => {
    const response = await axios.get(
      'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151'
    );
    return response.data.results;
  }
);

export const fetchDetailedPokemon = createAsyncThunk(
  'poke/fetchDetailedPokemonStatus',
  async (pokeId) => {
    const response1 = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokeId}`
    );
    const response2 = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${pokeId}`
    );

    const response3 = await axios.get(
      `https://pokeapi.co/api/v2/evolution-chain/${pokeId}`
    );

    const { id, weight, name, types, abilities, sprites, stats, height } =
      response1.data;
    const { flavor_text_entries } = response2.data;
    const { chain } = response3.data;
    const desc = flavor_text_entries[1];
    return {
      id,
      weight,
      height,
      name,
      types,
      abilities,
      sprites,
      stats,
      desc,
      chain,
    };
  }
);

const pokeSlice = createSlice({
  name: 'poke',
  initialState: {
    list: [],
    detailedPokemon: [],
    status: null,
  },
  reducers: {},
  extraReducers: {
    [fetchPokemons.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.status = 'success';
    },
    [fetchDetailedPokemon.fulfilled]: (state, action) => {
      state.detailedPokemon = state.detailedPokemon.concat(action.payload);
    },
  },
});

export default pokeSlice.reducer;
