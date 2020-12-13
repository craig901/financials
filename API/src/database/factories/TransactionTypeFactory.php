<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use \App\Models\Objects\Entities\TransactionType;

$factory->define(TransactionType::class, function (Faker $faker) {
    return [
        'label' => 'Card',
        'key' => 'Card'
    ];
});
