import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPokemons = createAsyncThunk(
  'poke/fetchPokemonsStatus',
  async (offsets) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offsets.offset}&limit=${offsets.limit}`
    );
    return response.data.results;
  }
);

export const fetchDetailedPokemon = createAsyncThunk(
  'poke/fetchDetailedPokemonStatus',
  async (pokeName) => {
    const response1 = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokeName}`
    );

    const { id, name, types, sprites } = response1.data;

    return {
      id,
      name,
      types,
      sprites,
    };
  }
);

export const fetchActiveDetails = createAsyncThunk(
  'poke/fetchActiveDetailsStatus',
  async (pokeId) => {
    const response1 = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokeId}`
    );

    const response2 = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${pokeId}`
    );

    const response3 = await axios.get(response2.data.evolution_chain.url);
    const { id, name, types, sprites, weight, height, abilities, stats } =
      response1.data;
    const { flavor_text_entries } = response2.data;
    const { chain } = response3.data;
    const desc = flavor_text_entries[1].flavor_text;
    return {
      id,
      name,
      types,
      sprites,
      weight,
      height,
      desc,
      chain,
      abilities,
      stats,
    };
  }
);

export const fetchEvoPokemon = createAsyncThunk(
  'poke/fetchEvoPokemonStatus',
  async (pokeName) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokeName}`
    );
    const { sprites, name, order } = response.data;
    return { sprites, name, order };
  }
);

const pokeSlice = createSlice({
  name: 'poke',
  initialState: {
    detailedPokemonList: [],
    evoChain: [],
    activeDetails: [],
  },
  reducers: {
    clearEvoAndActive(state) {
      state.evoChain = [];
      state.activeDetails = [];
    },
    clearDetailed(state) {
      state.detailedPokemonList = [];
    },
  },
  extraReducers: {
    [fetchDetailedPokemon.fulfilled]: (state, action) => {
      state.detailedPokemonList = state.detailedPokemonList.concat(
        action.payload
      );
    },
    [fetchEvoPokemon.fulfilled]: (state, action) => {
      state.evoChain = state.evoChain.concat(action.payload);
    },
    [fetchActiveDetails.fulfilled]: (state, action) => {
      state.activeDetails = action.payload;
    },
  },
});
export const { clearEvoAndActive, clearDetailed } = pokeSlice.actions;
export default pokeSlice.reducer;
