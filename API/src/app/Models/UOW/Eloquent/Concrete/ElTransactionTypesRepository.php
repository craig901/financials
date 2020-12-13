<?php namespace App\Models\UOW\Eloquent\Concrete;

use App\Models\Objects\Entities\TransactionType;
use App\Models\UOW\Eloquent\Contracts\IElTransactionTypesRepository;
use \Illuminate\Database\Eloquent\Collection;

class ElTransactionTypesRepository implements IElTransactionTypesRepository
{
    /**
     * @return TransactionType[]|Collection
     */
    public function getAll()
    {
        return TransactionType::all();
    }
}
