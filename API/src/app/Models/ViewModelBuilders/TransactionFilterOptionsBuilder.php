<?php namespace App\Models\ViewModelBuilders;

use App\Models\Objects\ViewModels\Filters\TransactionFilterOptionsViewModel;
use App\Models\UOW\Eloquent\Contracts\IElUnitOfWork;
use Illuminate\Http\Request;

class TransactionFilterOptionsBuilder
{
    /**
     * @var IElUnitOfWork
     */
    protected $uow;

    /**
     * @var Request
     */
    protected $request;

    /**
     * TransactionsListBuilder constructor.
     * @param IElUnitOfWork $uow
     * @param Request $request
     */
    public function __construct( IElUnitOfWork $uow, Request $request )
    {
        $this->uow = $uow;
        $this->request = $request;
    }

    /**
     * @return TransactionFilterOptionsViewModel
     */
    public function getModel(): TransactionFilterOptionsViewModel
    {
        $viewModel = new TransactionFilterOptionsViewModel();
        $types = $this->uow->transactionTypes()->getAll();
        $categories = $this->uow->categories()->getAll();
        $viewModel->mapTypes( $types );
        $viewModel->mapCategories( $categories );
        $viewModel->mapSortOptions();
        return $viewModel;
    }
}
