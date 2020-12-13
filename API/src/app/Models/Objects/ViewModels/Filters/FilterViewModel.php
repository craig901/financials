<?php namespace App\Models\Objects\ViewModels\Filters;

use Illuminate\Database\Eloquent\Model;

class FilterViewModel
{
    /**
     * @var integer
     */
    public $id;

    /**
     * @var string
     */
    public $label;

    /**
     * @var string
     */
    public $key;

    /**
     * @var string
     */
    public $type;

    /**
     * @var boolean
     */
    public $selected;

    /**
     * @var string
     */
    public $created_at;

    /**
     * FilterViewModel constructor.
     * @param Model $model
     */
    public function __construct( Model $model )
    {
        $this->id = $model->getAttributeValue('id');
        $this->label = $model->getAttribute('label');
        $this->key = $model->getAttributeValue('key');
        $this->selected = false;
        $this->created_at = $model->getAttributeValue('created_at');
    }
}
