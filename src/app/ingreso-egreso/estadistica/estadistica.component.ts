import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css'],
})
export class EstadisticaComponent implements OnInit {
  ingresosTotal: number = 0;
  egresosTotal: number = 0;
  ingresos: number = 0;
  egresos: number = 0;



  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [],
    
  };
  public doughnutChartType: ChartType = 'doughnut';



  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {

    this.store.select('ingresoEgreso').subscribe((items) => {

      this.ingresos = 0;
      this.ingresosTotal = 0;
      this.egresos = 0;
      this.egresosTotal = 0;

      items.items.forEach((item) => {
        if (item.tipo === 'Ingreso') {
          this.ingresosTotal += item.total;
          this.ingresos++;
        } else {
          this.egresosTotal += item.total;
          this.egresos++;
        }
      });
      this.doughnutChartData.datasets.push({data: [this.ingresosTotal,this.egresosTotal], backgroundColor:['green','red'], borderColor: "black"})
    });


  }
}
