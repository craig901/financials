<?php namespace App\Models\UOW\Eloquent\Concrete;

use App\Models\UOW\Eloquent\Contracts\IElUnitOfWork;

class ElUnitOfWork implements IElUnitOfWork
{
    /**
     * @var ElUsersRepository
     */
    protected $users;

    /**
     * @var ElTransactionsRepository
     */
    protected $transactions;

    /**
     * @var ElTransactionTypesRepository
     */
    protected $transactionTypes;

    /**
     * @var ElCategoriesRepository
     */
    protected $categories;

    /**
     * @return ElUsersRepository
     */
    public function users(): ElUsersRepository
    {
        if( is_null( $this->users ) )
        {
            $this->users = new ElUsersRepository();
        }
        return $this->users;
    }

    /**
     * @return ElTransactionsRepository
     */
    public function transactions(): ElTransactionsRepository
    {
        if( is_null( $this->transactions ) )
        {
            $this->transactions = new ElTransactionsRepository();
        }
        return $this->transactions;
    }

    /**
     * @return ElTransactionTypesRepository
     */
    public function transactionTypes(): ElTransactionTypesRepository
    {
        if( is_null( $this->transactionTypes ) )
        {
            $this->transactionTypes = new ElTransactionTypesRepository();
        }
        return $this->transactionTypes;
    }

    /**
     * @return ElCategoriesRepository
     */
    public function categories(): ElCategoriesRepository
    {
        if( is_null( $this->categories ) )
        {
            $this->categories = new ElCategoriesRepository();
        }
        return $this->categories;
    }
}
