
export interface IDashboard {
  monthlySpend: IMonthlySpend;
  categoriesSpend: ICategoriesSpend;
}

export interface IMonthlySpend {
  categories: string[];
  data: number[];
}

export interface ICategoriesSpend {
  month: string;
  keys: string[];
  labels: string[];
  series: string[];
}


