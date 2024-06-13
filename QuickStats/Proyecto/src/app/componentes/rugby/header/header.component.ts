import { Component, OnInit, Renderer2, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header4',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterModule]
})
export class HeaderComponent implements OnInit {
  @ViewChild('puntos') puntos!: ElementRef;
  @ViewChild('menuDeportes') menuDeportes!: ElementRef;
  @ViewChild('setting') setting!: ElementRef;
  @ViewChild('menuSetting') menuSetting!: ElementRef;
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @Output() toggleFavoritesVisibility = new EventEmitter<void>();

  isFavoritesVisible: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.renderer.listen('document', 'click', (event: Event) => {
      if (this.menuDeportes && !this.puntos.nativeElement.contains(event.target)) {
        this.renderer.removeClass(this.menuDeportes.nativeElement, 'show');
      }
      if (this.menuSetting && !this.setting.nativeElement.contains(event.target)) {
        this.renderer.removeClass(this.menuSetting.nativeElement, 'show');
      }
    });
  }

  toggleMenuDeportes(event: Event): void {
    event.preventDefault();
    if (this.menuDeportes) {
      const isVisible = this.menuDeportes.nativeElement.classList.contains('show');
      if (isVisible) {
        this.renderer.removeClass(this.menuDeportes.nativeElement, 'show');
      } else {
        this.renderer.addClass(this.menuDeportes.nativeElement, 'show');
      }
    }
  }

  toggleMenuSetting(event: Event): void {
    event.preventDefault();
    if (this.menuSetting) {
      const isVisible = this.menuSetting.nativeElement.classList.contains('show');
      if (isVisible) {
        this.renderer.removeClass(this.menuSetting.nativeElement, 'show');
      } else {
        this.renderer.addClass(this.menuSetting.nativeElement, 'show');
      }
    }
  }

  toggleSwitch(event: Event): void {
    event.stopPropagation();
    if (this.toggleButton) {
      const toggleButton = this.toggleButton.nativeElement;
      if (toggleButton.classList.contains('switch_boton_toggle_off')) {
        this.renderer.removeClass(toggleButton, 'switch_boton_toggle_off');
        this.renderer.addClass(toggleButton, 'switch_boton_toggle_on');
      } else {
        this.renderer.removeClass(toggleButton, 'switch_boton_toggle_on');
        this.renderer.addClass(toggleButton, 'switch_boton_toggle_off');
      }
    }
  }

  cambiarImagenFavorito(): void {
    const imagen = this.el.nativeElement.querySelector('#imagen');
    if (imagen) {
      imagen.src = '/assets/images/estrella.png'; // Asegúrate de que la ruta sea correcta
    }
  }

  restaurarImagenFavorito(): void {
    const imagen = this.el.nativeElement.querySelector('#imagen');
    if (imagen && !this.isFavoritesVisible) {
      imagen.src = '/assets/images/estrella2.png'; // Asegúrate de que la ruta sea correcta
    }
  }

  toggleFavorites(): void {
    this.isFavoritesVisible = !this.isFavoritesVisible;
    this.toggleFavoritesVisibility.emit();

    const imagen = this.el.nativeElement.querySelector('#imagen');
    if (imagen) {
      imagen.src = this.isFavoritesVisible ? '/assets/images/estrella.png' : '/assets/images/estrella2.png';
    }

    setTimeout(() => {
      const favoritesSection = document.querySelector('.favorites-container');
      if (favoritesSection) {
        favoritesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }
}
