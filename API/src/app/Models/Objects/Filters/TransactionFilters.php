<?php namespace App\Models\Objects\Filters;

use App\Models\Objects\Storage\Sort;

class TransactionFilters
{
    /**
     * @var number
     */
    public $page;

    /**
     * @var array
     */
    public $types = [];

    /**
     * @var array
     */
    public $categories = [];

    /**
     * @var array
     */
    public $tags = [];

    /**
     * @var string
     */
    public $column;

    /**
     * @var string
     */
    public $label;

    /**
     * @var string
     */
    public $type;

    /**
     * TransactionFilters constructor.
     */
    public function __construct()
    {
        $this->page = 1;
    }

    /**
     * @return bool
     */
    public function hasTypes()
    {
        if( !empty( $this->types ) )
            return true;
        return false;
    }

    /**
     * @return bool
     */
    public function hasCategories()
    {
        if( !empty( $this->categories ) )
            return true;
        return false;
    }

    /**
     * @return bool
     */
    public function hasTags()
    {
        if( !empty( $this->tags ) )
            return true;
        return false;
    }

    /**
     * @return bool
     */
    public function hasSort()
    {
        if( $this->column )
            return true;

        return false;
    }

    /**
     * @return string
     */
    public function getColumn()
    {
        if( $this->column === Sort::AMOUNT )
            return 'value';

        if( $this->column === Sort::DATE )
            return 'date';
    }

    /**
     * @return string
     */
    public function getType()
    {
        if( $this->type === Sort::ASCENDING )
            return 'ASC';

        if( $this->type === Sort::DESCENDING )
            return 'DESC';
    }
}
