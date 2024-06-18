import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFichaComponent } from './listar-ficha.component';

describe('ListarFichaComponent', () => {
  let component: ListarFichaComponent;
  let fixture: ComponentFixture<ListarFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarFichaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
