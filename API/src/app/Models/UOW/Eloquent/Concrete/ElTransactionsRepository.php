<?php namespace App\Models\UOW\Eloquent\Concrete;

use App\Models\Objects\Entities\Transaction;
use App\Models\Objects\Filters\TransactionFilters;
use App\Models\Objects\ViewModels\Reports\CategoriesSpendViewModel;
use App\Models\Objects\ViewModels\Reports\MonthlySpendViewModel;
use App\Models\UOW\Eloquent\Contracts\IElTransactionsRepository;
use \Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class ElTransactionsRepository implements IElTransactionsRepository
{
    /**
     * @param TransactionFilters $filters
     * @return Transaction[]|Collection
     */
    public function getItems( TransactionFilters $filters )
    {
        $offset = ( $filters->page * 10 ) - 10;

        $query = Transaction::with('type', 'category');

        $this->applyFilters( $query, $filters );

        if( $filters->hasSort() )
        {
            $query->orderBy( $filters->getColumn(), $filters->getType() );
        }
        else
        {
            $query->orderBy( 'date', 'DESC' );
        }

        $query->limit( 10 )
            ->offset( $offset );


        return $query->get();
    }

    /**
     * @param TransactionFilters $filters
     * @return int
     */
    public function getItemsCount( TransactionFilters $filters ): int
    {
        $query = Transaction::with('type', 'category');

        $this->applyFilters( $query, $filters );

        return $query->count();
    }

    /**
     * @param MonthlySpendViewModel $viewModel
     */
    public function getMonthlySpend( MonthlySpendViewModel $viewModel )
    {
        foreach( $viewModel->months as $month )
        {
            $data = DB::select('
SELECT
	SUM( transactions.value ) AS month
FROM
	transactions
WHERE
	date BETWEEN ? AND ?
        ', [ $month->start, $month->end ]);

            $viewModel->categories[] = $month->name;
            $viewModel->data[] = (int) $data[0]->month / 100;
        }
    }

    /**
     * @param CategoriesSpendViewModel $viewModel
     */
    public function getMonthSpendByCategory( CategoriesSpendViewModel $viewModel )
    {
        $sql = 'SELECT count(transactions.id) AS total';
        foreach( $viewModel->keys as $key )
        {
            $sql .= ', SUM( categories.key = "'.$key.'" ) as '.$key;
        }
        $sql .= '
FROM
	transactions
LEFT JOIN
	categories
ON
	categories.id = transactions.category_id
WHERE
    date BETWEEN ? AND ?';

        $data = DB::select( $sql, [ $viewModel->start, $viewModel->end ] );
        foreach( $data[0] as $key => $val )
        {
            if( $key === 'total' )
                $viewModel->total = (int) $val;
            else
                $viewModel->addSeries( intval( $val ) );
        }
    }

    /**
     * @param $query
     * @param TransactionFilters $filters
     * @return void
     */
    private function applyFilters( $query, TransactionFilters $filters )
    {
        if( $filters->hasTypes() )
        {
            $query->whereIn( 'type_id', $filters->types );
        }

        if( $filters->hasCategories() )
        {
            $query->whereIn( 'category_id', $filters->categories );
        }
    }
}
