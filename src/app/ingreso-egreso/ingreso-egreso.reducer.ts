import { createReducer, on } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { setItems, unSetItems } from './ingreso-egreso.actions';

export interface State {
  items: IngresoEgreso[];
}

export interface AppStateWithIngreso extends AppState{
  ingresosEgresos: State
}

const initialState: State = {
  items: [],
};

export const _ingresoEgresoReducer = createReducer(
  initialState,
  on(setItems, (state, {items}) => ({ ...state, items: [...items] })),
  on(unSetItems, (state) => ({ ...state, items: [] })),
);

export function ingresoEgresoReducer(state: any, action: any){
    return _ingresoEgresoReducer(state, action);
}