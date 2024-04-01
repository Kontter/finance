export interface IData {
  years: IYear[];
}

export interface IYear {
  name: number;
  months: IMonthWrapper[];
}

export interface IMonthWrapper {
  month: IMonth;
}

export interface IMonth {
  name: string;
  monthForDays: string;
  sort: number;
  heightPercent: number;
  sum: number;
  categories: ICategory[];
}

export interface ICategory {
  article: string;
  articleColor: string;
  sum: number;
  icon: string;
  id: number;
  days: IDay[];
}

export interface IDay {
  day: number;
  sum: number;
  expenses: IExpense[];
}

export interface IExpense {
  title: string;
  price: number;
  id: number;
}