import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveDetails, clearEvoAndActive } from '../app/pokeSlice';
import TypeSwitch from '../utils/TypeSwitch';
import styled from 'styled-components';
import _ from 'lodash';
import EvoChain from './EvoChain';
import LoadingScreen from './LoadingScreen';

const PokemonCard = ({ active, setActivePokemon, setShowDetailed }) => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.poke.activeDetails);
  useEffect(() => {
    dispatch(fetchActiveDetails(active));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  return (
    <>
      {pokemon.weight ? (
        <>
          <PokemonContainer color={pokemon.types[0].type.name}>
            <button
              onClick={() => {
                setActivePokemon('');
                setShowDetailed(false);
                dispatch(clearEvoAndActive());
              }}
            >
              <img src="/svgs/x.svg" alt="" />
            </button>
            <PokemonLeft color={pokemon.types[0].type.name}>
              #{('00' + pokemon.id).slice(-3)}
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
              />
              <span>{_.upperFirst(pokemon.name)}</span>
              <div>Height: {pokemon.height / 10}m</div>
              <div>Weight: {(pokemon.weight / 4.53).toFixed(1)}kg</div>
            </PokemonLeft>
            <PokemonMiddle>
              Desc:<div>{pokemon.desc}</div>
              Ability:
              <div>{_.upperFirst(pokemon.abilities[0].ability.name)}</div>
            </PokemonMiddle>
            <PokemonRight>
              <p>Stats:</p>
              <div>HP:{pokemon.stats[0].base_stat}</div>
              <div>ATK:{pokemon.stats[1].base_stat}</div>
              <div>DEF:{pokemon.stats[2].base_stat}</div>
              <div>SA:{pokemon.stats[3].base_stat}</div>
              <div>SD:{pokemon.stats[4].base_stat}</div>
              <div>SPD:{pokemon.stats[5].base_stat}</div>
            </PokemonRight>
            <EvoChainArea>
              <EvoChain
                selectedPoke={pokemon}
                setActivePokemon={setActivePokemon}
                active={active}
              />
            </EvoChainArea>
          </PokemonContainer>
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default PokemonCard;

const PokemonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 2fr 1fr;
  width: 900px;
  height: 600px;
  background: rgba(${(props) => TypeSwitch(props.color)}, 0.3);
  margin: auto;
  margin-top: 30px;
  border-radius: 30px;
  border: solid rgba(${(props) => TypeSwitch(props.color)}, 0.8) 5px;
  animation: fadeIn 0.5s;
  margin-bottom: 150px;
  button {
    position: absolute;
    margin-left: 850px;
    border: none;
    background: transparent;
    &:hover {
      cursor: pointer;
    }
    img {
      width: 40px;
    }
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 1500px;
    button {
      margin-left: 240px;
    }
  }
`;

const PokemonLeft = styled.div`
  grid-area: 1/1/3/2;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-right: solid rgba(0, 0, 0, 0.4) 3px;
  background: rgba(${(props) => TypeSwitch(props.color)}, 0.4);
  font-size: 22px;
  padding-top: 10px;
  border-radius: 25px;
  img {
    margin-top: 60px;
    width: 196px;
    height: 196px;
  }
  span {
    margin-top: 40px;
    font-weight: 600;
  }
  div {
    margin-top: 20px;
  }
  @media (max-width: 768px) {
    border: none;
  }
`;
const PokemonMiddle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 10px;
  margin-left: 20px;
  font-size: 22px;
  div {
    margin-top: 3px;
    margin-bottom: 20px;
    font-size: 20px;
  }
`;
const PokemonRight = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 10px;
  font-size: 22px;
  p {
    font-size: 26px;
  }
`;
const EvoChainArea = styled.div`
  grid-area: 2/2/3/4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  div:first-of-type {
    display: none;
  }

  @media (max-width: 768px) {
    margin-top: 15px;
    flex-direction: column;
  }
`;
