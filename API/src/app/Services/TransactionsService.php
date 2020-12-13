<?php namespace App\Services;

use App\Models\Requests\TransactionSubmitRequest;
use \App\Models\Objects\ViewModels\DashboardReportsViewModel;
use \App\Models\Objects\ViewModels\ListViewModel;
use \App\Models\Objects\ViewModels\Filters\TransactionFilterOptionsViewModel;
use \App\Models\Objects\ViewModels\SubmitTransactionViewModel;
use App\Models\ViewModelBuilders\DashboardReportsBuilder;
use App\Models\ViewModelBuilders\SubmitTransactionBuilder;
use App\Models\ViewModelBuilders\TransactionFilterOptionsBuilder;
use App\Models\ViewModelBuilders\TransactionsListBuilder;

class TransactionsService
{
    /**
     * @var DashboardReportsBuilder
     */
    protected $dashboardBuilder;

    /**
     * @var TransactionsListBuilder
     */
    protected $listBuilder;

    /**
     * @var TransactionFilterOptionsBuilder
     */
    protected $filtersBuilder;

    /**
     * @var SubmitTransactionBuilder
     */
    protected $submitBuilder;

    /**
     * TransactionsService constructor.
     * @param DashboardReportsBuilder $dashboardBuilder
     * @param TransactionsListBuilder $listBuilder
     * @param TransactionFilterOptionsBuilder $filtersBuilder
     * @param SubmitTransactionBuilder $submitBuilder
     * @param TransactionSubmitRequest $submitRequest
     */
    public function __construct(
        DashboardReportsBuilder $dashboardBuilder,
        TransactionsListBuilder $listBuilder,
        TransactionFilterOptionsBuilder $filtersBuilder,
        SubmitTransactionBuilder $submitBuilder
    )
    {
        $this->dashboardBuilder = $dashboardBuilder;
        $this->listBuilder = $listBuilder;
        $this->filtersBuilder = $filtersBuilder;
        $this->submitBuilder = $submitBuilder;
    }

    /**
     * @return DashboardReportsViewModel
     */
    public function getDashboard()
    {
        return $this->dashboardBuilder->getModel();
    }

    /**
     * @return ListViewModel
     */
    public function getList()
    {
        return $this->listBuilder->getModel();
    }

    /**
     * @return TransactionFilterOptionsViewModel
     */
    public function getFilters()
    {
        return $this->filtersBuilder->getModel();
    }

    /**
     * @return SubmitTransactionViewModel
     */
    public function getSubmit()
    {
        return $this->submitBuilder->getModel();
    }

    /**
     *
     */
    public function postSubmit()
    {
        $transaction = $this->submitRequest->getTransaction();
        $transaction->save();
    }
}
