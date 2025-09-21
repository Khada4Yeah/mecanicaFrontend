import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  private isSmallScreenSubject = new BehaviorSubject<boolean>(this.getIsSmallScreen());
  public isSmallScreen$ = this.isSmallScreenSubject.asObservable();

  constructor() {
    // Escuchar eventos de resize
    fromEvent(window, 'resize').pipe(
      debounceTime(200), // evita llamadas excesivas
      startWith(null)    // emite el valor inicial
    ).subscribe(() => {
      this.isSmallScreenSubject.next(this.getIsSmallScreen());
    });
  }

  private getIsSmallScreen(): boolean {
    return window.innerWidth < 768;
  }

  // También puedes exponer el valor actual sin Observable si es necesario
  public isSmall(): boolean {
    return this.isSmallScreenSubject.value;
  }
}
