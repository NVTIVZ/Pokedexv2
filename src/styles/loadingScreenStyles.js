import styled from 'styled-components';

export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 85vh;
  img {
    width: 128px;
    animation: rotation 2s infinite linear;
  }
`;
