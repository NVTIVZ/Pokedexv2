import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';
const Main = () => {
  const [searchText, setSearchText] = useState('');
  const [showDetailed, setShowDetailed] = useState(false);
  const [activePokemon, setActivePokemon] = useState('');
  const poke = useSelector((state) => state.poke);
  const renderList = (array) => {
    return array.map((poke) => {
      return (
        <Card
          key={poke.name}
          color={poke.types[0].type.name}
          onClick={() => {
            setActivePokemon(poke.name);
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
    if (poke.detailedPokemon[150]) {
      const sorted = poke.detailedPokemon.slice().sort((a, b) => a.id - b.id);
      return renderList(sorted);
    }
    return <div>Loading</div>;
  };

  const RenderSearch = () => {
    if (poke.detailedPokemon[150]) {
      const sorted = poke.detailedPokemon.slice().sort((a, b) => a.id - b.id);
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

  const details = () => {
    const pokemonDetailed = poke.detailedPokemon
      .slice()
      .find(({ name }) => name === activePokemon);

    console.log(pokemonDetailed);
    return (
      <PokemonContainer color={pokemonDetailed.types[0].type.name}>
        <button
          onClick={() => {
            setActivePokemon('');
            setShowDetailed(false);
          }}
        >
          <img src="/svgs/x.svg" alt="" />
        </button>

        <PokemonLeft>
          #{('00' + pokemonDetailed.id).slice(-3)}
          <img
            src={
              pokemonDetailed.sprites.other['official-artwork'].front_default
            }
            alt={pokemonDetailed.name}
          />
          <span>{_.upperFirst(pokemonDetailed.name)}</span>
          <div>Height: {pokemonDetailed.height / 10}m</div>
          <div>Weight: {(pokemonDetailed.weight / 4.53).toFixed(1)}kg</div>
        </PokemonLeft>
        <PokemonMiddle>
          Desc:<div>{pokemonDetailed.desc.flavor_text}</div>
          Ability:
          <div>{_.upperFirst(pokemonDetailed.abilities[0].ability.name)}</div>
        </PokemonMiddle>
        <PokemonRight>
          <p>Stats:</p>
          <div>HP:{pokemonDetailed.stats[0].base_stat}</div>
          <div>ATK:{pokemonDetailed.stats[1].base_stat}</div>
          <div>DEF:{pokemonDetailed.stats[2].base_stat}</div>
          <div>SA:{pokemonDetailed.stats[3].base_stat}</div>
          <div>SD:{pokemonDetailed.stats[4].base_stat}</div>
          <div>SPD:{pokemonDetailed.stats[5].base_stat}</div>
        </PokemonRight>
      </PokemonContainer>
    );
  };

  return (
    <Container>
      {showDetailed ? (
        details()
      ) : (
        <>
          <SearchBar>
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
  font-size: 14px;
  align-items: center;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 250px;
  width: 150px;
  margin: 25px;
  border-radius: 25px;
  background: rgba(${(props) => typeSwitch(props.color)}, 0.3);
  &:hover {
    transform: scale(1.1);
  }
  img {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: 128px;
    padding-top: 20px;
  }
  span {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-top: 15px;
    font-size: 15px;
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
const typeSwitch = (type) => {
  switch (type) {
    case 'grass':
      return '0, 171, 20';
    case 'normal':
      return '54, 54, 54';
    case 'fighting':
      return '143, 0, 14';
    case 'flying':
      return '189, 249, 255';
    case 'poison':
      return '129, 2, 171';
    case 'ground':
      return '122, 47, 24';
    case 'rock':
      return '140, 138, 137';
    case 'bug':
      return '60, 201, 60';
    case 'ghost':
      return '107, 10, 171';
    case 'steel':
      return '64, 64, 64';
    case 'fire':
      return '255, 25, 25';
    case 'water':
      return '56, 129, 255';
    case 'electric':
      return '255, 240, 110';
    case 'psychic':
      return '188, 99, 247';
    case 'ice':
      return '186, 213, 232';
    case 'dragon':
      return '117, 72, 57';
    case 'dark':
      return '37, 2, 61';
    case 'fairy':
      return '247, 240, 171';
    case 'shadow':
      return '38, 33, 41';
    default:
      return null;
  }
};
const Type = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(${(props) => typeSwitch(props.color)}, 1);
  border-radius: 5px;
  margin-right: 5px;
  width: 70px;
  height: 25px;
`;

const PokemonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 600px;
  height: 400px;
  background: rgba(${(props) => typeSwitch(props.color)}, 0.4);
  margin: auto;
  margin-top: 30px;
  border-radius: 30px;
  border: solid rgba(${(props) => typeSwitch(props.color)}, 0.8) 5px;
  animation: fadeIn 0.5s;
  button {
    position: absolute;
    margin-left: 550px;
    border: none;
    background: transparent;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    width: 280px;
    height: 700px;
    button {
      margin-left: 240px;
    }
  }
`;

const PokemonLeft = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-right: solid black 1px;
  font-size: 15px;
  img {
    margin-top: 60px;
    width: 128px;
    height: 128px;
  }
  span {
    margin-top: 40px;
    font-weight: 600;
  }
  div {
    margin-top: 10px;
  }
  @media (max-width: 768px) {
    border: none;
  }
`;
const PokemonMiddle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin-left: 5px;
  margin-right: 5px;
  font-size: 18px;
  div {
    margin-top: 3px;
    margin-bottom: 20px;
    font-size: 14px;
  }
`;
const PokemonRight = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 14px;
  p {
    font-size: 18px;
  }
`;
export default Main;
