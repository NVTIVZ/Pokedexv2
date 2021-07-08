import styled from 'styled-components';

export const SearchArea = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  align-items: center;
  padding-top: 15px;
  button {
    border: none;
    font-family: inherit;
    background: #8cc9ff;
    border-radius: 25%;
    font-size: 17px;
    padding: 5px 10px;
    margin: 0px 5px;
    &:hover {
      cursor: pointer;
    }
  }
  div {
    margin-left: 10px;
  }
  input {
    font-family: inherit;
    border-radius: 4px;
    height: 25px;
  }
  select {
    font-family: inherit;
    border-radius: 4px;
    height: 30px;
    width: 130px;
  }
  @media (max-width: 1168px) {
    flex-direction: column;
  }
`;
