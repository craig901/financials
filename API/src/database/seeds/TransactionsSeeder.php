<?php

use Illuminate\Database\Seeder;
use \App\Models\Objects\Entities\Transaction;

class TransactionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        $items = [];
        for( $i = 0; $i < 300; $i++ )
        {
            $items[] = [
                'description' => $faker->company,
                'value' => rand( 0, 5000 ),
                'type_id' => rand( 1, 2 ),
                'category_id' => rand( 1, 6 )
            ];
        }


        foreach( $items as $item )
        {
            $date = $faker->dateTimeBetween($startDate = '-1 years', $endDate = 'now', $timezone = null);
            Transaction::create(
                [
                    'description' => $item['description'],
                    'value' => $item['value'],
                    'type_id' => $item['type_id'],
                    'category_id' => $item['category_id'],
                    'date' => $date
                ]
            );
        }
    }
}
