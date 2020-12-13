<?php namespace App\Models\Requests;

use App\Http\Requests\Transactions\SubmitRequest;
use App\Models\Objects\Entities\Transaction;
use App\Models\UOW\Eloquent\Contracts\IElUnitOfWork;
use Carbon\Carbon;

class TransactionSubmitRequest
{
    /**
     * @var SubmitRequest
     */
    protected $request;

    /**
     * @var IElUnitOfWork
     */
    protected $uow;

    /**
     * TransactionSubmitRequest constructor.
     * @param SubmitRequest $request
     * @param IElUnitOfWork $uow
     */
    public function __construct( SubmitRequest $request, IElUnitOfWork $uow )
    {
        $this->request = $request;
        $this->uow = $uow;
    }

    /**
     * @return Transaction
     */
    public function getTransaction(): Transaction
    {
        $value = (float) $this->request->input( 'request.value' );
        $value = $value * 100;
        $transaction = new Transaction;
        $transaction->setAttribute( 'type_id', $this->request->input( 'request.type' ) );
        $transaction->setAttribute( 'category_id', $this->request->input( 'request.category' ) );
        $transaction->setAttribute( 'description', $this->request->input( 'request.description' ) );
        $transaction->setAttribute( 'value', $value );
        $transaction->setAttribute(
            'date',
            Carbon::parse( $this->request->input( 'request.date' ), 'UTC' )
        );

        return $transaction;
    }
}
