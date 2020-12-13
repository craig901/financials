<?php namespace App\Models\Objects\ViewModels\Reports;


class MonthlySpendViewModel extends AbstractMonthsReport
{
    /**
     * @var array
     */
    public $data = [];

    /**
     * @var array
     */
    public $categories = [];

    /**
     * MonthlySpendViewModel constructor.
     */
    public function __construct()
    {
        $this->setLast12Months();
    }
}
