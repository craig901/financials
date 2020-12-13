<?php namespace App\Models\UOW\Eloquent\Contracts;

use App\Models\UOW\Eloquent\Concrete\ElCategoriesRepository;
use App\Models\UOW\Eloquent\Concrete\ElTransactionsRepository;
use App\Models\UOW\Eloquent\Concrete\ElTransactionTypesRepository;
use App\Models\UOW\Eloquent\Concrete\ElUsersRepository;

interface IElUnitOfWork
{
    /**
     * @return ElUsersRepository
     */
    function users(): ElUsersRepository;

    /**
     * @return ElTransactionsRepository
     */
    function transactions(): ElTransactionsRepository;

    /**
     * @return ElTransactionTypesRepository
     */
    function transactionTypes(): ElTransactionTypesRepository;

    /**
     * @return ElCategoriesRepository
     */
    function categories(): ElCategoriesRepository;
}
