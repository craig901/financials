<?php namespace App\Models\Objects\ViewModels\Filters;

class Sort
{
    /**
     * @var string
     */
    public $column;

    /**
     * @var string
     */
    public $type;

    /**
     * @var string
     */
    public $label;

    /**
     * @var boolean
     */
    public $selected;

    /**
     * Sort constructor.
     * @param $column
     * @param $type
     * @param $label
     * @param bool $selected
     */
    public function __construct( $column, $type, $label, $selected = false )
    {
        $this->column = $column;
        $this->type = $type;
        $this->label = $label;
        $this->selected = $selected;
    }
}
