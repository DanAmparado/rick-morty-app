import styled from 'styled-components';
import { type Character } from '../../types/character';
import { Link } from 'react-router-dom';
import { useFavoritesStore } from '../../store/favoritesStore';

const CardContainer = styled(Link)`
  display: block;
  background: ${(props) => props.theme.cardBackground};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  color: inherit;
  position: relative;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardName = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.2rem;
  color: ${(props) => props.theme.text};
`;

const CardInfo = styled.p`
  margin: 4px 0;
  font-size: 0.9rem;
  color: ${(props) => props.theme.text};
  opacity: 0.8;
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  background-color: ${({ $status }) =>
    $status === 'Alive' ? '#55cc44' : $status === 'Dead' ? '#d63d2e' : '#9e9e9e'};
  color: white;
  margin-top: 8px;
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, background 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;
  &:hover {
    transform: scale(1.15);
    background: rgba(255, 255, 255, 1);
  }
  &:active {
    transform: scale(0.9);
  }
`;

interface CardProps {
  character: Character;
}

const Card = ({ character }: CardProps) => {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const favorite = isFavorite(character.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(character.id);
  };

  return (
    <CardContainer to={`/character/${character.id}`}>
      <FavoriteButton onClick={handleFavoriteClick}>
        {favorite ? '❤️' : '🤍'}
      </FavoriteButton>
      <CardImage src={character.image} alt={character.name} />
      <CardContent>
        <CardName>{character.name}</CardName>
        <CardInfo>Espécie: {character.species}</CardInfo>
        <StatusBadge $status={character.status}>{character.status}</StatusBadge>
        </CardContent>
    </CardContainer>
  );
};

export default Card;