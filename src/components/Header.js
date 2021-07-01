import styled from 'styled-components';

const Header = () => {
  return (
    <Container>
      <img src="/svgs/logo.png" alt="Logo" />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 25px;
  margin-bottom: 15px;
  background: #4287f5;
  box-sizing: inherit;
`;

export default Header;
