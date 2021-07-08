import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveDetails, clearEvoAndActive } from '../app/pokeSlice';
import {
  PokemonContainer,
  PokemonLeft,
  PokemonMiddle,
  PokemonRight,
  EvoChainArea,
  Type,
  Area,
} from '../styles/pokemonCardStyles';
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

  const renderTypes = () => {
    return pokemon.types.map((type) => {
      return (
        <Type key={type.type.name} color={type.type.name}>
          {_.upperFirst(type.type.name)}
        </Type>
      );
    });
  };
  return (
    <>
      {pokemon.weight ? (
        <Area>
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
              {renderTypes()}
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
        </Area>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default PokemonCard;
