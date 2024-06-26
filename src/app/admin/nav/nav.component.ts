import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  isCollapsed = false;
  private authService = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.authService.logout().subscribe(
      {
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.log('Sesión cerrada');
        }
      }
    );
    this.router.navigate(['/login']);
  }
}
