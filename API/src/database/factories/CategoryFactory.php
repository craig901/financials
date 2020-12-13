<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use \App\Models\Objects\Entities\Category;

$factory->define(Category::class, function (Faker $faker) {
    return [
        'label' => 'House',
        'key' => "house"
    ];
});
