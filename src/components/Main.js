import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';
import PokemonCard from './PokemonCard';
import TypeSwitch from '../utils/TypeSwitch';
import {
  fetchPokemons,
  fetchDetailedPokemon,
  clearDetailed,
} from '../app/pokeSlice';

const Main = () => {
  const [searchText, setSearchText] = useState('');
  const [showDetailed, setShowDetailed] = useState(false);
  const [activePokemon, setActivePokemon] = useState('');
  const [offsets, setOffsets] = useState({
    offset: 0,
    limit: 151,
  });
  console.log(offsets);
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
      return renderList(sorted);
    }
    return <div>Loading</div>;
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
    return <div>Loading</div>;
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
            Search:
            <input
              type="text"
              value={searchText}
              onChange={(e) => onSearch(e)}
            />
          </SearchBar>

          <List>{searchText === '' ? RenderDefault() : RenderSearch()}</List>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 0px;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  align-items: center;
  button {
    border: none;
    background: #8cc9ff;
    border-radius: 25%;
    font-size: 17px;
    padding: 5px 10px;
    margin: 0px 5px;
    &:hover {
      cursor: pointer;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-left: 50px;
  margin-right: 50px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 350px;
  width: 250px;
  margin: 25px;
  border-radius: 25px;
  background: rgba(${(props) => TypeSwitch(props.color)}, 0.3);
  &:hover {
    background: rgba(${(props) => TypeSwitch(props.color)}, 0.4);
    cursor: pointer;
  }
  img {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: 196px;
    padding-top: 20px;
  }
  span {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-top: 15px;
    font-size: 20px;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    margin: 10px;
  }
`;

const PokemonID = styled.div`
  display: flex;
  margin-left: 15px;
`;

const Types = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 5px;
  margin-top: 10px;
`;

const Type = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(${(props) => TypeSwitch(props.color)}, 1);
  border-radius: 5px;
  margin-right: 5px;
  width: 120px;
  height: 35px;
`;

export default Main;
