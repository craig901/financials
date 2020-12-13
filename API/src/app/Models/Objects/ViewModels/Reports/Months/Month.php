<?php namespace App\Models\Objects\ViewModels\Reports\Months;

use Carbon\Carbon;

class Month
{
    /**
     * @var Carbon
     */
    public $cd;

    /**
     * @var string
     */
    public $start;

    /**
     * @var string
     */
    public $end;

    /**
     * @var string
     */
    public $name;

    /**
     * Month constructor.
     * @param Carbon $date
     */
    public function __construct( Carbon $date )
    {
        $this->cd = $date;
        $start = clone $date;
        $end = clone $date;
        $this->start = $start->startOfMonth()->startOfDay();
        $this->end = $end->endOfMonth()->endOfDay();
        $this->name = $date->format( 'M y' );
    }
}
