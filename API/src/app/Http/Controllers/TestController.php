<?php

namespace App\Http\Controllers;

use App\Models\ViewModelBuilders\DashboardReportsBuilder;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function test( DashboardReportsBuilder $builder )
    {
        $viewModel = $builder->getModel();
        dd( $viewModel );
        //$this->uow->transactions()->getMonthlySpend( $viewModel->monthlySpend );
    }
}
