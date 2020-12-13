import {ITransactionType} from "./ITransactionType";
import {ICategory} from "./ICategory";

export class ITransaction {
  id: number;
  description: string;
  value: number;
  date: string;
  type: ITransactionType;
  category: ICategory;
  created_at: string;
}
