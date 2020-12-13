<?php

use Illuminate\Database\Seeder;
use \App\Models\Objects\Storage\Categories;
use \App\Models\Objects\Entities\Category;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [
            [
                'label' => 'House',
                'key' => Categories::HOUSE
            ],
            [
                'label' => 'Car',
                'key' => Categories::CAR
            ],
            [
                'label' => 'Food',
                'key' => Categories::FOOD
            ],
            [
                'label' => 'Leisure',
                'key' => Categories::LEISURE
            ],
            [
                'label' => 'Clothes',
                'key' => Categories::CLOTHES
            ],
            [
                'label' => 'Trainers',
                'key' => Categories::TRAINERS
            ],
        ];

        foreach( $items as $item )
        {
            $category = Category::where('key', $item['key'] )->first();
            if( !$category )
            {
                $category = new Category();
                $category->setAttribute('label', $item['label']);
                $category->setAttribute('key', $item['key']);
                $category->save();
            }
        }
    }
}
