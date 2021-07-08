import styled from 'styled-components';
import TypeSwitch from '../utils/TypeSwitch';

export const Area = styled.div`
  position: relative;
  padding-top: 30px;
  @media (min-width: 768px) {
    height: 85vh;
  }
  @media (max-width: 768px) {
    padding-bottom: 80px;
  }
`;
export const PokemonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 2fr 1fr;
  width: 900px;
  height: 600px;
  background: rgba(${(props) => TypeSwitch(props.color)}, 0.2);
  margin: auto;

  border-radius: 30px;
  border: solid rgba(${(props) => TypeSwitch(props.color)}, 0.8) 5px;
  animation: fadeIn 0.5s;
  button {
    position: absolute;
    border: none;
    background: transparent;
    margin-left: 840px;
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
    height: auto;
    button {
      margin-left: 290px;
    }
  }
`;

export const PokemonLeft = styled.div`
  grid-area: 1/1/3/2;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-right: solid rgba(0, 0, 0, 0.4) 3px;
  background: rgba(${(props) => TypeSwitch(props.color)}, 0.3);
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
    border-right: none;
    border-bottom: solid rgba(0, 0, 0, 0.4) 3px;
  }
`;
export const PokemonMiddle = styled.div`
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
export const PokemonRight = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 10px;
  font-size: 22px;
  p {
    font-size: 26px;
  }
`;
export const EvoChainArea = styled.div`
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
export const Type = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(${(props) => TypeSwitch(props.color)}, 1);
  border-radius: 5px;
  margin-right: 5px;
  width: 140px;
  height: 35px;
`;
