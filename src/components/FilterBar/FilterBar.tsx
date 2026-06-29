import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 24px 0;
  padding: 16px;
  background: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.border};
`;

const Input = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 10px 14px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 6px;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
  }
`;

const Select = styled.select`
  padding: 10px 14px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 6px;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  font-size: 1rem;
  min-width: 140px;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
  }
`;

interface FilterBarProps {
  name: string;
  status: string;
  species: string;
  onNameChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSpeciesChange: (value: string) => void;
}

const FilterBar = ({
  name,
  status,
  species,
  onNameChange,
  onStatusChange,
  onSpeciesChange,
}: FilterBarProps) => {
  return (
    <FilterContainer>
      <Input
        type="text"
        placeholder="Buscar por nome..."
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <Select value={status} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="">Todos os status</option>
        <option value="alive">Vivo</option>
        <option value="dead">Morto</option>
        <option value="unknown">Desconhecido</option>
      </Select>
      <Select value={species} onChange={(e) => onSpeciesChange(e.target.value)}>
        <option value="">Todas as espécies</option>
        <option value="human">Humano</option>
        <option value="alien">Alienígena</option>
        <option value="humanoid">Humanóide</option>
        <option value="poopybutthole">Poopybutthole</option>
        <option value="mythological">Mitológico</option>
        <option value="animal">Animal</option>
        <option value="cronenberg">Cronenberg</option>
        <option value="disease">Doença</option>
        <option value="robot">Robô</option>
        <option value="unknown">Desconhecido</option>
      </Select>
    </FilterContainer>
  );
};

export default FilterBar;