<?php namespace App\Http\Controllers;

use App\Http\Requests\Transactions\SubmitRequest;
use App\Models\Objects\ViewModels\SubmitTransactionViewModel;
use App\Models\Requests\TransactionSubmitRequest;
use App\Models\UOW\Eloquent\Contracts\IElUnitOfWork;
use App\Models\ViewModelBuilders\DashboardReportsBuilder;
use App\Models\ViewModelBuilders\SubmitTransactionBuilder;
use App\Models\ViewModelBuilders\TransactionFilterOptionsBuilder;
use App\Models\ViewModelBuilders\TransactionsListBuilder;
use App\Services\TransactionsService;
use \Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TransactionsController extends Controller
{
    /**
     * @var TransactionsService
     */
    protected $service;

    /**
     * TransactionsController constructor.
     * @param IElUnitOfWork $uow
     * @param TransactionsService $service
     */
    public function __construct( IElUnitOfWork $uow, TransactionsService $service )
    {
        parent::__construct( $uow );
        $this->service = $service;
    }

    /**
     * @return JsonResponse
     */
    public function getDashboard(): JsonResponse
    {
        $viewModel = $this->service->getDashboard();
        return response()->json( $viewModel );
    }

    /**
     * @return JsonResponse
     */
    public function getTransactions(): JsonResponse
    {
        $viewModel = $this->service->getList();
        return response()->json( $viewModel );
    }

    /**
     * @return JsonResponse
     */
    public function getFilters(): JsonResponse
    {
        $viewModel = $this->service->getFilters();
        return response()->json( $viewModel );
    }

    /**
     * @return JsonResponse
     */
    public function getSubmit(): JsonResponse
    {
        $viewModel = $this->service->getSubmit();
        return response()->json( $viewModel );
    }

    /**
     * @param TransactionSubmitRequest $request
     * @return JsonResponse
     */
    public function postSubmit( TransactionSubmitRequest $request ): JsonResponse
    {
        $transaction = $request->getTransaction();
        $transaction->save();
        return response()->json( true );
    }
}
