import { describe, it, expect, beforeEach } from 'vitest'
import { useFavoritesStore } from '../favoritesStore'

describe('favoritesStore', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favorites: [] })
  })

  it('deve adicionar um favorito', () => {
    const { addFavorite } = useFavoritesStore.getState()
    addFavorite(1)
    expect(useFavoritesStore.getState().favorites).toEqual([1])
  })

  it('deve remover um favorito', () => {
    const { addFavorite, removeFavorite } = useFavoritesStore.getState()
    addFavorite(1)
    removeFavorite(1)
    expect(useFavoritesStore.getState().favorites).toEqual([])
  })

  it('deve alternar (toggle) favorito', () => {
    const { toggleFavorite } = useFavoritesStore.getState()
    toggleFavorite(1)
    expect(useFavoritesStore.getState().favorites).toEqual([1])
    toggleFavorite(1)
    expect(useFavoritesStore.getState().favorites).toEqual([])
  })

  it('deve verificar se um ID é favorito', () => {
    const { addFavorite, isFavorite } = useFavoritesStore.getState()
    addFavorite(2)
    expect(isFavorite(2)).toBe(true)
    expect(isFavorite(3)).toBe(false)
  })
})