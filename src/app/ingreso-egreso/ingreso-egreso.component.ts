import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as uiActions from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css'],
})
export class IngresoEgresoComponent implements OnInit {
  tipo: string = 'Ingreso';
  cargando: boolean = false; 
  uiSubscription!: Subscription;

  formIngresoEgreso: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    total: ['', [Validators.required, Validators.min(1)]],
  });

  constructor(private fb: FormBuilder, private ingresoEgresoService: IngresoEgresoService, private store: Store<AppState>) {}

  
  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading )
  }
  ngOnDestroy(): void {
     this.uiSubscription?.unsubscribe()
  }


  toggleIngresoEgresoButton() {
    this.tipo === 'Ingreso' ? (this.tipo = 'Egreso') : (this.tipo = 'Ingreso');
  }

  agregar() {

    if (this.formIngresoEgreso.invalid) {
      return;
    }

    this.store.dispatch( uiActions.isLoading() );
    const {descripcion, total} = this.formIngresoEgreso.value;
    const ingresoEgreso = new IngresoEgreso(descripcion,total,this.tipo);

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then( () => {
        this.formIngresoEgreso.reset();
        this.store.dispatch( uiActions.stopLoading() );
        Swal.fire('Registro guardado', descripcion, 'success');
      })
      .catch( err => {
        this.store.dispatch( uiActions.stopLoading() );
        Swal.fire('Error', err.mesagge, 'error')
      });

    

  }
}
