import { Component, inject } from '@angular/core';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TokenService } from '../core/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [NzResultModule, NzButtonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {
  private tokenService = inject(TokenService);
  private router = inject(Router);

  redirect(): void {
    if (this.tokenService.getToken()) {
      this.router.navigate(['/admin']);
    }
    else {
      this.router.navigate(['']);
    }
  }


}
