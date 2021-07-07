import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Container,
  Card,
  PokemonID,
  Types,
  Type,
  SearchBar,
  List,
} from '../styles/mainStyles';
import _ from 'lodash';
import PokemonCard from './PokemonCard';
import {
  fetchPokemons,
  fetchDetailedPokemon,
  clearDetailed,
} from '../app/pokeSlice';
import LoadingScreen from './LoadingScreen';

const Main = () => {
  const [searchText, setSearchText] = useState('');
  const [showDetailed, setShowDetailed] = useState(false);
  const [activePokemon, setActivePokemon] = useState('');
  const [activeType, setActiveType] = useState('');
  const [offsets, setOffsets] = useState({
    offset: 0,
    limit: 151,
  });
  const typesList = [
    'grass',
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy',
    'shadow',
  ];
  const poke = useSelector((state) => state.poke);
  const dispatch = useDispatch();

  const fetchBasedOnOffset = () => {
    dispatch(clearDetailed());
    dispatch(fetchPokemons(offsets)).then((res) => {
      res.payload.forEach((x) => dispatch(fetchDetailedPokemon(x.name)));
    });
  };
  useEffect(() => {
    fetchBasedOnOffset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offsets]);

  const renderList = (array) => {
    return array.map((poke) => {
      return (
        <Card
          key={poke.name}
          color={poke.types[0].type.name}
          onClick={() => {
            setActivePokemon(poke.id);
            setShowDetailed(true);
          }}
        >
          <PokemonID>#{('00' + poke.id).slice(-3)}</PokemonID>
          <img
            src={poke.sprites.other['official-artwork'].front_default}
            alt={poke.name}
          />
          <span>{_.upperFirst(poke.name)}</span>
          <Types>{renderTypes(poke.types)}</Types>
        </Card>
      );
    });
  };
  const onSearch = (e) => {
    setSearchText(e.target.value);
  };

  const RenderDefault = () => {
    if (poke.detailedPokemonList[offsets.limit - 1]) {
      const sorted = poke.detailedPokemonList
        .slice()
        .sort((a, b) => a.id - b.id);
      if (activeType === '') {
        return renderList(sorted);
      } else {
        const sortedByType = sorted.filter(
          (poke) =>
            poke.types[0].type.name === activeType ||
            poke.types[1]?.type?.name === activeType
        );
        return renderList(sortedByType);
      }
    }
    return <LoadingScreen />;
  };

  const RenderSearch = () => {
    if (poke.detailedPokemonList[offsets.limit - 1]) {
      const sorted = poke.detailedPokemonList
        .slice()
        .sort((a, b) => a.id - b.id);
      const filtered = sorted.filter((poke) =>
        poke.name.includes(searchText.toLowerCase())
      );
      return renderList(filtered);
    }
    return <LoadingScreen />;
  };

  const renderTypes = (types) => {
    return types.map((type) => {
      return (
        <Type key={type.type.name} color={type.type.name}>
          {_.upperFirst(type.type.name)}
        </Type>
      );
    });
  };

  return (
    <Container>
      {showDetailed ? (
        <PokemonCard
          active={activePokemon}
          setShowDetailed={setShowDetailed}
          setActivePokemon={setActivePokemon}
        />
      ) : (
        <>
          <SearchBar>
            Generation:
            <div>
              <button
                onClick={() => {
                  setOffsets({ offset: 0, limit: 151 });
                }}
              >
                I
              </button>
              <button
                onClick={() => {
                  setOffsets({ offset: 152, limit: 99 });
                }}
              >
                II
              </button>
              <button
                onClick={() => {
                  setOffsets({ offset: 251, limit: 135 });
                }}
              >
                III
              </button>
              <button
                onClick={() => {
                  setOffsets({ offset: 386, limit: 107 });
                }}
              >
                IV
              </button>
              <button
                onClick={() => {
                  setOffsets({ offset: 493, limit: 156 });
                }}
              >
                V
              </button>
              <button
                onClick={() => {
                  setOffsets({ offset: 649, limit: 72 });
                }}
              >
                VI
              </button>
              <button
                onClick={() => {
                  setOffsets({ offset: 721, limit: 88 });
                }}
              >
                VII
              </button>
              <button
                onClick={() => {
                  setOffsets({ offset: 809, limit: 88 });
                }}
              >
                VIII
              </button>
            </div>
            <div>Search:</div>
            <input
              type="text"
              value={searchText}
              onChange={(e) => onSearch(e)}
            />
            <div>Select Type:</div>
            <select
              onChange={(e) => setActiveType(e.target.value)}
              value={activeType}
            >
              <option value="">All Types</option>
              {typesList.map((type) => (
                <option value={type} key={type}>
                  {_.upperFirst(type)}
                </option>
              ))}
            </select>
          </SearchBar>

          <List>{searchText === '' ? RenderDefault() : RenderSearch()}</List>
        </>
      )}
    </Container>
  );
};

export default Main;
