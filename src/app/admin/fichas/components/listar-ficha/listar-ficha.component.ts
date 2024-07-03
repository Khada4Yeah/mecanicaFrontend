import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Ficha } from '../../../../core/models/ficha.model';
import { FichaService } from '../../../../core/services/ficha.service';
import { ModalService } from '../../../../core/services/modal.service';


@Component({
  selector: 'app-listar-ficha',
  templateUrl: './listar-ficha.component.html',
  styleUrl: './listar-ficha.component.scss'
})
export class ListarFichaComponent implements OnInit {
  paginaCargada: boolean = true;
  fichas: Ficha[] = [];
  parametro: string = '';

  private modal = inject(ModalService);

  isSmallScreen: boolean = false;


  constructor(private fichaService: FichaService) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
  }

  getFichasCliente(): void {
    const parametro = this.parametro.trim();
    if (parametro.length === 0) {
      this.modal.mostrar('warning', 'Debe ingresar un parámetro de búsqueda');
      return;
    }
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
        this.fichas.length === 0 ? this.modal.mostrar('info', 'No existen fichas para este cliente') : null;
      }
    });
  }

  pdfFicha(id_ficha: number): void {
    this.fichaService.pdfFicha(id_ficha).subscribe({
      next: (pdf) => {
        console.log(pdf);
        const file = new Blob([pdf], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
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

}
