<?php namespace App\Models\Objects\ViewModels;

use App\Models\Objects\ViewModels\Reports\CategoriesSpendViewModel;
use App\Models\Objects\ViewModels\Reports\MonthlySpendViewModel;

class DashboardReportsViewModel
{
    /**
     * @var CategoriesSpendViewModel
     */
    public $categoriesSpend;

    /**
     * @var MonthlySpendViewModel
     */
    public $monthlySpend;
}
