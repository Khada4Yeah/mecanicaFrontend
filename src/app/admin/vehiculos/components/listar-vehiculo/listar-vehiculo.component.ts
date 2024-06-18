import { Component, HostListener, OnInit } from '@angular/core';
import { Vehiculo } from '../../../../core/models/vehiculo.model';
import { VehiculoService } from '../../../../core/services/vehiculo.service';

@Component({
  selector: 'app-listar-vehiculo',
  templateUrl: './listar-vehiculo.component.html',
  styleUrl: './listar-vehiculo.component.scss'
})
export class ListarVehiculoComponent implements OnInit {
  paginaCargada: boolean = false;
  vehiculos: Vehiculo[] = [];

  isSmallScreen: boolean = false;

  constructor(private vehiculoService: VehiculoService) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.getVehiculos();
  }

  getVehiculos(): void {
    this.vehiculoService.getVehiculos().subscribe({
      next: (vehiculos: Vehiculo[]) => {
        console.log(vehiculos);

        this.vehiculos = vehiculos;
        this.paginaCargada = true;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {

      }
    })
  }

  @HostListener('window:resize', ['$event'])
  onresize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768; // Cambia 768 al tamaño que desees
  }

  deleteVehiculo(id: number): void {
  }

}
