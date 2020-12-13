<?php namespace App\Models\ViewModelBuilders;

use App\Models\Objects\ViewModels\DashboardReportsViewModel;
use App\Models\Objects\ViewModels\Reports\CategoriesSpendViewModel;
use App\Models\Objects\ViewModels\Reports\MonthlySpendViewModel;
use App\Models\Requests\TransactionFilterRequest;
use App\Models\UOW\Eloquent\Contracts\IElUnitOfWork;

class DashboardReportsBuilder
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
     * DashboardReportsBuilder constructor.
     * @param IElUnitOfWork $uow
     */
    public function __construct( IElUnitOfWork $uow )
    {
        $this->uow = $uow;
    }

    /**
     * @return DashboardReportsViewModel
     */
    public function getModel(): DashboardReportsViewModel
    {
        $viewModel = new DashboardReportsViewModel();

        $monthlySpend = new MonthlySpendViewModel();
        $viewModel->monthlySpend = $monthlySpend;

        $categoriesSpend = new CategoriesSpendViewModel();
        $categories = $this->uow->categories()->getAll();
        $categoriesSpend->mapData( $categories );

        $viewModel->categoriesSpend = $categoriesSpend;

        $this->uow->transactions()->getMonthSpendByCategory( $viewModel->categoriesSpend );
        $this->uow->transactions()->getMonthlySpend( $viewModel->monthlySpend );

        return $viewModel;
    }
}
