<?php namespace App\Models\Objects\ViewModels\Reports;

use App\Models\Objects\Entities\Category;
use Carbon\Carbon;

class CategoriesSpendViewModel
{
    /**
     * @var string
     */
    public $month;

    /**
     * @var integer
     */
    public $total;

    /**
     * @var array
     */
    public $series = [];

    /**
     * @var array
     */
    public $labels = [];

    /**
     * @var array
     */
    public $keys = [];

    /**
     * @var string
     */
    public $start;

    /**
     * @var string
     */
    public $end;

    /**
     * CategoriesSpendViewModel constructor.
     */
    public function __construct()
    {
        $start = Carbon::now();
        $this->month = $start->monthName;
        $this->start = $start->startOfMonth()->startOfDay()->toDateTimeString();
        $end = Carbon::now();
        $this->end = $end->endOfMonth()->endOfDay()->toDateTimeString();
    }

    /**
     * @param Category[] $items
     */
    public function mapData( $items )
    {
        foreach( $items as $item )
        {
            $this->labels[] = $item->getAttributeValue('label');
            $this->keys[] = $item->getAttributeValue('key');
        }
    }

    /**
     * @param $val
     */
    public function addSeries( $val )
    {
        $series = $val / $this->total * 100;
        $this->series[] = round( $series );
    }
}
