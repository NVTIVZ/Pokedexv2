import styled from 'styled-components';
import TypeSwitch from '../utils/TypeSwitch';
export const Container = styled.div`
  padding: 0px;
  min-height: 84vh;
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-left: 50px;
  margin-right: 50px;
  padding-bottom: 100px;
`;

export const Card = styled.div`
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

export const PokemonID = styled.div`
  display: flex;
  margin-left: 15px;
`;

export const Types = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 5px;
  margin-top: 10px;
`;

export const Type = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(${(props) => TypeSwitch(props.color)}, 1);
  border-radius: 5px;
  margin-right: 5px;
  width: 120px;
  height: 35px;
`;
