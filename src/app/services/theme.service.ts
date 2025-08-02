import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  get isDarkMode(): boolean {
    return localStorage.getItem('theme') === 'dark';
  }

  enableDarkMode(): void {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }

  disableDarkMode(): void {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }

  toggleTheme(): void {
    if (this.isDarkMode) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  detectAndSet(): void {
    const stored = localStorage.getItem('theme');
    if (!stored) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) this.enableDarkMode();
    } else if (stored === 'dark') {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }
}
