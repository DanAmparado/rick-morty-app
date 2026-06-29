import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesStore {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      toggleFavorite: (id: number) => {
        const { favorites } = get();
        if (favorites.includes(id)) {
          set({ favorites: favorites.filter((favId) => favId !== id) });
        } else {
          set({ favorites: [...favorites, id] });
        }
      },
      
      addFavorite: (id: number) => {
        const { favorites } = get();
        if (!favorites.includes(id)) {
          set({ favorites: [...favorites, id] });
        }
      },
      
      removeFavorite: (id: number) => {
        const { favorites } = get();
        set({ favorites: favorites.filter((favId) => favId !== id) });
      },
      
      isFavorite: (id: number) => {
        const { favorites } = get();
        return favorites.includes(id);
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);