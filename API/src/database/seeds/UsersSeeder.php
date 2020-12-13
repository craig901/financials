<?php

use Illuminate\Database\Seeder;
use \App\Models\Objects\Entities\User;

class UsersSeeder extends Seeder
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
                'email' => 'cbullock2005@yahoo.co.uk',
                'first_name' => 'Craig',
                'last_name' => 'Bullock',
                'password' => \Hash::make( '1qaz2wsxA' )
            ]
        ];

        foreach( $items as $item )
        {
            $user = User::where('email', $item['email'] )->first();
            if( !$user )
            {
                $user = new User();
                $user->setAttribute('email', $item['email']);
                $user->setAttribute('first_name', $item['first_name']);
                $user->setAttribute('last_name', $item['last_name']);
                $user->setAttribute('password', $item['password']);
                $user->save();
            }
        }
    }
}
