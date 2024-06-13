import { Injectable } from '@angular/core';
import { HandballGame } from '../interfaces/HandballResponse';

@Injectable({
  providedIn: 'root'
})
export class FavoritesHandballService {
  private storageKey = 'handballFavorites';
  private favorites: HandballGame[] = [];

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

  getFavorites(): HandballGame[] {
    return this.favorites;
  }

  addFavorite(game: HandballGame): void {
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
