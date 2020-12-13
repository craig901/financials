import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChartComponent} from "ng-apexcharts";
import {TransactionService} from "../../../shared/services/api/transaction.service";
import {map} from "rxjs/operators";
import {ChartOptions} from "../../../shared/models/interfaces/chartOptions";
import {ChartsService} from "../../../shared/services/app/charts.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  /**
   * The chart component
   */
  @ViewChild("chart") chart: ChartComponent;

  /**
   * The pie chart
   */
  public pie: ChartOptions;

  /**
   * The column chart
   */
  public column: ChartOptions;

  /**
   * The current month chart
   */
  public columnCurrentMonth: ChartOptions;

  /**
   * The service subscription
   * @private
   */
  private subscription: Subscription;

  /**
   * Constructor
   * @param service
   * @param chartsService
   */
  constructor(
    private service: TransactionService,
    private chartsService: ChartsService
  ) {}

  /**
   * Init
   */
  ngOnInit(): void {
    this.subscription = this.service.getDashboard()
      .pipe(
        map(
          res => {
            this.columnCurrentMonth = this.chartsService.column(
              res.categoriesSpend.series,
              res.categoriesSpend.labels,
              'Current month transactions',
              '#6ab2d6'
            );
            this.column = this.chartsService.column(
              res.monthlySpend.data,
              res.monthlySpend.categories,
              'Monthly transactions'
            );
            this.pie = this.chartsService.pie( res.categoriesSpend.series, res.categoriesSpend.labels );
          }
        )
      ).subscribe();
  }

  /**
   * Destroy
   */
  ngOnDestroy() {
    if( this.subscription )
      this.subscription.unsubscribe();
  }

}
