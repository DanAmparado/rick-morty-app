import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCharacters, getCharactersByIds } from '../../api/rickAndMorty';
import Card from '../../components/Card/Card';
import FilterBar from '../../components/FilterBar/FilterBar';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import { useDebounce } from '../../hooks/useDebounce';
import { useFavoritesStore } from '../../store/favoritesStore';
import styled from 'styled-components';
import type { Character } from '../../types/character';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin: 0;
  color: ${(props) => props.theme.text};
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

const Message = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 40px;
  color: ${(props) => props.theme.text};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 32px;
  padding: 16px 0;
`;

const PageButton = styled.button<{ $disabled: boolean }>`
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  background: ${(props) => (props.$disabled ? '#999' : props.theme.primary)};
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  transition: background 0.2s, transform 0.1s;
  &:hover {
    background: ${(props) =>
      props.$disabled ? '#999' : props.theme.primary};
    transform: ${(props) => (props.$disabled ? 'none' : 'scale(1.02)')};
  }
`;

const PageInfo = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${(props) => props.theme.text};
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border: 2px solid ${(props) => (props.$active ? '#f44336' : '#ccc')};
  border-radius: 8px;
  background: ${(props) => (props.$active ? '#ffebee' : 'transparent')};
  cursor: pointer;
  font-weight: bold;
  color: ${(props) => (props.$active ? '#d32f2f' : '#666')};
  transition: all 0.2s;
  &:hover {
    opacity: 0.8;
  }
`;

const Home = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const debouncedName = useDebounce(name, 1000);
  const { favorites } = useFavoritesStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['characters', { page, name: debouncedName, status, species }],
    queryFn: () => getCharacters(page, debouncedName, status, species),
    enabled: !showFavorites,
  });

  const {
    data: favoritesData,
    isLoading: favoritesLoading,
    isError: favoritesError,
    error: favoritesErrorObj,
  } = useQuery({
    queryKey: ['favorites', favorites],
    queryFn: () => getCharactersByIds(favorites),
    enabled: showFavorites && favorites.length > 0,
  });

  useEffect(() => {
    if (!showFavorites) {
      setPage(1);
    }
  }, [debouncedName, status, species, showFavorites]);

  const displayedData = showFavorites ? favoritesData : data;
  const displayedCharacters = displayedData?.results || [];
  const isLoadingData = showFavorites ? favoritesLoading : isLoading;
  const isErrorData = showFavorites ? favoritesError : isError;
  const errorData = showFavorites ? favoritesErrorObj : error;

  const info = data?.info;
  const hasNextPage = !!info?.next && !showFavorites;
  const hasPrevPage = !!info?.prev && !showFavorites;

  if (isLoadingData) {
    return (
      <PageContainer>
        <Message>Carregando personagens...</Message>
      </PageContainer>
    );
  }

  if (isErrorData) {
    return (
      <PageContainer>
        <Message>Erro: {errorData?.message}</Message>
      </PageContainer>
    );
  }

  if (!displayedData || displayedCharacters.length === 0) {
    const emptyMessage = showFavorites
      ? 'Nenhum personagem favorito encontrado.'
      : 'Nenhum personagem encontrado com esses filtros.';
    return (
      <PageContainer>
        <Header>
          <Title>Personagens de Rick and Morty</Title>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <FilterButton $active={showFavorites} onClick={() => setShowFavorites(!showFavorites)}>
              ❤️ Favoritos {showFavorites ? '✓' : ''}
            </FilterButton>
            <ThemeToggle />
          </div>
        </Header>
        <FilterBar
          name={name}
          status={status}
          species={species}
          onNameChange={setName}
          onStatusChange={setStatus}
          onSpeciesChange={setSpecies}
        />
        <Message>{emptyMessage}</Message>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <Title>Personagens de Rick and Morty</Title>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <FilterButton $active={showFavorites} onClick={() => setShowFavorites(!showFavorites)}>
            ❤️ Favoritos {showFavorites ? '✓' : ''}
          </FilterButton>
          <ThemeToggle />
        </div>
      </Header>

      <FilterBar
        name={name}
        status={status}
        species={species}
        onNameChange={setName}
        onStatusChange={setStatus}
        onSpeciesChange={setSpecies}
      />

      <CardGrid>
        {displayedCharacters.map((character: Character) => (
          <Card key={character.id} character={character} />
        ))}
      </CardGrid>

      {!showFavorites && (
        <PaginationContainer>
          <PageButton
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            $disabled={!hasPrevPage}
          >
            ◀ Anterior
          </PageButton>
          <PageInfo>
            Página {page} de {info?.pages || 1}
          </PageInfo>
          <PageButton
            onClick={() => setPage((old) => old + 1)}
            $disabled={!hasNextPage}
          >
            Próxima ▶
          </PageButton>
        </PaginationContainer>
      )}
    </PageContainer>
  );
};

export default Home;