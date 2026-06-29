# Rick and Morty - Personagens

Aplicação web para consulta de personagens da série **Rick and Morty**, desenvolvida como parte de um teste técnico para vaga de Desenvolvedor Frontend React Júnior.

**Deploy:** [rick-morty-app-delta.vercel.app](https://rick-morty-app-delta.vercel.app/)

---

## Sobre o Projeto

Esta aplicação consome a [API pública Rick and Morty](https://rickandmortyapi.com/) e oferece uma interface intuitiva para explorar todos os personagens da série. O foco foi aplicar boas práticas de desenvolvimento, componentização, organização de código e experiência do usuário.

### Funcionalidades

- Listagem de personagens com nome, imagem, espécie e status
- Busca por nome (com debounce de 1s para melhor performance)
- Filtros por status e espécie
- Página de detalhes do personagem com informações completas
- Estados de **Loading**, **Erro** e **Lista vazia** tratados com elegância
- Paginação (navegação entre páginas com botões Anterior/Próxima)
- Tema **Dark/Light** com persistência no `localStorage`
- **Favoritos** com persistência no `localStorage` e filtro exclusivo
- Responsividade (mobile-first)
- Testes automatizados com **Vitest** e **React Testing Library**

---

## Tecnologias Utilizadas

- **React 18** + **TypeScript**
- **Vite** – Build tool rápida
- **Styled Components** – Estilização e temas dinâmicos
- **React Router DOM** – Navegação entre páginas
- **Axios** – Cliente HTTP
- **TanStack React Query** – Gerenciamento de estado assíncrono (cache, loading, erros)
- **Zustand** – Gerenciamento de estado global (tema e favoritos)
- **Vitest** + **React Testing Library** – Testes unitários e de integração
- **Vercel** – Deploy contínuo

---

## Como Executar Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/rick-morty-app.git

# 2. Acesse a pasta do projeto
cd rick-morty-app

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev

# 5. Abra o navegador em http://localhost:5173
```

---

## Testes

O projeto utiliza **Vitest** para testes unitários e de integração.

### Executar os testes

```bash
# Modo watch (observa alterações)
npm test

# Executar uma única vez
npx vitest run

# Gerar relatório de cobertura
npm run coverage
```

### Exemplo de teste
- **Store de favoritos**: verifica adição, remoção e persistência.
- **Página Home**: verifica se a lista de personagens é renderizada corretamente.

---

## Estrutura de Pastas

```
src/
├── api/                 # Configuração do Axios e funções de requisição
│   └── rickAndMorty.ts
├── components/          # Componentes reutilizáveis
│   ├── Card/
│   ├── FilterBar/
│   └── ThemeToggle/
├── pages/               # Páginas principais
│   ├── Home/
│   └── CharacterDetail/
├── hooks/               # Hooks customizados
│   └── useDebounce.ts
├── store/               # Stores Zustand (tema e favoritos)
│   ├── themeStore.ts
│   └── favoritesStore.ts
├── types/               # Tipos TypeScript
│   └── character.ts
├── utils/               # Funções utilitárias
├── styles/              # Estilos globais e temas
│   ├── theme.ts
│   ├── global.ts
│   └── styled.d.ts
├── App.tsx
├── main.tsx
└── routes.tsx
```

---

## Deploy

A aplicação está hospedada na **Vercel** e é atualizada automaticamente a cada push na branch `main`.

**Link do Deploy:** [rick-morty-app-delta.vercel.app](https://rick-morty-app-delta.vercel.app/)

---

## Aprendizados e Diferenciais

- **Debounce** na busca por nome para evitar requisições desnecessárias.
- **React Query** para gerenciar cache e estado assíncrono de forma declarativa.
- **Zustand** com persistência para gerenciar o tema e os favoritos de forma simples e eficiente.
- **Testes automatizados** para garantir a estabilidade das funcionalidades principais.
- **Acessibilidade** e **responsividade** como prioridades desde o início.

---

## Licença

Este projeto foi desenvolvido apenas para fins de avaliação técnica. Todos os direitos sobre os personagens e imagens pertencem à **Rick and Morty** e à **Adult Swim**.

---

## Agradecimentos

- [Rick and Morty API](https://rickandmortyapi.com/) – por disponibilizar uma API incrível e bem documentada.
- Comunidade open-source – pelas ferramentas que tornam o desenvolvimento mais produtivo e divertido.

---

**Desenvolvido por Daniel Lemos Amparado Junior (https://github.com/DanAmparado)**