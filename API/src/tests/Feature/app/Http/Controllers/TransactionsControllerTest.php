<?php namespace Tests\Feature\app\Http\Controllers;

use App\Models\Objects\Entities\Transaction;
use App\Models\ViewModelBuilders\DashboardReportsBuilder;
use App\Models\ViewModelBuilders\SubmitTransactionBuilder;
use App\Models\ViewModelBuilders\TransactionFilterOptionsBuilder;
use App\Models\ViewModelBuilders\TransactionsListBuilder;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class TransactionsControllerTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    /**
     * Test the dashboard reports
     *
     * @return void
     */
    public function test_getDashboard()
    {
        factory( Transaction::class, 20 )->create();
        /**
         * @var $builder DashboardReportsBuilder
         */
        $builder = app( DashboardReportsBuilder::class );
        $viewModel = $builder->GetModel();
        $response = $this->get('/api/dashboard');
        $response
            ->assertStatus(200)
            ->assertJson(
                [
                    'categoriesSpend' => [
                        'month' => $viewModel->categoriesSpend->month,
                        'total' => $viewModel->categoriesSpend->total,
                        'series' => $viewModel->categoriesSpend->series,
                        'labels' => $viewModel->categoriesSpend->labels,
                        'keys' => $viewModel->categoriesSpend->keys,
                        'start' => $viewModel->categoriesSpend->start,
                        'end' => $viewModel->categoriesSpend->end

                    ],
                    'monthlySpend' => [
                        'data' => $viewModel->monthlySpend->data,
                        'categories' => $viewModel->monthlySpend->categories
                    ]
                ]
            );
    }

    /**
     * Test get transactions list view
     *
     * @return void
     */
    public function test_getTransactions()
    {
        factory( Transaction::class, 20 )->create();
        /**
         * @var $builder TransactionsListBuilder
         */
        $builder = app( TransactionsListBuilder::class );
        $viewModel = $builder->GetModel();
        $response = $this->get('/api/transactions');
        $response
            ->assertStatus(200)
            ->assertJson([
                'items' => [
                    [
                        'id' => $viewModel->items[0]->id,
                        'value' => $viewModel->items[0]->value
                    ]
                ],
                'total' => $viewModel->total
            ]);
    }

    /**
     * Test get transactions filters view
     *
     * @return void
     */
    public function test_getFilters()
    {
        /**
         * @var $builder TransactionFilterOptionsBuilder
         */
        $builder = app( TransactionFilterOptionsBuilder::class );
        $viewModel = $builder->GetModel();
        $response = $this->get('/api/transactions/filters');
        $response
            ->assertStatus(200)
            ->assertJson([
                'types' => [
                    [
                        'id' => $viewModel->types[0]->id,
                        'label' => $viewModel->types[0]->label,
                        'key' => $viewModel->types[0]->key
                    ]
                ],
                'categories' => [
                    [
                        'id' => $viewModel->categories[0]->id,
                        'label' => $viewModel->categories[0]->label,
                        'key' => $viewModel->categories[0]->key
                    ]
                ]
            ]);
    }

    /**
     * Test get submit
     *
     * @return void
     */
    public function test_getSubmit()
    {
        /**
         * @var $builder SubmitTransactionBuilder
         */
        $builder = app( SubmitTransactionBuilder::class );
        $viewModel = $builder->GetModel();
        $response = $this->get('/api/transactions/submit');
        $response
            ->assertStatus(200)
            ->assertJson([
                'types' => [
                    [
                        'id' => $viewModel->types[0]->id,
                        'label' => $viewModel->types[0]->label,
                        'key' => $viewModel->types[0]->key
                    ]
                ],
                'categories' => [
                    [
                        'id' => $viewModel->categories[0]->id,
                        'label' => $viewModel->categories[0]->label,
                        'key' => $viewModel->categories[0]->key
                    ]
                ]
            ]);
    }

    /**
     * Test successful submission
     */
    public function test_postSubmit_valid()
    {
        $data = [
            'request' => [
                'type' => 1,
                'category' => 1,
                'value' => 150,
                'date' => Carbon::now()->toDateTimeString(),
                'description' => 'This is a test transaction'
            ]
        ];
        $response = $this->post( '/api/transactions/submit', $data );
        $response->assertStatus( 200 );

        $transaction = Transaction::find( 1 );
        $this->assertEquals( $data['request']['type'], $transaction->type->id );
        $this->assertEquals( $data['request']['category'], $transaction->category->id );
        $this->assertEquals( $data['request']['value'] * 100, $transaction->value );
        $this->assertEquals( $data['request']['date'], $transaction->date );
        $this->assertEquals( $data['request']['type'], $transaction->type->id );
    }

    /**
     * Test successful submission
     */
    public function test_postSubmit_inValid()
    {
        $data = [
            'request' => [
                'type' => 1,
                'category' => 1,
                'value' => '',
                'date' => Carbon::now()->toDateTimeString(),
                'description' => 'This is a test transaction'
            ]
        ];
        $response = $this->postJson( '/api/transactions/submit', $data );
        $response->assertStatus( 422 )
            ->assertJson([
                'message' => 'The given data was invalid.'
            ]);
    }
}
