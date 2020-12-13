<?php namespace App\Models\Objects\ViewModels\Reports;

use App\Models\Objects\ViewModels\Reports\Months\Month;
use Carbon\Carbon;

class AbstractMonthsReport
{
    /**
     * @var Month[]
     */
    public $months;

    /**
     *
     */
    public function setLast12Months()
    {
        $months = [];
        $cd = Carbon::now();
        for( $i = 0; $i < 12; $i++ )
        {
            $month = clone $cd;
            $count = $i;
            $month->subMonths( $count );
            $months[] = new Month( $month );
        }
        $this->months = array_reverse( $months );
    }
}
