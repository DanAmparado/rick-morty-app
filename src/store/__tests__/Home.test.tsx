import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '../../styles/theme'
import Home from '../../pages/Home/Home'

vi.mock('../../../api/rickAndMorty', () => ({
  getCharacters: vi.fn().mockResolvedValue({
    results: [
      { id: 1, name: 'Rick Sanchez', species: 'Human', status: 'Alive', image: 'rick.jpg' },
      { id: 2, name: 'Morty Smith', species: 'Human', status: 'Alive', image: 'morty.jpg' },
    ],
    info: { pages: 1, next: null, prev: null },
  }),
}))

describe('Home', () => {
  it('deve renderizar a lista de personagens', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={lightTheme}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
      expect(screen.getByText('Morty Smith')).toBeInTheDocument()
    })
  })
})