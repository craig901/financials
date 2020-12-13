<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use \App\Models\Objects\Entities\Transaction;
use \App\Models\Objects\Entities\TransactionType;
use \App\Models\Objects\Entities\Category;

$factory->define(Transaction::class, function (Faker $faker) {
    return [
        'type_id' => factory( TransactionType::class ),
        'category_id' => factory( Category::class ),
        'description' => $faker->sentence( 3 ),
        'date' => \Carbon\Carbon::now()->toDateTimeString(),
        'value' => $faker->numberBetween( 10, 500 )
    ];
});
