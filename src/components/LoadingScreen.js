import styled from 'styled-components';

const LoadingScreen = () => {
  return (
    <Loading>
      <img src="/svgs/pokeballsvg.svg" alt="" />
      <div>Loading...</div>
    </Loading>
  );
};

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;
  img {
    width: 128px;
    animation: rotation 2s infinite linear;
  }
`;

export default LoadingScreen;
