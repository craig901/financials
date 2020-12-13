import {ChartOptions} from "../../models/interfaces/chartOptions";
import {Injectable} from "@angular/core";

@Injectable( {
  providedIn: 'root'
} )
export class ChartsService {

  /**
   * Constructor
   */
  constructor() {
  }

  /**
   * Get a pie chart
   * @param series
   * @param labels
   */
  pie( series: any[], labels: any[] ): ChartOptions {
    return {
      colors: ['#d66a7d','#6ab2d6','#b16371','#6ad691','#aaaaaa'],
      series: series,
      chart: {
        width: 450,
        type: 'pie',
      },
      labels: labels,
      legend: {
        labels: {
          colors: ['#FFF']
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom',
            show: false
          }
        }
      }]
    };
  }

  /**
   * Get a column chart
   * @param data
   * @param categories
   * @param title
   * @param color
   */
  column( data: any[], categories: any[], title: string = 'Transactions', color: string = '#d66a7d' ): ChartOptions {
    return {
      colors: [color],
      legend: {
        show: false
      },
      dataLabels: {
        style: {
          colors: ['#FFF']
        }
      },
      series: [
        {
          name: "Monthly transactions",
          data: data
        }
      ],
      chart: {
        height: 400,
        type: "bar",
        toolbar: {
          show: false
        }
      },
      title: {
        text: title,
        style: {
          color: '#f1f1f1'
        }
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: '#f1f1f1'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#f1f1f1'
          }
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          yaxis: {
            labels: {
              show: false
            }
          }
        }
      }]
    }
  }

}
