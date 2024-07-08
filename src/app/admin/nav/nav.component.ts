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
  isLoading = false;

  private authService = inject(AuthService);
  private router = inject(Router);


  logout(): void {
    this.isLoading = true;
    this.authService.logout().subscribe(
      {
        next: (data) => {
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
        },
        complete: () => {
          this.isLoading = false;
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
