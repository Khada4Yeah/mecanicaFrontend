import { Component, HostListener, OnInit } from '@angular/core';
import { Ficha } from '../../../../core/models/ficha.model';
import { FichaService } from '../../../../core/services/ficha.service';


@Component({
  selector: 'app-listar-ficha',
  templateUrl: './listar-ficha.component.html',
  styleUrl: './listar-ficha.component.scss'
})
export class ListarFichaComponent implements OnInit {
  paginaCargada: boolean = true;
  fichas: Ficha[] = [];
  parametro: string = '';

  isSmallScreen: boolean = false;


  constructor(private fichaService: FichaService) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
  }

  getFichasCliente(): void {
    this.paginaCargada = false;
    this.fichaService.getFichasCliente(this.parametro).subscribe({
      next: (fichas: Ficha[]) => {
        console.log(fichas);

        this.fichas = fichas;
        this.paginaCargada = true;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
      }
    });
  }



  @HostListener('window:resize', ['$event'])
  onresize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768; // Cambia 768 al tamaño que desees
  }

  deleteFicha(id: number): void {
  }

}
