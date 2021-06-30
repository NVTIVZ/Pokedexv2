import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvoPokemon } from '../app/pokeSlice';
import styled from 'styled-components';
import React from 'react';
const EvoChain = ({ active, setActivePokemon }) => {
  const poke = useSelector((state) => state.poke);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      poke.activeDetails.chain.evolves_to[0]?.evolves_to[0]?.species?.name !==
        undefined &&
      !poke.evoChain[0]
    ) {
      dispatch(fetchEvoPokemon(poke.activeDetails.chain.species.name));

      dispatch(
        fetchEvoPokemon(poke.activeDetails.chain.evolves_to[0].species.name)
      );
      dispatch(
        fetchEvoPokemon(
          poke.activeDetails.chain.evolves_to[0].evolves_to[0].species.name
        )
      );
    } else if (
      poke.activeDetails.chain.evolves_to[0]?.evolves_to[0]?.species?.name ===
        undefined &&
      poke.activeDetails.chain.evolves_to[0]?.species?.name !== undefined &&
      !poke.evoChain[0]
    ) {
      dispatch(fetchEvoPokemon(poke.activeDetails.chain.species.name));

      dispatch(
        fetchEvoPokemon(poke.activeDetails.chain.evolves_to[0].species.name)
      );
    } else if (!poke.evoChain[0]) {
      dispatch(fetchEvoPokemon(poke.activeDetails.chain.species.name));
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderEvoChain = () => {
    if (poke.evoChain[0]) {
      const sort = poke.evoChain.slice().sort((a, b) => a.order - b.order);
      return sort.map((evo) => {
        return (
          <React.Fragment key={evo.name}>
            <div>
              <ArrowImg src="/svgs/arrow-right.svg" />
            </div>
            <div key={evo.name}>
              <EvolutionImg
                src={evo.sprites.other['official-artwork'].front_default}
                alt=""
                onClick={() => setActivePokemon(evo.name)}
              />
            </div>
          </React.Fragment>
        );
      });
    }
  };

  return <>{renderEvoChain()}</>;
};

const EvolutionImg = styled.img`
  width: 148px;
  height: 148px;
  background: white;
  border-radius: 25%;
  &:hover {
    cursor: pointer;
  }
`;

const ArrowImg = styled.img`
  width: 48px;
`;

export default EvoChain;

/* <>
<div>
  <EvolutionImg
    src={sprite1.other['official-artwork'].front_default}
    onClick={() => setActivePokemon(selectedPoke.chain.species.name)}
    alt=""
  />
</div>
<div>
  <ArrowImg src="/svgs/arrow-right.svg" />
</div>

<div>
  <EvolutionImg
    src={sprite2.other['official-artwork'].front_default}
    onClick={() =>
      setActivePokemon(selectedPoke.chain.evolves_to[0].species.name)
    }
    alt=""
  />
</div>
<div>
  <ArrowImg src="/svgs/arrow-right.svg" />
</div>

<div>
  <EvolutionImg
    src={sprite3.other['official-artwork'].front_default}
    onClick={() =>
      setActivePokemon(
        selectedPoke.chain.evolves_to[0].evolves_to[0].species.name
      )
    }
    alt=""
  />
</div>
</> */
