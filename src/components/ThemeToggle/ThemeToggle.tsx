import styled from 'styled-components';
import { useThemeStore } from '../../store/themeStore';

const ToggleButton = styled.button`
  background: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 30px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) => props.theme.text};
  transition: all 0.3s ease;
  &:hover {
    opacity: 0.8;
  }
`;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <ToggleButton onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
      {theme === 'light' ? 'Dark' : 'Light'}
    </ToggleButton>
  );
};

export default ThemeToggle;