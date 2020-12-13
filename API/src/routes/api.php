<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function( $router ) {
   Route::post( 'login', 'AuthController@login' );
   Route::post('logout', 'AuthController@logout' );
   Route::post( 'refresh', 'AuthController@refresh' );
   Route::post( 'me', 'AuthController@me' );

   Route::get('transactions', 'TransactionsController@getTransactions');
   Route::post('transaction', 'TransactionsController@submitTransaction');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'dashboard'
], function( $router ) {
    Route::get('/', 'TransactionsController@getDashboard');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'transactions'
], function( $router ) {
    Route::get('/', 'TransactionsController@getTransactions');
    Route::get('/filters', 'TransactionsController@getFilters');
    Route::post('/', 'TransactionsController@submitTransaction');
    Route::get('/submit', 'TransactionsController@getSubmit');
    Route::post('/submit', 'TransactionsController@postSubmit');
});
