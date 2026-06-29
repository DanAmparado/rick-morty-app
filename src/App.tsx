import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
`;

function App() {
  return (
    <Container>
      <h1>Rick and Morty</h1>
      <p>Fundo deve estar branco (claro) ou cinza escuro se trocar para dark.</p>
    </Container>
  );
}

export default App;