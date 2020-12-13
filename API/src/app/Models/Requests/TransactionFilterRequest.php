<?php namespace App\Models\Requests;

use App\Models\Objects\Filters\TransactionFilters;
use Illuminate\Http\Request;

class TransactionFilterRequest
{
    /**
     * @var Request
     */
    protected $request;

    /**
     * TransactionFilterRequest constructor.
     * @param Request $request
     */
    public function __construct( Request $request )
    {
        $this->request = $request;
    }

    /**
     * @return TransactionFilters
     */
    public function getFilterObject(): TransactionFilters
    {
        $filters = new TransactionFilters();
        $filters->page = $this->request->has( 'page' ) ? $this->request->get( 'page' ) : 1;

        if( $this->request->has( 'filters' ) )
        {
            $json = json_decode( $this->request->get( 'filters' ) );
            $filters->types = $json->types;
            $filters->categories = $json->categories;
        }

        if( $this->request->has( 'sort' ) )
        {
            $json = json_decode( $this->request->get( 'sort' ) );
            $filters->column = $json->column;
            $filters->label = $json->label;
            $filters->type = $json->type;
        }

        return $filters;
    }
}
