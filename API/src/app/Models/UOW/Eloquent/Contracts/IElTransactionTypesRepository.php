<?php namespace App\Models\UOW\Eloquent\Contracts;

use App\Models\Objects\Entities\TransactionType;
use Illuminate\Database\Eloquent\Collection;

interface IElTransactionTypesRepository
{
    /**
     * @return TransactionType[]|Collection
     */
    public function getAll();
}
