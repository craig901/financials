<?php

use Illuminate\Database\Seeder;
use \App\Models\Objects\Storage\TransactionTypes;
use \App\Models\Objects\Entities\TransactionType;

class TransactionTypesSeeder extends Seeder
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
                'label' => 'Card',
                'key' => TransactionTypes::CARD,
            ],
            [
                'label' => 'Cash',
                'key' => TransactionTypes::CASH,
            ]
        ];

        foreach( $items as $item )
        {
            $type = TransactionType::where('key', $item['key'] )->first();
            if( !$type )
            {
                $type = new TransactionType();
                $type->setAttribute('label', $item['label']);
                $type->setAttribute('key', $item['key']);
                $type->save();
            }
        }
    }
}
