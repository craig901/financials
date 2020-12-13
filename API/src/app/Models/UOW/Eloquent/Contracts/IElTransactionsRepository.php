<?php namespace App\Models\UOW\Eloquent\Contracts;

use App\Models\Objects\Entities\Transaction;
use App\Models\Objects\Filters\TransactionFilters;
use \Illuminate\Database\Eloquent\Collection;

interface IElTransactionsRepository
{
    /**
     * @param TransactionFilters $filters
     * @return Transaction[]|Collection
     */
    function getItems( TransactionFilters $filters );

    /**
     * @param TransactionFilters $filters
     * @return int
     */
    function getItemsCount( TransactionFilters $filters ): int;
}
