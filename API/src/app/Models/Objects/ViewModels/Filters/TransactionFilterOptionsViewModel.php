<?php namespace App\Models\Objects\ViewModels\Filters;

use App\Models\Objects\Storage\Filters;
use Illuminate\Database\Eloquent\Model;
use \App\Models\Objects\ViewModels\Filters\Sort;
use \App\Models\Objects\Storage\Sort as SortStorage;

class TransactionFilterOptionsViewModel
{
    /**
     * @var FilterViewModel[]
     */
    public $types = [];

    /**
     * @var FilterViewModel[]
     */
    public $categories = [];

    /**
     * @var FilterViewModel[]
     */
    public $tags = [];

    /**
     * @var Sort[]
     */
    public $sortOptions = [];

    /**
     * @param Model[] $items
     */
    public function mapTypes( $items )
    {
        foreach( $items as $item )
        {
            $option = new FilterViewModel( $item );
            $option->type = Filters::TYPE;
            $this->types[] = $option;
        }
    }

    /**
     * @param Model[] $items
     */
    public function mapCategories( $items )
    {
        foreach( $items as $item )
        {
            $option = new FilterViewModel( $item );
            $option->type = Filters::CATEGORY;
            $this->categories[] = $option;
        }
    }

    /**
     * @param Model[] $items
     */
    public function mapTags( $items )
    {
        foreach( $items as $item )
        {
            $option = new FilterViewModel( $item );
            $option->type = Filters::TAG;
            $this->tags[] = $option;
        }
    }

    /**
     *
     */
    public function mapSortOptions()
    {
        $items = [
            [
                'column' => SortStorage::DATE,
                'type' => SortStorage::DESCENDING,
                'label' => 'Most recent first',
                'selected' => true
            ],
            [
                'column' => SortStorage::DATE,
                'type' => SortStorage::ASCENDING,
                'label' => 'Oldest first'
            ],
            [
                'column' => SortStorage::AMOUNT,
                'type' => SortStorage::ASCENDING,
                'label' => 'Lowest value first'
            ],
            [
                'column' => SortStorage::AMOUNT,
                'type' => SortStorage::DESCENDING,
                'label' => 'Highest value first'
            ],
        ];

        foreach( $items as $item )
        {
            $selected = isset( $item['selected'] );
            $this->sortOptions[] = new Sort( $item['column'], $item['type'], $item['label'], $selected );
        }
    }
}
