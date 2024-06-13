import { Injectable } from '@angular/core';
import { VolleyballGame } from '../interfaces/VolleyballResponse';

@Injectable({
  providedIn: 'root'
})
export class FavoritesVolleyballService {
  private storageKey = 'volleyballFavorites';
  private favorites: VolleyballGame[] = [];

  constructor() {
    if (this.isLocalStorageAvailable()) {
      this.loadFavorites();
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__localStorageTest__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  private loadFavorites(): void {
    const storedFavorites = localStorage.getItem(this.storageKey);
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  private saveFavorites(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
  }

  getFavorites(): VolleyballGame[] {
    return this.favorites;
  }

  addFavorite(game: VolleyballGame): void {
    if (!this.isFavorite(game.id)) {
      this.favorites.push(game);
      if (this.isLocalStorageAvailable()) {
        this.saveFavorites();
      }
    }
  }

  removeFavorite(gameId: number): void {
    this.favorites = this.favorites.filter(game => game.id !== gameId);
    if (this.isLocalStorageAvailable()) {
      this.saveFavorites();
    }
  }

  isFavorite(gameId: number): boolean {
    return this.favorites.some(game => game.id === gameId);
  }
}
