import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as ieActions from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userSubs!: Subscription;
  ingresosSubs!: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.store
      .select('auth')
      .pipe(filter((user) => user.user != null))
      .subscribe((user) => {
        this.userSubs = this.ingresoEgresoService
          .initIngresosEgresosListener(user.user!.uid)
          .subscribe((ingresosEgresosFB) => {
            this.store.dispatch(
              ieActions.setItems({ items: ingresosEgresosFB })
            )
          })
      });
  }

  ngOnDestroy(): void {
    if (this.ingresosSubs) {
      this.ingresosSubs.unsubscribe();
    }
    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }
  }
}
