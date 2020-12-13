import {TransactionService} from "./transaction.service";
import {ICategoriesSpend, IDashboard, IMonthlySpend} from "../../models/viewModels/IDashboard";
import {of} from "rxjs";
import {IList} from "../../models/viewModels/IList";
import {ITransaction} from "../../models/entities/ITransaction";

describe('TransactionService', () => {

  let service: TransactionService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new TransactionService( httpClientSpy as any );
  });

  it('should return expected dashboard (HttpClient called once)', () => {
    const monthlySpend: IMonthlySpend = {
      categories: [
        'House', 'Car'
      ],
      data: [
        100, 150
      ]
    };
    const categoriesSpend: ICategoriesSpend = {
      month: 'November',
      keys: [
        'House', 'Car'
      ],
      labels: [
        'House', 'Car'
      ],
      series: [
        'House', 'Car'
      ]
    };
    const viewModel: IDashboard = {
      monthlySpend: monthlySpend,
      categoriesSpend: categoriesSpend
    };
    httpClientSpy.get.and.returnValue(of(viewModel));
    service.getDashboard().subscribe(
      viewModel => expect(viewModel).toEqual(viewModel, 'viewModel'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected list view model of transactions', () => {
    const item: ITransaction = {
      id:1,
      description:'Lunch',
      value:500,
      date:'',
      type: {
        id:1,
        key:'Food',
        label:'Food'
      },
      category: {
        id:1,
        key:'Card',
        label:'Card'
      },
      created_at: ''
    };
    const viewModel: IList<ITransaction> = {
      total: 20,
      items: [ item ]
    };
    httpClientSpy.get.and.returnValue(of(viewModel));
    service.getItems(1).subscribe(
      viewModel => expect(viewModel).toEqual(viewModel, 'viewModel'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    //expect(posts).toEqual(dummyPosts);
  });

});
