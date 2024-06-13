import { Injectable } from '@angular/core';
import { Match } from '../interfaces/FootballResponse';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storageKey = 'favorites';
  private favorites: Match[] = [];

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

  getFavorites(): Match[] {
    return this.favorites;
  }

  addFavorite(match: Match): void {
    if (!this.isFavorite(match.fixture.id)) {
      this.favorites.push(match);
      if (this.isLocalStorageAvailable()) {
        this.saveFavorites();
      }
    }
  }

  removeFavorite(fixtureId: number): void {
    this.favorites = this.favorites.filter(match => match.fixture.id !== fixtureId);
    if (this.isLocalStorageAvailable()) {
      this.saveFavorites();
    }
  }

  isFavorite(fixtureId: number): boolean {
    return this.favorites.some(match => match.fixture.id === fixtureId);
  }
}
