<?php

namespace App\Providers;

use App\Models\UOW\Eloquent\Concrete\ElUnitOfWork;
use App\Models\UOW\Eloquent\Contracts\IElUnitOfWork;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton( IElUnitOfWork::class, ElUnitOfWork::class );

        //$this->app->singleton( IUnitOfWork::class, DtUnitOfWork::class );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
