import {ITransactionType} from "../entities/ITransactionType";
import {ICategory} from "../entities/ICategory";

export abstract class ISubmitTransaction {
  types: ITransactionType[];
  categories: ICategory[];
}
