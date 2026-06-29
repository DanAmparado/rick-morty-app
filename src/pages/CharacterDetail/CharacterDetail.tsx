import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCharacterById } from '../../api/rickAndMorty';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  color: ${(props) => props.theme.text};
`;

const Card = styled.div`
  background: ${(props) => props.theme.cardBackground};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 24px;
`;

const Name = styled.h1`
  margin: 0 0 16px 0;
  font-size: 2rem;
`;

const DetailRow = styled.p`
  margin: 8px 0;
  font-size: 1rem;
  strong {
    font-weight: 600;
    opacity: 0.7;
  }
`;

const BackButton = styled.button`
  background: ${(props) => props.theme.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover {
    opacity: 0.9;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 40px;
  color: ${(props) => props.theme.text};
`;

const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const characterId = Number(id);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['character', characterId],
    queryFn: () => getCharacterById(characterId),
    enabled: !!characterId,
  });

  if (isLoading) return <LoadingMessage>Carregando detalhes...</LoadingMessage>;
  if (isError) return <LoadingMessage>Erro: {error.message}</LoadingMessage>;
  if (!data) return <LoadingMessage>Personagem não encontrado.</LoadingMessage>;

  return (
    <Container>
      <BackButton onClick={() => window.history.back()}>← Voltar</BackButton>
      <Card>
        <Image src={data.image} alt={data.name} />
        <Info>
          <Name>{data.name}</Name>
          <DetailRow><strong>Espécie:</strong> {data.species}</DetailRow>
          <DetailRow><strong>Gênero:</strong> {data.gender}</DetailRow>
          <DetailRow><strong>Status:</strong> {data.status}</DetailRow>
          <DetailRow><strong>Origem:</strong> {data.origin.name}</DetailRow>
          <DetailRow><strong>Localização atual:</strong> {data.location.name}</DetailRow>
          <DetailRow><strong>Quantidade de episódios:</strong> {data.episode.length}</DetailRow>
        </Info>
      </Card>
    </Container>
  );
};

export default CharacterDetail;