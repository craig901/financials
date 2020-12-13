import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis
} from "ng-apexcharts";

export type ChartOptions = {
  legend?: ApexLegend;
  labels?: any[];
  dataLabels?: ApexDataLabels;
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  title?: ApexTitleSubtitle;
  colors?: any;
  responsive?: any;
};
