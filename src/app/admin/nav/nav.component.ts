import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { ScreenService } from '../../core/services/screen.service';


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
  private screenService = inject(ScreenService);

  isSmallScreen: boolean = false;

  ngOnInit(): void {
    this.screenService.isSmallScreen$.subscribe((isSmall) => {
      this.isSmallScreen = isSmall;
    });
  }

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
