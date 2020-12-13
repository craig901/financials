<?php

namespace App\Http\Controllers;

use App\Models\UOW\Eloquent\Contracts\IElUnitOfWork;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * @var IElUnitOfWork
     */
    protected $uow;

    /**
     * Controller constructor.
     * @param IElUnitOfWork $uow
     */
    public function __construct( IElUnitOfWork $uow )
    {
        $this->uow = $uow;
    }
}
