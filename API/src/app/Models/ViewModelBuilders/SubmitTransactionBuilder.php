<?php namespace App\Models\ViewModelBuilders;

use App\Models\Objects\ViewModels\SubmitTransactionViewModel;
use App\Models\UOW\Eloquent\Contracts\IElUnitOfWork;

class SubmitTransactionBuilder
{
    /**
     * @var IElUnitOfWork
     */
    protected $uow;

    /**
     * SubmitTransactionBuilder constructor.
     * @param IElUnitOfWork $uow
     */
    public function __construct(IElUnitOfWork $uow)
    {
        $this->uow = $uow;
    }

    /**
     * @return SubmitTransactionViewModel
     */
    public function getModel(): SubmitTransactionViewModel
    {
        $viewModel = new SubmitTransactionViewModel();
        $viewModel->types = $this->uow->transactionTypes()->getAll();
        $viewModel->categories = $this->uow->categories()->getAll();
        return $viewModel;
    }
}
