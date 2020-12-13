<?php namespace App\Models\ViewModelBuilders;

use App\Models\Objects\ViewModels\ListViewModel;
use App\Models\Requests\TransactionFilterRequest;
use App\Models\UOW\Eloquent\Contracts\IElUnitOfWork;

class TransactionsListBuilder
{
    /**
     * @var IElUnitOfWork
     */
    protected $uow;

    /**
     * @var TransactionFilterRequest
     */
    protected $request;

    /**
     * TransactionsListBuilder constructor.
     * @param IElUnitOfWork $uow
     * @param TransactionFilterRequest $request
     */
    public function __construct( IElUnitOfWork $uow, TransactionFilterRequest $request )
    {
        $this->uow = $uow;
        $this->request = $request;
    }

    /**
     * @return ListViewModel
     */
    public function getModel(): ListViewModel
    {
        $viewModel = new ListViewModel();
        $viewModel->items = $this->uow->transactions()->getItems( $this->request->getFilterObject() );
        $viewModel->total = $this->uow->transactions()->getItemsCount( $this->request->getFilterObject() );
        return $viewModel;
    }
}
